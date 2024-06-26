"use client"
import '../../app/globals.css'
import styles from '../../app/auth/page.module.css'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { IUserItem, handleLogin } from '@/store/auth/auth'
import { useBooks } from '@/store/books/books'
import useAuth from '@/store/auth/auth'
import { Wrapper } from '@/components/wrapper/wrapper'
import { fetchData } from '@/utils/api'


const AuthLogin = ({users} : {users:IUserItem[]}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useRouter()
    const setAuth = useAuth((state) => state.setAuth)
    const setCurrentUser = useAuth((state) => state.setCurrentUser)
    

    const [validation, setValidation] = useState({
        email: false,
        password: false
    });
    const dropdown = useBooks((state) => state.dropdown)

    const handleLoginSubmit = (e: any) => {
        e.preventDefault()
        handleLogin(email, password, navigate, users, setAuth, setCurrentUser)
    }

    const isDataComplete = email.trim() !== '' && password.trim() !== '';


    return (

        <>


            <Wrapper>
                <div className={styles.login_container}>
                    <div className={styles.login}>
                        <h2 className={styles.header_text}>Login</h2>
                        <form className={styles.form} onSubmit={handleLoginSubmit}>
                            <div className={styles.input_wrap}>
                                <input className={styles.input} type='email'
                                    placeholder='@email'
                                    value={email}
                                    onFocus={() => setValidation({ ...validation, email: false })}
                                    onBlur={() => setValidation({ ...validation, email: true })}
                                    onChange={(e) => { setEmail(e.target.value) }} />
                                {email == '' && validation.email &&
                                    <span>поле должно быть заполненным</span>}

                            </div>
                            <div className={styles.input_wrap}>
                                <input className={styles.input} type='password'
                                    placeholder='password'
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    onFocus={() => setValidation({ ...validation, password: false })}
                                    onBlur={() => setValidation({ ...validation, password: true })} />
                                {password == '' && validation.password &&
                                    <span>поле должно быть заполненным</span>
                                }
                            </div>
                            <Button type='submit' variant='contained' disabled={!isDataComplete}>login</Button>
                        </form>
                        <footer className={styles.login_footer}>
                            <span>You don&apos;t have account yet?</span>
                            <Link href="/auth/signUp">sign up</Link>
                        </footer>
                    </div>
                </div>

            </Wrapper>






        </>

    )
}

export default AuthLogin