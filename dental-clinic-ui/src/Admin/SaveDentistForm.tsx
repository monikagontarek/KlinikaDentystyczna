import React, {useEffect, useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Box, Container, Grid, TextField} from "@material-ui/core";
import {Link} from "react-router-dom";
import {IDentist} from "../types";
import {uuid} from 'uuidv4';

export interface IpageAddDentist {
    editDentist?: IDentist;
    onSave: (dentist: IDentist) => void;

}

const SaveDentistForm = (props: IpageAddDentist) => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mail, setMail] = useState("");
    const [passwordDentist, setPasswordDentist] = useState("");

    useEffect(() => {
        console.log("editDentist", props.editDentist)
        if (props.editDentist) {
            setName(props.editDentist.firstName)
            setLastName(props.editDentist.lastName)
            setMail(props.editDentist.email)
            setPasswordDentist(props.editDentist.password)
        }
    }, [props.editDentist])
    const handleSave = () => {

        const newDentist: IDentist = {
            id: props.editDentist ? props.editDentist.id : uuid(),
            firstName: name,
            lastName: lastName,
            email: mail,
            password: passwordDentist,
            reservations: []
        }

        setName("");
        setLastName("");
        setMail("");
        setPasswordDentist("");

        props.onSave(newDentist);

    }
    const handleOnSubmit=()=>{
        const newDentist: IDentist = {
            id: props.editDentist ? props.editDentist.id : uuid(),
            firstName: name,
            lastName: lastName,
            email: mail,
            password: passwordDentist,
            reservations: []
        }

        setName("");
        setLastName("");
        setMail("");
        setPasswordDentist("");
        props.onSave(newDentist);
    }



        
    return (

        
        <Box paddingTop={4} paddingBottom={3}>
            <Container maxWidth="sm">
            <Card>
                <CardContent>
                <Typography color="textSecondary">
                    Wprowadź dane dentysty:
                </Typography>
                <Grid>
            <form onSubmit={handleOnSubmit}>
            
            <TextField style={{margin: 5}} fullWidth={true} variant="outlined" label="Imię" value={name} onChange={(event) => setName(event.target.value)}/> 
            <TextField style={{margin: 5}} fullWidth={true} variant="outlined" label="Nazwisko" value={lastName} onChange={(event) => setLastName(event.target.value)}/>
            <TextField style={{margin: 5}} fullWidth={true} variant="outlined" label="Adres E-Mail" value={mail} onChange={(event) => setMail(event.target.value)}/>
            <TextField style={{margin: 5}} fullWidth={true} variant="outlined" label="Hasło" value={passwordDentist} onChange={(event) => setPasswordDentist(event.target.value)}/>
        
            </form>
            </Grid>
            </CardContent>
            <CardActions>
                <Button onClick={handleSave} style={{
                    backgroundColor: '#489da8', 
                    border: 0,
                    borderRadius: 3,
                    color: '#fff',
                    height: 48,
                    padding: '0 30px'}}type={"submit"}>Dodaj</Button>
            </CardActions>
            </Card>
            </Container>
        </Box>


    );
};

export default SaveDentistForm;
