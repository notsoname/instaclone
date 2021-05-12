import classes from './Content.module.scss'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import Post from '../Post/Post'
import { useAuth } from '../../context/AuthContext'
import Suggestion from '../SuggestionPerson/Suggestion'

export default function Content() {

    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const {currentUser} = useAuth()

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id, 
                post:doc.data(),
            })));
        })
    },[])

    function onHandleSuggestion() {
        db.collection('users').onSnapshot(snapshot => {
            setUsers(snapshot.docs.map((doc) => ({
                id: doc.id,
                user: doc.data()
            })))
        })
    }


    console.log(posts)
    return (
        <div className={classes.content_wrapper}>
            <div>
                <div className={classes.content_add}>
                    <button className={classes.content_add_btn}>Add post</button>
                </div>
                    <div>
                        {
                            posts.map(({id, post}) => <Post key={id} id={id} name={post.username} avatar={post.avatar} caption={post.caption} image={post.imageUrl} likes={post.likes} date={post.timestamp.seconds}/>)
                        }
                    </div>
            </div>
            <div className={classes.content_suggestions}>
                <div className={classes.content_account}>
                    <img className={classes.content_ava} src='http://placehold.it/56x56' alt='ava'/>
                    <div className={classes.content_account_email}>{currentUser.email}</div>
                    <div className={classes.content_account_swap}>Переключиться</div>
                </div>
                <div>
                    <div className={classes.content_suggestion}>
                        <div>Рекомендации для вас</div>
                        <div className={classes.content_suggestion_all}>Все</div>
                    </div>
                    <div>
                        <button onClick={onHandleSuggestion}>Get suggestion</button>
                        {
                            users.map(({id, user}) => <Suggestion username={user.username} id={id} key={id} avatar={user.avatar}/>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
