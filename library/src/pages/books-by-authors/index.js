import React from 'react';
import './index.sass';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import CardHeader from '@material-ui/core/CardHeader';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import { Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },

    avatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepOrange[500],
    }
    
  }));

  
const BooksByAuthor = (props) => {
    const classes = useStyles();

    let currentAuthor = JSON.parse(localStorage.getItem('@library/currentAuthor'));

    const updateBook = (id, title, isbn) => {
        console.log("Editar livro")
        let data = {
            id: id,
            title: title,
            isbn: isbn
        }
        localStorage.setItem('@library/currentBook', JSON.stringify(data));
        props.openModal('UPDATE_BOOK', 'Atualizar livro', "xs")
    }

    const deleteBook = (id, title) => {
        console.log("Excluir livro ");  

        let data = {
            idAuthor: currentAuthor.id,
            idBook: id,
            bookTitle: title
        }

        console.log(data)
    
        localStorage.setItem('@library/currentBook', JSON.stringify(data));
        props.openModal('DELETE_BOOK', 'Excluir livro', 'xs')
        // props.deleteAuthor(id);
    }
    return (
        <div>
            <div className={"text-left"}>
                <Tooltip 
                    title="Voltar" 
                    className={"mt-4 ml-4"}
                    onClick={() => props.backToHome()}
                    >
                    <IconButton aria-label="edit">
                        <ArrowBackOutlinedIcon fontSize="large"/>
                    </IconButton>
                </Tooltip>
            </div>
            <div className={"container"}>
                 <div className={"row"}>
                 {
                    props.booksByAuthor.length>0?
                
                        <Grid container spacing={5}>
                            <h2>Lista de livros de um autor {currentAuthor.firstName} {currentAuthor.lastName}</h2>

                            <div className={"col-2"}></div>
                                <div className={"col-8"}>
                                    <TextField
                                        id="outlined-full-width"
                                        style={{ margin: 9, background: 'white' }}
                                        placeholder="Pesquisar por livro do autor..."
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <div className={"col-2"}></div>
                            {
                                props.booksByAuthor.map((book, index) => 
                                    <Grid item xs={6}>
                                        <Paper  className={classes.paper}>  

                                        <CardHeader
                                                avatar={
                                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                                        {index+1}
                                                    </Avatar>
                                                }
                                                action={
                                                    <span>
                                                        <Tooltip 
                                                                title="Editar" 
                                                                className={"mt-3"}
                                                                onClick={() => updateBook(book.id, book.title, book.isbn)}
                                                                >
                                                            <IconButton aria-label="edit">
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Tooltip>

                                                        <Tooltip 
                                                                title="Excluir" 
                                                                className={"mt-3"}
                                                                onClick={() => deleteBook(book.id, book.title)}
                                                                >
                                                            <IconButton aria-label="delete">
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </span>
                                                }
                                                className="text-left"
                                                title={"Título do livro: " + book.title}
                                                subheader={"ISBN: " + book.isbn}

                                            />
                                        
                                        </Paper>
                                    </Grid>
                                )
                            }
                        </Grid>
                        :
                        <div className={"container pt-5"}>
                            <div className={"row"}>
                                <div className={"col-2"}></div>
                                <div className={"col-8"}>
                                    <h5 className={"text-center"}>O autor "{currentAuthor.firstName} {currentAuthor.lastName}" <br/>
                                    não contém livros cadastrados!</h5>
                                    <div className={"text-center"}>
                                        <SentimentDissatisfiedIcon color="disabled" fontSize="large"/>
                                    </div>

                                </div>
                                <div className={"col-2"}></div>
                            </div>
                        </div>

                }
                 </div>
            </div>
        
        </div>
    )
}

                            
const mapStateToProps = (state) => ({
    currentAuthor: state.general.currentAuthor,
    booksByAuthor: state.general.booksByAuthor,
})

const mapDispatchToProps = (dispatch) => ({
    getBooksByAuthor: (id) => dispatch({ type: 'ON_GET_BOOKS_BY_AUTHOR', id: id}),
    openModal: (modalType, modalTitle, modalSize) => dispatch({
        type: 'ON_OPEN_MODAL',
        modalType: modalType,
        modalTitle: modalTitle,
        modalSize: modalSize
    }),
    closeModal: () => dispatch({ type: 'ON_CLOSE_MODAL' }),
    backToHome: () => dispatch({ type: 'ON_HOME' }),
})

export default connect(mapStateToProps, mapDispatchToProps)(BooksByAuthor)


