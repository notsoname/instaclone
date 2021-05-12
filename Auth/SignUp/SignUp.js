import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import classes from './SignUp.module.scss'

export default function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    
    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords are ==')
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)
    }

    return (
        <div className={classes.signup}>
            <form className={classes.signup_form}>
                <h1 className={classes.signup_title}>
                    <span className={classes.signup_title_logo}></span>
                </h1>
                <div className={classes.signup_text}>
                Зарегистрируйтесь, чтобы смотреть фото и видео ваших друзей.
                </div>
                <button className={classes.signup_facebook}>
                    <a className={classes.signup_facebook_link}> Войти через Facebook</a>
                </button>
                <div className={classes.signup_or}>
                ИЛИ
                </div>
                <input className={classes.signup_email} ref={emailRef} placeholder='Email' type='email' required />
                <input className={classes.signup_password} ref={passwordRef} placeholder='Password' type='password' required />
                <button className={classes.signup_next}>Далее</button>
            </form>
            <div className={classes.signup_login}>
                <div>Есть аккаунт?</div>
                <Link className={classes.signup_login_link} to='/login'> Вход</Link>
            </div>
        </div>
    )
}
