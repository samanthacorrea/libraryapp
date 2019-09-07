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


class UpdateBook extends React.Component {
    constructor(props) {
        super(props)
        let currentAuthor = JSON.parse(localStorage.getItem('@library/currentAuthor'));

        this.state = {
            firstName: currentAuthor.firstName,
            lastName: currentAuthor.lastName,
            errorFirstName: false,
            errorLastName: false,
            htFirstName: "",
            htLastName: "",
            data: {},
            hasChanges: false
        }

        this.handleChangeFirstName = (e) => {
            this.state.data["firstName"] = e.target.value;
            console.log(this.state.data)
            this.setState(this.state.data);
        };

        this.handleChangeLastName = (e) => {
            this.state.data["lastName"] = e.target.value;
            console.log(this.state.data)
            this.setState(this.state.data);
        };

        this.updateBook = () => {
            if (this.state.firstName !== currentAuthor.firstName ||
                this.state.lastName !== currentAuthor.lastName) {
                    console.log("Houveram modificações")
                    this.setState({ hasChanges: false })
                    if (this.state.firstName && this.state.lastName) {
                        console.log("Atualizar")
                        let data = {
                            id: currentAuthor.id,
                            firstName: this.state.firstName,
                            lastName: this.state.lastName
                        }
                        this.props.updateBook(data);
                    } else {
                        if (!this.state.firstName) {
                            this.setState( { 
                                errorFirstName: true, 
                                htFirstName: "Insira o nome do autor"
                            })
                        }
            
                        if (!this.state.lastName) {
                            this.setState( { 
                                errorLastName: true, 
                                htLastName: "Insira o sobrenome do autor"
                            })
                        }
                    }
                } else {
                    this.setState({ hasChanges: !this.state.hasChanges })
                }


        }

    }

    render() {

        return (

            <div>
                 <div className="row">
                    <div className={this.state.hasChanges?"col-12":"display-none"}>
                        <i>Não foram detectadas alterações.</i>
                    </div>
                    <div className="col-12">
                        <TextField
                            id="outlined-full-width"
                            label="Nome"
                            fullWidth
                            name="firstName"
                            error={this.state.errorFirstName}
                            value={this.state.firstName}
                            helperText={this.state.htFirstName}
                            onChange={this.handleChangeFirstName}
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
                            label="Sobrenome"
                            fullWidth
                            name="lastName"
                            error={this.state.errorLastName}
                            value={this.state.lastName}
                            helperText={this.state.htLastName}
                            onChange={this.handleChangeLastName}
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
                                onClick={() => this.updateBook()}>
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
    updateBook: (data) => dispatch({ type: 'ON_UPDATE_AUTHOR', data: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBook)