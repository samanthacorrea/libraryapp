import React from 'react';
import { Provider } from "react-redux"
import { Store } from './redux/store'
import PageSwitcher from './pages'
import ModalSwitcher from './general/modalswitcher'

const App = (props) => {
	return (
		<Provider store={Store}>
            <PageSwitcher />
			<ModalSwitcher />
		</Provider>
	);
}

export default App
