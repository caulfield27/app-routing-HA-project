"use client"
import { Wrapper } from '@/components/wrapper/wrapper';
import styles from './page.module.css'
import { useBooks } from '@/store/books/books';
import { IFavBooks, books } from '@/store/books/booksTypes';
import { getFromStorage, setToStorage } from '@/utils/useLocaleStorage';
import { useEffect } from 'react';


const Favorites = () => {
    const favorites = useBooks((state) => state.favorites)
    const getUserFavorites = useBooks((state) => state.getUserFavorites)
    const resetNot = useBooks((state) => state.resetNotifications)

    const handleRead = (event: any) => {
        window.open(event.target.value, '_blank')
    }

    useEffect(() => {
        resetNot(0)
    })

    const handleDelete = (currentBook: books) => {
        const filtered = favorites.filter((book: { currentBook: { id: number; }; }) => book.currentBook.id !== currentBook.id)
        const getFavStorage = getFromStorage('favorites')
        if (getFavStorage) {
            const removedBook = getFavStorage.filter((removeBook: IFavBooks) => removeBook.currentBook.id !== currentBook.id)
            setToStorage('favorites', removedBook)
        }
        getUserFavorites(filtered)
    }


    return (
        <>



            <Wrapper>
                <h1>Your favorite books</h1>
                <hr />
                {favorites.length == 0 ?
                    <div className={styles.noFavorites_wrap}>
                        <h1>You don`t have favorite books yet</h1>
                        <img src='/favorites.png' alt="favorites" />
                    </div> :

                    <div className={styles.favorites_container}>
                        {favorites.map((book: { currentBook: books; }, ind: number) => {
                            return <div key={ind + 1} className={styles.favorite_card}>
                                <img src={book.currentBook.image} alt={book.currentBook.name} />
                                <div className={styles.favoriteCard_content}>
                                    <div className={styles.favorite_text}>
                                        <span className={styles.favorite_name}>{book.currentBook.name}</span>
                                        <span className={styles.favorite_author}>{book.currentBook.author}</span>
                                    </div>
                                    <div className={styles.favorite_button}>
                                        <button value={book.currentBook.pdf} className={styles.read} onClick={handleRead}>read</button>
                                        <button className={styles.delete} onClick={() => handleDelete(book.currentBook)}>delete</button>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>

                }

            </Wrapper>





        </>

    )
}

export default Favorites;