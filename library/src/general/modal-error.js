import React from 'react'
import { connect } from "react-redux"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }));
  

const ModalError = (props) => {
    const classes = useStyles();
  
    return (
        <div>
            <div className="text-center mt-3">
                Ocorreu um erro e não foi possível <br/>realizar essa operação!
                Tente novamente. 
            </div>

            <div className="text-center mb-3">
                <ErrorOutlineOutlinedIcon color="secondary" fontSize="large"/>
            </div>

            <div className={"row text-center"}>
                <div className={"col-12"}>
                    <Button variant="contained" color="primary" className={classes.button}
                            onClick={() => props.closeModal()}>
                        OK!
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalError)