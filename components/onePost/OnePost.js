import classes from './OnePost.module.scss'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { FaComment, FaHeart, FaPaperPlane } from 'react-icons/fa'

export default function OnePost({id}) {

    const [post, setPost] = useState([])
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState('')

    useEffect(() => {
        db.collection('posts').doc(id).onSnapshot(doc => {setPost(doc.data())})
    },[])

    useEffect(() => {
        db.collection('posts').doc(id).collection('comments').onSnapshot(snapshot => {setComments(snapshot.docs.map(doc => doc.data()))})
    }, [])

    let likes = post.likes

    function onHandleLike() {
        db.collection('posts').doc(id).update({likes: ++likes})
    }

    function onHandleSubmit(e) {
        e.preventDefault()
    }

    function onHandleChange(e) {
        setComment(e.target.value)
    }
    console.log(comments)
    return (
        <div className={classes.post}> 
            <div className={classes.post_wrapperImg}><img src={post.imageUrl} className={classes.post_img}/></div>
            <div className={classes.post_info}>
                <div className={classes.post_info_headerWrapper}>
                    <div className={classes.post_info_header}>
                        <img src={post.avatar} className={classes.post_info_header_ava} alt='ava'/>
                        <div className={classes.post_info_header_username}>{post.username && post.username.length > 10 ? post.username.slice(0,8)+'...' : post.username}</div>
                        <div>Подписки</div>
                    </div>
                    <div className={classes.post_info_header_dots}>
                        <span className={classes.post_info_header_dots_dot}></span>
                        <span className={classes.post_info_header_dots_dot}></span>
                        <span className={classes.post_info_header_dots_dot}></span>
                    </div>
                </div>
                <div className={classes.post_mainInfo}>
                    <img src={post.avatar} className={classes.post_info_header_ava} alt='ava'/>
                    <div className={classes.post_mainInfo_wrapper}>
                        <div className={classes.post_info_header_username}>{post.username}</div>
                        <div>{post.caption}</div>
                    </div>
                </div>
{/*                 <div>
                    {comments && comments.map(comment => 
                        <div>
                            {comment.username}
                            {comment.comment}
                        </div>
                    )}
                </div> */}
                <div className={classes.post_actions}>
                    <div className={classes.post_actions_wrapper}>
                        <div className={classes.post_actions_wrapper_action} onClick={onHandleLike}><FaHeart/></div>
                        <div className={classes.post_actions_wrapper_action} ><FaComment/></div>
                        <div className={classes.post_actions_wrapper_action} ><FaPaperPlane/></div>
                    </div>
                    <div className={classes.post_actions_count}>
                        {likes}  отметок "Нравится"
                    </div>
                    <div className={classes.post_actions_time}>4 часов назад</div>
                </div>
                <form onSubmit={onHandleSubmit} className={classes.post_comments}>
                    <input value={comment} onChange={onHandleChange} className={classes.post_comments_input} placeholder='Добавить комментарий...' />
                    <button disabled={!comment} className={classes.post_comments_btn}>Опубликовать</button>
                </form>
            </div>
        </div>
    )
}
