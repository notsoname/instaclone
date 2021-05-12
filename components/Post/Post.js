import React, { useEffect, useRef, useState } from 'react'
import { FaComment, FaHeart, FaPaperPlane } from 'react-icons/fa'
import { Link, NavLink, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { db } from '../../firebase'
import classes from './Post.module.scss'



export default function Post({ name, avatar, likes, caption, image, id, date}) {
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState('')
    const {currentUser} = useAuth()
    function onHandleLike() {
         db.collection('posts').doc(id).update({likes: ++likes})
    }

    function onHandleChange(e) {
        setComment(e.target.value)
    }
    let username = currentUser.email
    
    function onSubmitComment(e) {
        e.preventDefault()
        setComments([{username, comment}, ...comments])
        setComment('')

        return db
            .collection('posts')
            .doc(id)
            .collection('comments')
            .add({
                username: username,
                comment: comment
            }) 
    }
    
    useEffect(() => {
        let unsubsribe;
        if (id) {
            unsubsribe = db
                .collection('posts')
                .doc(id)
                .collection('comments')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map(doc => doc.data()))
                })
        }
        return () => {
            unsubsribe();
        }
    }, [id])

    var newdate = new Date(date * 1000);
    const today = ([
        newdate.getDate(),
        ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"][newdate.getMonth()],
        newdate.getFullYear()
    ].join(" "));

    return (
        <div className={classes.content_post}>
            <div>
                <div className={classes.content_post_header}>
                    <div className={classes.content_post_header_name}>
                        <img alt='ava' className={classes.content_post_header_ava} src={avatar}/>
                        <NavLink to={`/profile/${id}`} className={classes.content_post_header_login}>{name}</NavLink>
                    </div>
                    <div className={classes.content_post_header_more}>
                        <span className={classes.content_post_header_dot}></span>
                        <span className={classes.content_post_header_dot}></span>
                        <span className={classes.content_post_header_dot}></span>
                    </div>
                </div>
                <img onDoubleClick={onHandleLike} alt='image' src={image} className={classes.content_post_image}/>
                <div className={classes.content_post_actions}>
                    <div className={classes.content_post_actions_action} onClick={onHandleLike}><FaHeart/></div>
                    <NavLink to={`/post/${id}`} className={classes.content_post_actions_action} ><FaComment/></NavLink>
                    <div className={classes.content_post_actions_action} ><FaPaperPlane/></div>
                </div>
                <div className={classes.content_post_likes}>
                    {likes}  отметок "Нравится"
                </div>
                <div className={classes.content_post_caption}>
                    <span className={classes.content_post_caption_username}>{name} </span>
                    {caption}
                    {comments.length > 3 && (
                        <p className={classes.content_post_comments_all}>Посмотреть все комментарии ({comments.length}) </p>
                    )}
                   
                </div>
                <div className={classes.content_post_comments}>
                    {comments ? comments.slice(0, 3).map(comment => 
                    <div key={`${comment.comment}`} className={classes.content_post_comments_wrapper}>
                        <div className={classes.content_post_comments_username}>{comment.username}</div>
                        <div className={classes.content_post_comments_comment}>{comment.comment}</div>
                    </div>
                    ) : ''}
                    <div className={classes.content_post_caption_date}>{today}</div>
                </div>
                <form onSubmit={onSubmitComment} className={classes.content_post_addcomment}>
                    <input value={comment} onChange={onHandleChange} className={classes.content_post_addcomment_input} placeholder='Добавить комментарий...'/>
                    <button disabled={!comment} className={classes.content_post_addcomment_btn}>Опубликовать</button>
                </form>
            </div>
        </div>
    )
}
