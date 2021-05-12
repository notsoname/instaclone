import React, { useEffect, useState } from 'react'
import { FaComment, FaHeart, FaPaperPlane } from 'react-icons/fa'
import ReactModal from 'react-modal'
import { db } from '../../firebase'
import classes from './UserProfile.module.scss'

export default function UserProfile({id}) {
    const [post, setPost] = useState([])
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState('')


    useEffect(() => {
        db.collection('posts').doc(id).onSnapshot(doc => {setPost(doc.data())})
    },[])

    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          padding :0,
          
          
        }
      };

    console.log(post)
    const [modalIsOpen,setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
      }
    
    function afterOpenModal() {
    // references are now sync'd and can be accessed.
    
    }

    function closeModal(){
    setIsOpen(false);
    }
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
    return (
        <>
        <div className={classes.profile}>
            <div><img alt='ava' src={post.avatar} className={classes.profile_ava}/></div>
            <div>
                <div className={classes.profile_header}>
                    <div className={classes.profile_header_username}>{post.username}</div>
                    <div className={classes.profile_header_actions}>
                        <button className={classes.profile_header_message}>Отправить сообщение</button>
                        <button className={classes.profile_header_follow}>Follow</button>
                        <div className={classes.profile_header_dots}>
                            <span className={classes.profile_header_dot}></span>
                            <span className={classes.profile_header_dot}></span>
                            <span className={classes.profile_header_dot}></span>
                        </div>
                    </div>
                </div>
                <div className={classes.profile_stat}>
                    <div className={classes.profile_stat_posts}>{post && null ? post.imageUrl.length : ''} публикации</div>
                    <div className={classes.profile_stat_followers}>{post.followers} подписчики</div>
                    <div className={classes.profile_stat_subsriptions}>10 подписок</div>
                </div>
                <div>
                    <div>
                        status
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className={classes.profile_line}></div>
            <div className={classes.profile_select}>
                <div className={classes.profile_select_post}>ПУБЛИКАЦИИ</div>
                <div className={classes.profile_select_igtv}>IGTV</div>
                <div className={classes.profile_select_marks}>ОТМЕТКИ</div>
            </div>
            <div className={classes.profile_posts}>
                <img onClick={openModal} className={classes.profile_posts_img} src={post.imageUrl} alt='post'/>
            </div>
            <ReactModal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={customStyles}>
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
            </ReactModal>
        </div>
        </>
    )
}
