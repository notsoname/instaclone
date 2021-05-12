import classes from './Login.module.scss'
import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'



export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            setError('Failed to login')
        }
        setLoading(false)
    }


    return (
        <div className={classes.login}>
            <form onSubmit={handleSubmit} className={classes.login_form}>
                <div className={classes.login_logocontainer}>
                    <span className={classes.login_logo}/>
                </div>
                <input ref={emailRef} className={classes.login_login} required placeholder="Номер телефона, имя пользователя или элю.адрес"/>
                <input type='password' required ref={passwordRef} placeholder='Пароль' className={classes.login_password}/>
                <button className={classes.login_btn}>Войти</button>
                <div className={classes.login_or}>ИЛИ</div>
                <a className={classes.login_link} href='#/'>
                    <div> Войти через Facebook</div>
                </a>
                <Link className={classes.login_forgot} to='/forgot-password'>Забыли пароль?</Link>
            </form>
            <div className={classes.login_signUp}>
                <div>
                У вас еще нет аккаунта?
                </div>
                <Link to='/signUp' className={classes.login_signUp_link}>Зарегистрироваться</Link>
            </div>
        </div>
    )
}
