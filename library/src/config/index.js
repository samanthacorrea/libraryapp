import React from 'react'

// Pages
import Authors from '../pages/authors'
import BooksByAuthors from '../pages/books-by-authors'
// Modals
import FirstModal from '../pages/authors/modals/first-modal'


const MODALS = {
    'FIRST_MODAL': <FirstModal />,
};

const PAGES = {
    'Authors': <Authors />,
    'BooksByAuthor': <BooksByAuthors />
};


export {
    MODALS,
    PAGES,
}