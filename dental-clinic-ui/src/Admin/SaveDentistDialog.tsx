import React, {useEffect, useState} from 'react';
import {createStyles, Theme, withStyles, WithStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import SaveDentistForm from "./SaveDentistForm";
import {IDentist} from "../types";
import {uuid} from "uuidv4";

const styles = (theme: Theme) =>
    createStyles({
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

// export interface DialogTitleProps extends WithStyles<typeof styles> {
//     id: string;
//     children: React.ReactNode;
//     onClose: () => void;
//
// }

const DialogTitle = withStyles(styles)(() => {
    // const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography>
            <Typography variant="h6"> Dodawanie dentysty do bazy danych</Typography>

        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export interface SaveDentistDialogProps {
    editDentist?: IDentist;
    onSave: (dentist: IDentist) => void;
    openDialog: boolean;
    onCancel: () => void;
}

export default function SaveDentistDialog(props: SaveDentistDialogProps) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mail, setMail] = useState("");
    const [passwordDentist, setPasswordDentist] = useState("");

    const handleClickOpen = () => {
        setOpen(props.openDialog);
        console.log("open diualog", props.openDialog)

    };
    const handleCloseOk = () => {
        setOpen(false);

        // tzreba dodać rozwiązanie no dodanie użytkownika do bazy danych
    };
    const handleCloseNo = () => {
        setOpen(false);
        props.onCancel();
        // trzeba dodac rozwiazanie na anulowanie dodawania użytkownika
    };
    const handleClose = () => {
        setOpen(false);

    };

    useEffect(() => {
        console.log("editDentist", props.editDentist)
        if (props.editDentist) {
            setName(props.editDentist.firstName)
            setLastName(props.editDentist.lastName)
            setMail(props.editDentist.email)
            setPasswordDentist(props.editDentist.password)
        }
    }, [props.editDentist])

    const handleOnSubmit = (event: any) => {
        event.preventDefault();
        console.log("handleOnSubmit")
        // const newDentist: IDentist = {
        //     id: props.editDentist ? props.editDentist.id : uuid(),
        //     firstName: name,
        //     lastName: lastName,
        //     email: mail,
        //     password: passwordDentist,
        //     reservations: []
        // }
        //
        // setName("");
        // setLastName("");
        // setMail("");
        // setPasswordDentist("");
        // props.onSave(newDentist);
    }


    return (
        <div>
            <p>Czy chcesz dodajć użytkownika</p>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Dodaj użytkownika
            </Button>

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <form onSubmit={handleOnSubmit}>

                    <DialogTitle>
                        Dodawannie nowego dentysty do bazy danych.
                    </DialogTitle>
                    <DialogContent dividers>
                        {/*<PageAddDentist onAddNewDentist={handleAdd} onSubmit={handleSubmit}/>*/}
                        <div style={{fontSize: "15px", padding: "15px"}}>
                            <label style={{marginRight: "35px"}}>Wprowadz imię dentysty</label> <input value={name}
                                                                                                       onChange={(event) => setName(event.target.value)}/><br/>
                            <label>Wprowadz nazwisko dentysty</label> <input value={lastName} onChange={(event) => setLastName(event.target.value)}/><br/>
                            <label style={{marginRight: "25px"}}>Wprowadz email dentysty</label> <input value={mail}
                                                                                                        onChange={(event) => setMail(event.target.value)}/><br/>
                            <label style={{marginRight: "25px"}}>Wprowadz hasło dentysty</label> <input value={passwordDentist}
                                                                                                        onChange={(event) => setPasswordDentist(event.target.value)}/><br/>

                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button type={"submit"} color="primary">
                            Zapisz
                        </Button>
                        <Button autoFocus onClick={handleCloseNo} color="primary">
                            Anuluj
                        </Button>
                    </DialogActions>
                </form>

            </Dialog>

        </div>
    );
}
