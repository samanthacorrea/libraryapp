import React from 'react'
import { connect } from "react-redux"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }));
  

const DeleteBook = (props) => {
    const classes = useStyles();
    let currentAuthor = JSON.parse(localStorage.getItem('@library/currentAuthor'));
    let currentBook = JSON.parse(localStorage.getItem('@library/currentBook'));

    const deleteBook = () => {
        props.deleteBook(currentBook.idAuthor, currentBook.idBook);
    }

    return (
        <div>
            <div>
                Excluir o livro "<b>{currentBook.bookTitle}</b>"?
            </div>

            <div className={"row"}>
                <div className={"col-8 text-right"}>
                <Button color="primary" className={classes.button}
                        onClick={() => props.closeModal()}>
                    Cancelar
                </Button>
                </div>
                
                <div className={"col-3"}>
                    <Button variant="contained" color="secondary" className={classes.button}
                            onClick={() => deleteBook()}>
                        Excluir
                    </Button>
                </div>
            </div>
            
        </div>  

    )
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({ type: 'ON_CLOSE_MODAL' }),
    deleteBook: (idAuthor, idBook) => dispatch({ type: 'ON_DELETE_BOOK_BY_AUTHOR', idAuthor: idAuthor, idBook: idBook }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteBook)