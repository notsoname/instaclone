import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { db } from '../../firebase'
import classes from './UserProfile.module.scss'

export default function UserProfile({id}) {
    const [post, setPost] = useState([])

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
          transform             : 'translate(-50%, -50%)'
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
                    
            </ReactModal>
        </div>
        </>
    )
}
