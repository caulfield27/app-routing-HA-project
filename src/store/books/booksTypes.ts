export interface books{
    name:string,
    author:string,
    image: string,
    pdf: string,
    rating: number | null,
    released: string,
    description: string,
    id: number
}

export interface IStates{
    booksModal:boolean,
    postModal: boolean
    dropdown: boolean,
    currentBook: books,
    favorites: IFavBooks[],
    booksNotifications: number,
    totalNotifications: number
}
export interface IFavBooks{
    userToken:string | null,
    currentBook:books
}