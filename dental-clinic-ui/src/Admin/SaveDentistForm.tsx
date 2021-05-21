import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
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
        <div style={{fontSize: "15px", padding: "15px"}}>
            <form onSubmit={handleOnSubmit}>
            <label style={{marginRight: "35px"}}>Wprowadz imię dentysty</label> <input value={name} onChange={(event) => setName(event.target.value)}/><br/>
            <label>Wprowadz nazwisko dentysty</label> <input value={lastName} onChange={(event) => setLastName(event.target.value)}/><br/>
            <label style={{marginRight: "25px"}}>Wprowadz email dentysty</label> <input value={mail} onChange={(event) => setMail(event.target.value)}/><br/>
            <label style={{marginRight: "25px"}}>Wprowadz hasło dentysty</label> <input value={passwordDentist}
                                                                                        onChange={(event) => setPasswordDentist(event.target.value)}/><br/>
            <Button onClick={handleSave} variant="contained" color="primary">
                Zapisz
            </Button>
            </form>

        </div>
    );
};

export default SaveDentistForm;
