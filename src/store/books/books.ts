import { create } from "zustand";
import { IFavBooks, IStates, books } from "./booksTypes";
import { IUserItem } from "../auth/auth";
import { setToStorage } from "@/utils/useLocaleStorage";


type Actions = {
    setBooksModal:(payload: boolean) => void,
    setCurrentBook: (payload: books) => void,
    setDropdown: (payload: boolean) => void,
    getUserFavorites: (payload: IFavBooks[])=> void,
    resetFavBooks: ()=> void,
    incrementCounter: (payload:number)=> void,
    decrementCounter: (payload: number)=> void,
    getBooksCounter: (payload:number)=> void,
    resetNotifications: (payload: number)=> void,
    setPostModal: (payload: boolean) => void,
    setTotalNotifications: (payload: number) => void

}

export const useBooks = create<IStates & Actions>((set)=> ({
    booksModal: false,
    postModal: false,
    dropdown: false,
    currentBook:{name:'',author:'',image:'',pdf:'',rating:0,released:'',description:'',id:0},
    favorites: [],
    booksNotifications: 0,
    totalNotifications: 0,
    setBooksModal: (payload) => set(()=> ({booksModal: payload})),
    setPostModal: (payload) => set(()=> ({postModal: payload})),
    setCurrentBook: (payload) => set(()=> ({currentBook: payload})),
    setDropdown: (payload) => set(() => ({dropdown: payload})),
    getUserFavorites: (payload) => set(()=> ({favorites: payload})),
    resetFavBooks: () => set(()=> ({favorites: []})),
    incrementCounter:(payload)=>{
        setToStorage<number>('favBooksCounter', payload === null ? 0 : payload);
        set(()=> ({booksNotifications:payload}))
    },
    decrementCounter:(payload)=>{
        setToStorage<number>('favBooksCounter', payload);
        set(()=> ({booksNotifications:payload}))
    },
    getBooksCounter: (payload)=> set(()=> ({booksNotifications: payload})),
    resetNotifications: (payload)=>{
        setToStorage<number>('favBooksCounter', payload);
        set(()=> ({booksNotifications: payload}))
    },
    setTotalNotifications: (payload)=> set(()=>({totalNotifications:payload}))
}))



export const setUserFavBooks = (favBooks:IFavBooks[], getUserFavorites:Function,currentUser:IUserItem[])=>{
    const  customFav = favBooks ? favBooks.filter(book => book.userToken === currentUser[0].userToken) : []
    getUserFavorites(customFav)
}




