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
  

const DeleteAuthor = (props) => {
    const classes = useStyles();
    let currentAuthor = JSON.parse(localStorage.getItem('@library/currentAuthor'));

    const deleteAuthor = () => {
        props.deleteAuthor(currentAuthor.id);
    }

    return (
        <div>
            <div>
                Se essa ação for executada todos os livros relacionados ao autor <b>"{currentAuthor.firstName} {currentAuthor.lastName}" </b>
                também serão excluídos.<br/><br/>
                Deseja realmente realizar esta ação? 
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
                            onClick={() => deleteAuthor()}>
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
    deleteAuthor: (id) => dispatch({ type: 'ON_DELETE_AUTHOR', id: id}),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAuthor)