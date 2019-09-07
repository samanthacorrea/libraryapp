import React from 'react'

// Pages
import Authors from '../pages/authors'
import BooksByAuthors from '../pages/books-by-authors'
// Modals
import DeleteAuthor from '../pages/authors/modals/delete-author'
import UpdateAuthor from '../pages/authors/modals/update-author'
import DeleteBook from '../pages/books-by-authors/modals/delete-book'
// import DeleteAuthor from '../pages/authors/modals/delete-author'


const MODALS = {
    'DELETE_AUTHOR': <DeleteAuthor />,
    'UPDATE_AUTHOR': <UpdateAuthor />,
    'DELETE_BOOK': <DeleteBook />

};

const PAGES = {
    'Authors': <Authors />,
    'BooksByAuthor': <BooksByAuthors />
};


export {
    MODALS,
    PAGES,
}