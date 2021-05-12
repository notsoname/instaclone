import classes from './Suggestion.module.scss'
import React from 'react'

export default function Suggestion({avatar, username}) {
    return (
        <div className={classes.suggestion}>
            <div>
                <img src={avatar} alt='ava' className={classes.suggestion_ava}/>
            </div>
            <div className={classes.suggestion_action}>
                <div>
                    <div className={classes.suggestion_username}>{username}</div>
                    <div className={classes.suggestion_followers}>Подписаны:</div>
                </div>
                <div className={classes.suggestion_follow}>Подписаться</div>
            </div>
        </div>

    )
}
