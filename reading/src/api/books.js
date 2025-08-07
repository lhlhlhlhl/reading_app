import axios from './config'

export const mockBooksData = async () =>{
    return axios.get(`/books`)
}

export const getBookshelf = async () =>{
    return axios.get(`/books/bookshelf`)
}

export const getBook = async (id) =>{
    return axios.get(`/books/${id}`)
}

export const updateBook = async (id, updates) =>{
    return axios.post(`/books/update`, { id, updates })
}
