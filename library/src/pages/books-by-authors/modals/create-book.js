import React from 'react'
import { connect } from "react-redux"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const classes = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }));


class CreateBook extends React.Component {
    constructor(props) {
        super(props)
        let currentAuthor = JSON.parse(localStorage.getItem('@library/currentAuthor'));

        this.state = {
            title: "",
            isbn: "",
            errorTitle: false,
            errorIsbn: false,
            htTitle: "",
            htIsbn: "",
            data: {},
        }
        this.handleChangeTitle = (e) => {
            this.state.data["title"] = e.target.value;
            console.log(this.state.data)
            this.setState(this.state.data);
        };

        this.handleChangeIsbn = (e) => {
            this.state.data["isbn"] = e.target.value;
            console.log(this.state.data)
            this.setState(this.state.data);
        };

        this.createBook = () => {
            console.log("salvar")
            if (this.state.title && this.state.isbn) {
                console.log("Criar")
                let data = {
                    id: currentAuthor.id,
                    title: this.state.title,
                    isbn: this.state.isbn
                }
                console.log(data)
                this.props.createBook(data);
            } else {
                if (!this.state.title) {
                    this.setState( { 
                        errorTitle: true, 
                        htTitle: "Insira o título do livro"
                    })
                }
    
                if (!this.state.isbn) {
                    this.setState( { 
                        errorIsbn: true, 
                        htIsbn: "Insira o ISBN do livro"
                    })
                }
            }
        }

    }

    render() {

        return (

            <div>
                 <div className="row">
                 <div className="col-12">
                        <TextField
                            id="outlined-full-width"
                            label="Título"
                            fullWidth
                            name="title"
                            error={this.state.errorTitle}
                            value={this.state.title}
                            helperText={this.state.htTitle}
                            onChange={this.handleChangeTitle}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </div>

                    <div className="col-12">
                        <TextField
                            id="outlined-full-width"
                            label="ISBN"
                            fullWidth
                            name="isbn"
                            error={this.state.errorIsbn}
                            value={this.state.isbn}
                            helperText={this.state.htIsbn}
                            onChange={this.handleChangeIsbn}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </div>
                </div>

                <div className={"row"}>
                    <div className={"col-8 text-right"}>
                    <Button color="primary" className={classes.button}>
                        Cancelar
                    </Button>
                    </div>
                    
                    <div className={"col-3"}>
                        <Button variant="contained" color="primary" className={classes.button}
                                onClick={() => this.createBook()}>
                            Salvar
                        </Button>
                    </div>
                </div>
                
            </div>  
        )
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({ type: 'ON_CLOSE_MODAL' }),
    createBook: (data) => dispatch({ type: 'ON_CREATE_BOOK', data: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateBook)