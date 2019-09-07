import React from 'react';
import './index.sass';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  const REACT_APP_DNS = "https://bibliapp.herokuapp.com/api";

  
const BooksByAuthor = (props) => {
    const classes = useStyles();
    console.log(props.booksByAuthor);
    return (
        <div>
            <h2>Listagem de livros de um autor {props.currentAuthor}</h2>

            <div className={"container"}>
                 <div className={"row"}>
                 {
                    props.booksByAuthor?
                        <Grid container spacing={5}>
                            {
                                props.booksByAuthor.map((book, index) => 
                                    <Grid item xs={7}>
                                        <Paper  className={classes.paper}>                                            
                                            {index+1} {book.title} {book.isbn}
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


