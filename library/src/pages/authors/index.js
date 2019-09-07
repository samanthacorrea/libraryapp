import React from 'react';
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
// import TextField from '@material-ui/core/TextField';
import CardHeader from '@material-ui/core/CardHeader';
import Fab from '@material-ui/core/Fab';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import AddIcon from '@material-ui/icons/Add';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

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
  }));

  
const Authors = (props) => {
    const classes = useStyles();

    const deleteAuthor = (id, firstName, lastName) => {
        console.log("Excluir autor ");  
        let data = {
            id: id,
            firstName: firstName,
            lastName: lastName
        }
        localStorage.setItem('@library/currentAuthor', JSON.stringify(data));
        props.openModal('DELETE_AUTHOR', 'Excluir autor', 'xs')
        // props.deleteAuthor(id);
    }

    const updateAuthor = (id,firstName, lastName) => {
        console.log("Editar autor")
        let data = {
            id: id,
            firstName: firstName,
            lastName: lastName
        }
        localStorage.setItem('@library/currentAuthor', JSON.stringify(data));
        props.openModal('UPDATE_AUTHOR', 'Atualizar autor', "xs")
    }

    const getBooksByAuthor = (id, firstName, lastName) => {
        let data = {
            id: id,
            firstName: firstName,
            lastName: lastName
        }
        localStorage.setItem('@library/currentAuthor', JSON.stringify(data));
        
        props.getBooksByAuthor(id);
    }

    return (
        <div>

            {
                props.authors?
                    <div className={"container pt-5"}>
                        <Tooltip title="Adicionar autor" aria-label="add" 
                                onClick={e => props.openModal("CREATE_AUTHOR", "Adicionar autor", "xs")}
                        >
                            <Fab color="primary" className={classes.absolute + " " + classes.orange}>
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                                                
                        <div className={"row"}>
                            <Grid container spacing={3}>
                                {/* <div className={"col-2"}></div> */}
                                <div className={"col-12"}>
                                    <h2 className="text-uppercase text-center mb-5" style={{letterSpacing: "1px", color: "rgb(109, 109, 109)"}}>
                                        <b>Autores de Livros</b>
                                    </h2>
                                    {/* <TextField
                                        id="outlined-full-width"
                                        style={{ margin: 9, background: 'white' }}
                                        placeholder="Pesquisar por autor..."
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    /> */}
                                </div>
                                {/* <div className={"col-2"}></div> */}

                            {
                                props.authors.map((author, index) => 
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
                                                                title="Ver livros" 
                                                                className={"mt-3"}
                                                                onClick={() => getBooksByAuthor(author.id, author.firstName, author.lastName)}>
                                                            <IconButton aria-label="open">
                                                                <FolderOpenIcon />
                                                            </IconButton>
                                                        </Tooltip>

                                                        <Tooltip 
                                                                title="Editar" 
                                                                className={"mt-3"}
                                                                onClick={() => updateAuthor(author.id, author.firstName, author.lastName)}
                                                                >
                                                            <IconButton aria-label="edit">
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Tooltip>

                                                        <Tooltip 
                                                                title="Excluir" 
                                                                className={"mt-3"}
                                                                onClick={() => deleteAuthor(author.id, author.firstName, author.lastName)}
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
                    <div className={"container pt-5"} style={{color: "rgb(109, 109, 109)"}}>
                        <div className={"row"}>
                            <div className={"col-2"}></div>
                            <div className={"col-8"}>
                                <h5 className={"text-center"}>
                                    Ainda não há autores<br/>
                                    cadastrados.
                                </h5>
                                <div className={"text-center"}>
                                    <SentimentDissatisfiedIcon color="disabled" fontSize="large"/>
                                </div>
                                <div className={"text-center mt-5"}>
                                    Adicione um novo autor<br/>
                                    <Tooltip title="Adicionar autor" aria-label="add" 
                                            onClick={e => props.openModal("CREATE_AUTHOR", "Adicionar autor", "xs")}>
                                            <Fab color="primary" className={classes.orange}>
                                                <AddIcon />
                                            </Fab>
                                        </Tooltip>
                                </div>

                            </div>
                            <div className={"col-2"}></div>
                        </div>
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
    setCurrentAuthor: (id) => dispatch({ type: 'ON_CURRENT_AUTHOR', id: id}),
    openModal: (modalType, modalTitle, modalSize) => dispatch({
        type: 'ON_OPEN_MODAL',
        modalType: modalType,
        modalTitle: modalTitle,
        modalSize: modalSize
    }),
    closeModal: () => dispatch({ type: 'ON_CLOSE_MODAL' }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Authors)


