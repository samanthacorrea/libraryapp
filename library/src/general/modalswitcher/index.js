import React from 'react'
import { connect } from 'react-redux'
import { Dialog } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { MODALS } from '../../config'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: 'fit-content',
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
    formControlLabel: {
      marginTop: theme.spacing(1),
    },
  }));

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});


const ModalSwitcher = (props) => {
    const classes = useStyles();

    return (

        <Dialog
            fullWidth
            maxWidth={props.modalSize}
            open={props.openModal}
            onClose={props.closeModal}
            aria-labelledby="customized-dialog-title">
                 <DialogTitle id="customized-dialog-title" onClose={props.closeModal}>
                    <span className="text-uppercase font-weight-bolder fs-18 ls-2">{props.modalTitle}</span>
                </DialogTitle>
                <DialogContent dividers>
                    <div className={classes.paper}>
                        {MODALS[props.modalType]}
                    </div>
                </DialogContent>
        </Dialog>
    
    )
}

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose } = props;
    console.log(props);
    return (
      <MuiDialogTitle disableTypography className={classes.root}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const DialogContent = withStyles(theme => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

const mapStateToProps = (state) => ({
    openModal: state.general.openModal,
    modalTitle: state.general.modalTitle,
    modalSize: state.general.modalSize,
    modalType: state.general.modalType
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({ type: 'ON_CLOSE_MODAL' })
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalSwitcher)