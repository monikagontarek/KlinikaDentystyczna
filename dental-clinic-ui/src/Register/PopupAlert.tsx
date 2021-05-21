import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export interface AlertDialogProps {
    show: boolean,
    info: string,
    onYes: () => void,
    onNo: () => void,
}

export default function AlertDialog(props: AlertDialogProps) {


    const handleDisagree = () => {
        props.onNo()
    };
    const handleAgree = () => {
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
                <DialogTitle id="alert-dialog-title">{"Czy napewno chcesz zapisać się na wizytę?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Wybrana przez Ciebie wizyta to: {props.info}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDisagree} color="primary">
                        NIE
                    </Button>
                    <Button onClick={handleAgree} color="primary" autoFocus>
                        TAK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
