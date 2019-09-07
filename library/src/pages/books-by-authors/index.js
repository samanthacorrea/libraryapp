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

  const REACT_APP_DNS = "https://bibliapp.herokuapp.com/api";

  
const BooksByAuthor = (props) => {
    const classes = useStyles();
    console.log(props.booksByAuthor);

    let currentAuthor = JSON.parse(localStorage.getItem('@library/currentAuthor'));
    return (
        <div>
            <h2>Lista de livros de um autor {currentAuthor.firstName} {currentAuthor.lastName}</h2>

            <div className={"container"}>
                 <div className={"row"}>
                 {
                    props.booksByAuthor?
                        <Grid container spacing={5}>
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
                                                                // onClick={() => updateAuthor()}
                                                                >
                                                            <IconButton aria-label="edit">
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Tooltip>

                                                        <Tooltip 
                                                                title="Excluir" 
                                                                className={"mt-3"}
                                                                // onClick={() => deleteAuthor(author.id, author.firstName, author.lastName)}
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
                        <div>Tem nada!</div>
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
    getBooksByAuthor: (id) => dispatch({ type: 'ON_GET_BOOKS_BY_AUTHOR', id: id})
})

export default connect(mapStateToProps, mapDispatchToProps)(BooksByAuthor)


