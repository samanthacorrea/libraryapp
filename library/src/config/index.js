import React from 'react'

// Pages
import Authors from '../pages/authors'
import BooksByAuthors from '../pages/books-by-authors'
// Modals
import DeleteAuthor from '../pages/authors/modals/delete-author'
import UpdateAuthor from '../pages/authors/modals/update-author'
// import DeleteAuthor from '../pages/authors/modals/delete-author'
// import DeleteAuthor from '../pages/authors/modals/delete-author'


const MODALS = {
    'DELETE_AUTHOR': <DeleteAuthor />,
    'UPDATE_AUTHOR': <UpdateAuthor />,

};

const PAGES = {
    'Authors': <Authors />,
    'BooksByAuthor': <BooksByAuthors />
};


export {
    MODALS,
    PAGES,
}