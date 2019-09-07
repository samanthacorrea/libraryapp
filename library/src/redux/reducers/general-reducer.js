import { Store } from '../store';
import axios from 'axios';

const initialState = {
    page: 'Authors',
    modalType: 'DELETE_AUTHOR',
    modalTitle: null,
    modalSize: null,
    booksByAuthor: null,
    currentAuthor: null,
    openSideBar: false,
    openModal: false,
};

const REACT_APP_DNS = "https://bibliapp.herokuapp.com/api";

// Listar autores
const getAuthors = () => {
    let url = REACT_APP_DNS + '/authors';
    axios.get(url)
        .then(result => {
            Store.dispatch({ type: 'ON_AUTHORS', authors: result.data.reverse() })
        })
        .catch(e => {
            console.log(e)
        })
};
getAuthors();

// Listar livros de um autor
const getBooksByAuthors = (id) => {
    let url = REACT_APP_DNS + `/authors/${id}/books`;
    axios.get(url)
        .then(result => {
            Store.dispatch({ type: 'ON_BOOKS_BY_AUTHOR', booksByAuthor: result.data.reverse() })
        })
        .catch(e => {
            console.log(e)
        })
};

// Criar autor
const createAuthor = (data) => {
    let url = REACT_APP_DNS + `/authors`;
    let params = {
        firstName: data.firstName,
        lastName: data.lastName
    }
    axios.patch(url, params)
        .then(result => {
            getAuthors();
            Store.dispatch({ type: 'ON_CLOSE_MODAL' })
            Store.dispatch({ type: 'ON_OPEN_MODAL', openModal: true, modalType: 'MODAL_SUCCESS', modalTitle: 'ADICIONAR AUTOR', modalSize: 'xs' })            
        })
        .catch(e => {
            console.log(e)
            Store.dispatch({ type: 'ON_CLOSE_MODAL' })
            Store.dispatch({ type: 'ON_OPEN_MODAL', openModal: true, modalType: 'MODAL_ERROR', modalTitle: "ERROR!", modalSize: 'xs' })

        })
}

// Excluir autor 
const deleteAuthor = (id) => {
    let url = REACT_APP_DNS + `/authors/${id}`;
    axios.delete(url)
        .then(result => {
            Store.dispatch({ type: 'ON_CLOSE_MODAL' })
            Store.dispatch({ type: 'ON_OPEN_MODAL', openModal: true, modalType: 'MODAL_SUCCESS', modalTitle: 'Excluído com sucesso', modalSize: 'xs' })
            getAuthors();
        })
        .catch(e => {
            console.log(e)
            Store.dispatch({ type: 'ON_CLOSE_MODAL' })
            Store.dispatch({ type: 'ON_OPEN_MODAL', openModal: true, modalType: 'MODAL_ERROR', modalTitle: "ERROR!", modalSize: 'xs' })

        })
};



// Criar livro do autor
const createBook = (data) => {
    let url = REACT_APP_DNS + `/authors/${data.id}/books`;
    let params = {
        title: data.title,
        isbn: data.isbn
    }

    console.log(params);
    axios.post(url, params)
        .then(result => {
            getBooksByAuthors(data.id);
            Store.dispatch({ type: 'ON_CLOSE_MODAL' })
            Store.dispatch({ type: 'ON_OPEN_MODAL', openModal: true, modalType: 'MODAL_SUCCESS', modalTitle: 'ADICIONAR AUTOR', modalSize: 'xs' })            
        })
        .catch(e => {
            console.log(e)
            Store.dispatch({ type: 'ON_CLOSE_MODAL' })
            Store.dispatch({ type: 'ON_OPEN_MODAL', openModal: true, modalType: 'MODAL_ERROR', modalTitle: "ERROR!", modalSize: 'xs' })

        })
}

// Excluir livro do autor
const deleteBookByAuthor = (idAuthor, idBook) => {
    let url = REACT_APP_DNS + `/authors/${idAuthor}/books/${idBook}`;
    axios.delete(url)
        .then(result => {
            Store.dispatch({ type: 'ON_CLOSE_MODAL' })
            Store.dispatch({ type: 'ON_OPEN_MODAL', openModal: true, modalType: 'MODAL_SUCCESS', modalTitle: 'Excluído com sucesso', modalSize: 'xs' })
            getBooksByAuthors(idAuthor);
        })
        .catch(e => {
            console.log(e)
            Store.dispatch({ type: 'ON_CLOSE_MODAL' })
            Store.dispatch({ type: 'ON_OPEN_MODAL', openModal: true, modalType: 'MODAL_ERROR', modalTitle: "ERROR!", modalSize: 'xs' })

        })
};

