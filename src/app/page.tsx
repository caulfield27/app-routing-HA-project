"use client"

import { useBooks } from '@/store/books/books'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'
import { Wrapper } from '@/components/wrapper/wrapper'



const Home = ()=>{
    const navigate = useRouter()
    

    return (
        <>
            <Wrapper>
                <div className={styles.home_container}>
                    <div className={styles.header_text}>
                        <h1>Unlock Your Coding Potential with Humo Academy&apos;s Programming Courses</h1>
                        <p>Welcome to Humo Academy, where we empower you to master the art of programming. Discover our diverse range of courses designed to cater to beginners and seasoned coders alike. Whether you&apos;re interested in web development, data science, or mobile app creation, we have the resources and expertise to guide you towards success. Join us on a journey of learning and innovation today!</p>
                        <button onClick={() => navigate.push('/courses')}>Start to learn free</button>
                    </div>
                    <div className={styles.header_img}>
                        <img src="https://cdn2.hexlet.io/assets/main_landing_hero-a0ae296e0b9f2395c6c442b2104000ddc260fabd559bef2b779e5fa039619192.svg" alt="" />
                    </div>
                </div>
            </Wrapper>




        </>
        
        
    )
}

export default Home