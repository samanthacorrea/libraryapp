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
  

const UpdateAuthor = (props) => {
    const classes = useStyles();

    return (
        <div>
            <div>
                Se essa ação for executada todos os livros relacionados a esse autor também serão excluídos.
                Deseja realmente realizar esta ação? 
            </div>

            <div className={"row"}>
                <div className={"col-8 text-right"}>
                <Button color="primary" className={classes.button}>
                    Cancelar
                </Button>
                </div>
                
                <div className={"col-3"}>
                    <Button variant="contained" color="secondary" className={classes.button}>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAuthor)