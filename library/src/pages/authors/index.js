import React from 'react';
import './index.sass';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import CardHeader from '@material-ui/core/CardHeader';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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
    },
    margin: {
        margin: theme.spacing(1),
    },
    fab: {
        margin: theme.spacing(2),
        backgroundColor: deepOrange[500],
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
    orange: {
        backgroundColor: deepOrange[500],
        color: "#fff"
    },
    progress: {
        margin: theme.spacing(2),
    },
  }));

  
const Authors = (props) => {
    const classes = useStyles();

    const deleteAuthor = (id) => {
        console.log("Excluir autor ");  
        props.openModal('FIRST_MODAL', "Excluir autor?", 'xs')
        // props.deleteAuthor(id);
    }

    const updateAuthor = (id) => {
        console.log("Editar autor")

    }

    return (
        <div>
            <Tooltip title="Adicionar autor" aria-label="add">
                <Fab color="primary" className={classes.absolute + " " + classes.orange}>
                <AddIcon />
                </Fab>
            </Tooltip>
            
            <h2>Listagem de autores</h2>

            {
                props.authors?
                    <div className={"container"}>
                        <div className={"row"}>
                            <Grid container spacing={3}>
                                <div className={"col-2"}></div>
                                <div className={"col-8"}>
                                    <TextField
                                        id="outlined-full-width"
                                        // label="Label"
                                        style={{ margin: 9 }}
                                        placeholder="Pesquisar..."
                                        // helperText="Full width!"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <div className={"col-2"}></div>

                                {/* <div className={"col-4 text-right"}>
                                    <Button variant="contained" 
                                            size="large" 
                                            color="primary" 
                                            className={classes.margin + " pt-3 pb-3"}>
                                        + Adicionar Autor
                                    </Button>
                                </div> */}

                            {
                                props.authors.map((author, index) => 
                                <Grid item xs={6}>
                                    <Paper  className={classes.paper} 
                                            style={{cursor: "pointer"}}
                                            // onClick={() => props.getBooksByAuthor(author.id)}
                                            >

                                        
                                        <CardHeader
                                                avatar={
                                                <Avatar aria-label="recipe" className={classes.avatar}>
                                                    {index+1}
                                                    {/* {author.firstName.substring(0, 1)}{author.lastName.substring(0, 1)} */}

                                                </Avatar>
                                                }
                                                action={
                                                    <span>
                                                        <Tooltip 
                                                                title="Editar" 
                                                                className={"mt-3"}
                                                                >
                                                            <IconButton aria-label="edit">
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Tooltip>

                                                        <Tooltip 
                                                                title="Excluir" 
                                                                className={"mt-3"}
                                                                onClick={() => deleteAuthor(author.id)}
                                                                >
                                                            <IconButton aria-label="delete">
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </span>
                                                }
                                                title={author.firstName + " " + author.lastName}
                                            />
                                    </Paper>
                                </Grid>
                                )
                            }
                        </Grid>
                        </div>
                    </div>
 
                    :
                    <div>
                        Carregando...
                    </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    authors: state.general.authors,
})

const mapDispatchToProps = (dispatch) => ({
    getBooksByAuthor: (id) => dispatch({ type: 'ON_GET_BOOKS_BY_AUTHOR', id: id}),
    deleteAuthor: (id) => dispatch({ type: 'ON_DELETE_AUTHOR', id: id}),
    openModal: (modalType, modalTitle, modalSize) => dispatch({
        type: 'ON_OPEN_MODAL',
        modalType: modalType,
        modalTitle: modalTitle,
        modalSize: modalSize
    }),
    closeModal: () => dispatch({ type: 'ON_CLOSE_MODAL' }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Authors)