// Atualizar dados do autor
const updateAuthor = (data) => {
    let url = REACT_APP_DNS + `/authors/${data.id}`;
    let params = {
        firstName: data.firstName,
        lastName: data.lastName
    }

    axios.patch(url, params)
        .then(result => {
            console.log(result);
            getAuthors();
            Store.dispatch({ type: 'ON_CLOSE_MODAL' })
            Store.dispatch({ type: 'ON_OPEN_MODAL', openModal: true, modalType: 'MODAL_SUCCESS', modalTitle: 'Atualizado com sucesso', modalSize: 'xs' })            
        })
        .catch(e => {
            console.log(e)
            Store.dispatch({ type: 'ON_CLOSE_MODAL' })
            Store.dispatch({ type: 'ON_OPEN_MODAL', openModal: true, modalType: 'MODAL_ERROR', modalTitle: "ERROR!", modalSize: 'xs' })

        })
};

// Atualizar dados do livro de um autor
const updateBook = (data) => {
    let url = REACT_APP_DNS + `/authors/${data.idAuthor}/books/${data.id}`;
    let params = {
        isbn: data.isbn,
        title: data.title
    }
    axios.put(url, params)
        .then(result => {
            Store.dispatch({ type: 'ON_CLOSE_MODAL' })
            Store.dispatch({ type: 'ON_OPEN_MODAL', openModal: true, modalType: 'MODAL_SUCCESS', modalTitle: 'Atualizado com sucesso', modalSize: 'xs' })
            getBooksByAuthors(data.idAuthor);
        })
        .catch(e => {
            console.log(e)
            Store.dispatch({ type: 'ON_CLOSE_MODAL' })
            Store.dispatch({ type: 'ON_OPEN_MODAL', openModal: true, modalType: 'MODAL_ERROR', modalTitle: "ERROR!", modalSize: 'xs' })

        })
};

export const GeneralReducer = (state = initialState, action) => {

    // Immutability
    state = Object.assign({}, state)

    switch (action.type) {    
        case 'ON_AUTHORS':
            return { ...state, authors: action.authors, page: "Authors" }
        
        case 'ON_CREATE_AUTHOR':
            createAuthor(action.data)
            return { ...state }

        case 'ON_DELETE_AUTHOR':
            deleteAuthor(action.id);
            return { ...state }

        case 'ON_UPDATE_AUTHOR':
            updateAuthor(action.data)
            return { ...state }
    
        case 'ON_BOOKS_BY_AUTHOR':
            return { ...state, booksByAuthor: action.booksByAuthor, page: "BooksByAuthor" }  

        case 'ON_UPDATE_BOOK':
            updateBook(action.data)
            return { ...state }

        case 'ON_CREATE_BOOK':
            createBook(action.data)
            return { ...state }            

        case 'ON_DELETE_BOOK_BY_AUTHOR':
            deleteBookByAuthor(action.idAuthor, action.idBook);
            return { ...state }
        
        case 'ON_GET_BOOKS_BY_AUTHOR':
            getBooksByAuthors(action.id);
            return { ...state, currentAuthor: action.id}  

        case 'ON_CURRENT_AUTHOR':
            return { ...state, currentAuthor: action.id, page: "Author" }

        case 'ON_HOME':
            getAuthors();
            return { ...state, page: "Author" }
        
        case 'ON_CHANGE_PAGE':
            return { ...state, page: action.page };

        case 'ON_OPEN_MODAL':
            return { ...state, openModal: true, modalType: action.modalType, modalTitle: action.modalTitle, modalSize: action.modalSize };
        
        case 'ON_CLOSE_MODAL':
            return { ...state, openModal: false, modalTitle: null, modalSize: null };

        case 'ON_UPDATE_MODAL_TITLE':
            return { ...state, modalTitle: action.modalTitle };

        case 'ON_UPDATE_MODAL_SIZE':
            return { ...state, modalSize: action.modalSize };

        default:
            return { ...state }
    }

}