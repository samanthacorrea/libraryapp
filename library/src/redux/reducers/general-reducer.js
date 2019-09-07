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
};

const REACT_APP_DNS = "https://bibliapp.herokuapp.com/api";

// Lista autores
const getAuthors = () => {
    let url = REACT_APP_DNS + '/authors';
    axios.get(url)
        .then(result => {
            console.log(result);
            Store.dispatch({ type: 'ON_AUTHORS', authors: result.data.reverse() })
        })
        .catch(e => {
            console.log(e)
        })
};
getAuthors();

// Lista livros de um autor
const getBooksByAuthors = (id) => {
    let url = REACT_APP_DNS + `/authors/${id}/books`;
    alert(id)
    axios.get(url)
        .then(result => {
            console.log(result);
            Store.dispatch({ type: 'ON_BOOKS_BY_AUTHOR', booksByAuthor: result.data.reverse() })
        })
        .catch(e => {
            console.log(e)
        })
};

// Deleta o autor 
const deleteAuthor = (id) => {
    let url = REACT_APP_DNS + `/authors/${id}`;
    axios.delete(url)
        .then(result => {
            console.log(result);
            getAuthors();
            // chamar modal dizendo que o item foi deletado
        })
        .catch(e => {
            console.log(e)
        })
};


export const GeneralReducer = (state = initialState, action) => {

    // Immutability
    state = Object.assign({}, state)

    switch (action.type) {    

        case 'ON_OPEN_SIDEBAR':
            return { ...state, openSideBar: true };
        case 'ON_CLOSE_SIDEBAR':
            return { ...state, openSideBar: false };
        case 'ON_AUTHORS':
            // console.log(action.authors);
            return { state, authors: action.authors, page: "Authors" }
        
        case 'ON_DELETE_AUTHOR':
            console.log(action.id);
            deleteAuthor(action.id);
            return { state }


        case 'ON_BOOKS_BY_AUTHOR':
            return { state, booksByAuthor: action.booksByAuthor, page: "BooksByAuthor" }  


        case 'ON_GET_BOOKS_BY_AUTHOR':
            console.log(action.id);
            getBooksByAuthors(action.id);
            return { state, currentAuthor: action.id}  

        case 'ON_CURRENT_AUTHOR':
            console.log(action);
            // deleteAuthor(action.id)
            return { state, currentAuthor: action.id, page: "Author" }

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