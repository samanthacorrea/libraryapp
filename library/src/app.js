import React from 'react';
import { Provider } from "react-redux"
import { Store } from './redux/store'
import PageSwitcher from './pages'
import ModalSwitcher from './general/modalswitcher'
import SideBar from './general/side-bar'
import Author from './pages/authors'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import BooksByAuthor from './pages/books-by-authors'

const App = (props) => {
	return (
		<Provider store={Store}>

			{/* <BrowserRouter>
				<Switch>
					<Route path='/' exact component={Author} />
					<Route path='/livros-por-autor' component={BooksByAuthor} />
					<Route path='*' component={() => <h1 align='center'> 404 - Page not found. </h1>} />
				</Switch>
				<ModalSwitcher />
			</BrowserRouter> */}
			{/* <SideBar /> */}
            <PageSwitcher />
			<ModalSwitcher />
		</Provider>
	);
}

export default App
