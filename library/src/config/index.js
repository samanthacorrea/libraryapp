import React from 'react'

// Pages
import Authors from '../pages/authors'
import BooksByAuthors from '../pages/books-by-authors'
// Modals
import CreateAuthor from '../pages/authors/modals/create-author'
import DeleteAuthor from '../pages/authors/modals/delete-author'
import UpdateAuthor from '../pages/authors/modals/update-author'
import CreateBook from '../pages/books-by-authors/modals/create-book'
import DeleteBook from '../pages/books-by-authors/modals/delete-book'
import UpdateBook from '../pages/books-by-authors/modals/update-book'
import ModalError from '../general/modal-error'
import ModalSuccess from '../general/modal-success'

const MODALS = {
    'CREATE_AUTHOR': <CreateAuthor />,
    'DELETE_AUTHOR': <DeleteAuthor />,
    'UPDATE_AUTHOR': <UpdateAuthor />,
    'CREATE_BOOK': <CreateBook />,   
    'DELETE_BOOK': <DeleteBook />,
    'UPDATE_BOOK': <UpdateBook />,
    'MODAL_ERROR': <ModalError />,
    'MODAL_SUCCESS': <ModalSuccess />,


};

const PAGES = {
    'Authors': <Authors />,
    'BooksByAuthor': <BooksByAuthors />
};


export {
    MODALS,
    PAGES,
}