
import styles from './page.module.css'
import { books } from "@/store/books/booksTypes";
import BooksModal from "@/components/booksModal/booksModal";
import PostModal from "@/components/postModal/postModal";
import LibraryHeader from "@/components/libraryHeader/libraryHeader";
import { Book } from "@/components/book/book";
import { Wrapper } from '@/components/wrapper/wrapper';
import { log } from 'console';
import { cache } from 'react';
import { fetchData } from '@/utils/api';

export const revalidate = 5


const Library = async (
    { searchParams }: { searchParams?: { query?: string, _page?: string, } }
) => {

    const data = await fetchData(`http://localhost:3001/books?_page=${searchParams?._page??'1'}`)
    return (
        <>
            <BooksModal />
            <Wrapper>
                <div className={styles.library_header}>
                    <h1>Programming books recommended by<br />Humo Academy</h1>

                </div>
                <div style={{
                    display: "flex", flexDirection: "row", gap: '20px', justifyContent: 'center', alignItems: 'center',
                    marginTop: '65px'
                }}>
                    <LibraryHeader pages={data.items} currentPage={searchParams?._page} />
                    <PostModal/>
                </div>

                <div className={styles.library_container}>

                    {data.data.map((book: books) => {
                        return <Book book={book} key={book.id} />
                    })}


                </div>

            </Wrapper>




        </>
    )
}

export default Library;