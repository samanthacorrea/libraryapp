import { Store } from '../store';
import axios from 'axios';

const initialState = {
    page: 'Authors',
    modalType: 'MODELS',
    modalTitle: null,
    modalSize: null,
};

export const GeneralReducer = (state = initialState, action) => {

    // Immutability
    state = Object.assign({}, state)

    switch (action.type) {
        case 'ON_CHANGE_PAGE':
            return { ...state, page: action.page, openSideBar: false };
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