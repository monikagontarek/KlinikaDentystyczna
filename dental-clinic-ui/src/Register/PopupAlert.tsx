import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export interface AlertDialogProps {
    show: boolean,
    onYes: () => void,
    onNo: () => void,
}

export default function AlertDialog(props: AlertDialogProps) {


    const handleDisagree = () => {
        props.onNo()
    };
    const handleAgree = () =>{
        props.onYes()
    }

    return (
        <div>

            <Dialog
                open={props.show}
                onClose={handleDisagree}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDisagree} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={handleAgree} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
