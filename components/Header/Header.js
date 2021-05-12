import React, { useState } from 'react'
import classes from './Header.module.scss'
import logo from '../../assets/logo.png'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {FaHome} from "react-icons/fa"
import {FaHeart} from "react-icons/fa"
import {FaFacebookMessenger} from "react-icons/fa"
import {FaSafari} from "react-icons/fa"

export default function Header() {
    const {currentUser, logout} = useAuth()
    const history = useHistory()
    const [error, setError] = useState('')

    async function handleLogout () {
        try  {
            await logout()
            history.push('/login')
        }
        catch {
            setError('Failed to logout')
        }
    }

    return (
        <div className={classes.header}>
            <div className={classes.header_wrapper}>
                <Link className={classes.header_logo} to='/'><img src={logo}/></Link>
                <div><input className={classes.header_search} placeholder='Поиск' /></div>
                <div className={classes.header_actions}>
                    <div className={classes.header_actions_icons}><FaHome/> </div>
                    <div className={classes.header_actions_icons}><FaFacebookMessenger/> </div>
                    <div className={classes.header_actions_icons}><FaSafari/> </div>
                    <div className={classes.header_actions_icons}><FaHeart/> </div>
                    <div><img alt='ava'/></div> 
                    {!currentUser ? currentUser.email : <button onClick={handleLogout}>logout</button> }
                    
                </div>
            </div>
        </div>
    )
}
