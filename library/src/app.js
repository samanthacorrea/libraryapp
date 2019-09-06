import React from 'react';
import { Provider } from "react-redux"
import { Store } from './redux/store'
import PageSwitcher from './pages'
import ModalSwitcher from './general/modalswitcher'

const App = (props) => {
	return (
		<Provider store={Store}>
            <ModalSwitcher />
            <PageSwitcher />
		</Provider>
	);
}

export default App
