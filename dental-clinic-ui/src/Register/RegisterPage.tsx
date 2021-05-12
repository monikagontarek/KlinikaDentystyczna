import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Box, Container, Grid, TextField} from "@material-ui/core";
import axios from 'axios';
import MockAdapter from "axios-mock-adapter";
import {Alert, AlertTitle} from '@material-ui/lab';
import {Link} from "react-router-dom";

const mock = new MockAdapter(axios);


mock.onPost("/api/users/register").reply(200);

const useStyles = makeStyles({
    root: {
        minWidth: 275,

    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
        fontWeight: 400,


    },
});

export interface IRegisterUser {
    firstName: string,
    lastName: string,
    pesel: string,
    mail: string,
    password: string,
    phone: string

}

const RegisterPage = () => {
    const classes = useStyles();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [pesel, setPesel] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [registered, setRegistered] = useState(false);

    const handleFirstNameChange = (event: any) => {
        // if(event.target.value == "") {
        //     setErrors({...errors, "firstName": "Pole jest Wymagane"})
        // } else {
        //     const cloned = {...errors};
        //     delete cloned["firstName"];
        //     setErrors(cloned)
        // }

        setFirstName(event.target.value)
    };
    const handleLastNameChange = (event: any) => {
        setLastName(event.target.value)
    };
    const handlePeselChange = (event: any) => {
        setPesel(event.target.value)
    };
    const handleMailChange = (event: any) => {
        setMail(event.target.value)
    };
    const handlePhoneChange = (event: any) => {
        setPhone(event.target.value)
    };
    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value)
    }

    const handleRegister = async (e: any) => {
        e.preventDefault();
        let newErrors: Record<string, string> = {}
        const registerUser: IRegisterUser = {
            firstName: firstName,
            lastName: lastName,
            pesel: pesel,
            mail: mail,
            password: password,
            phone: phone,
        }

        if (registerUser.firstName.length === 0) {
            newErrors = {...newErrors, "firstName": "Proszę podać imię"}
        }
        if (registerUser.lastName.length === 0) {
            newErrors = {...newErrors, "lastName": "Proszę podać nazwisko"}
        }
        if (!registerUser.mail.includes("@")) {
            newErrors = {...newErrors, "mail": "Prosze podać adres email"}
        }
        if (registerUser.password.length < 6) {
            newErrors = {...newErrors, "password": "Hasło musi zawierać przynajmniej 6 znaków"}
        }
        if (registerUser.pesel.length !== 11) {
            newErrors = {...newErrors, "pesel": "Prosze podać pesel"}
        }
        if (registerUser.phone.length !== 9) {
            newErrors = {...newErrors, "phone": "Prosze podać numer telefonu"}
        }

        if (Object.keys(newErrors).length === 0) {

            console.log("Register", registerUser)

            // axios biblioteka ktora robi zadania http (komunikuje sie z backendem)
            const response = await axios.post("/api/users/register", registerUser)
            console.log("odpowiedz od serwera", response)
            setRegistered(true)

        } else {
            console.error("Wtystepuja bledy", newErrors)
        }

        setErrors(newErrors)

    };


    return (
        <>
            <Box paddingTop={10}>
                <Container maxWidth="sm">
                    <>
                        <form onSubmit={handleRegister} autoComplete="off">
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        Zarejestruj się:
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        W celu rejstracji wprowadź wszystkie dane
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField error={!!errors["firstName"]} helperText={errors["firstName"]} fullWidth={true} label="Imię"
                                                       variant="outlined" value={firstName} onChange={handleFirstNameChange}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField error={!!errors["lastName"]} helperText={errors["lastName"]} fullWidth={true} label="Nazwisko"
                                                       variant="outlined" value={lastName} onChange={handleLastNameChange}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField error={!!errors["pesel"]} helperText={errors["pesel"]} fullWidth={true} label="Pesel" variant="outlined"
                                                       value={pesel} onChange={handlePeselChange}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField error={!!errors["mail"]} helperText={errors["mail"]} type={"mail"} fullWidth={true} label="Adres e-mail"
                                                       variant="outlined" value={mail}
                                                       onChange={handleMailChange}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField error={!!errors["password"]} helperText={errors["password"]} type={"password"} fullWidth={true}
                                                       label="Hasło" variant="outlined" value={password}
                                                       onChange={handlePasswordChange}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField error={!!errors["phone"]} helperText={errors["phone"]} type={"phone"} fullWidth={true} label="Telefon"
                                                       variant="outlined" value={phone} onChange={handlePhoneChange}/>
                                        </Grid>
                                    </Grid>
                                    <Typography className={classes.pos} color="textSecondary">
                                        Jesteś już zarejestrowany? Zaloguj się tutaj:
                                        <Link to={'/login'}> Logowanie </Link>
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" color="primary" type={"submit"}>Zarejestruj się</Button>
                                </CardActions>
                            </Card>
                        </form>
                    </>

                    {
                        registered && <>
                            <Alert severity="success">
                                <AlertTitle>Success</AlertTitle>
                                Twoja rejestracja zakończyła się sukcesem! -- <strong>Gratulacje
                            </strong>
                            </Alert>
                        </>
                    }
                </Container>
            </Box>
        </>
    );
};

export default RegisterPage;
