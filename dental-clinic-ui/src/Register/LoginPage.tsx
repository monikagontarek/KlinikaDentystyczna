import React, {useState} from "react";
import {Box, Container, Grid, TextField} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Alert, AlertTitle} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";

import {
    Link, useHistory
} from "react-router-dom";
import RegisterPage from "./RegisterPage";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

export interface IuserLogged {
    mail: string,
    password: string
}

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

const mock = new MockAdapter(axios);

mock.onPost("/api/users/login", {mail: "user@gmail.com", password: "123456"}).reply(200);
mock.onPost("/api/users/login").reply(403);

const LoginPage = () => {
    const classes = useStyles();
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const [errors, setErrors] = useState<Record<string, string>>({});



    const handleMailChange = (event: any) => {
        setMail(event.target.value)
    };
    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value)
    }

    const handleLogin = async (e: any) => {
        e.preventDefault();
        let newErrors: Record<string, string> = {}
        const user: IuserLogged = {
            mail: mail,
            password: password
        }
        // if(userLogged.mail !== registerUser.mail){
        //
        // }

        if (!user.mail.includes("@")) {
            newErrors = {...newErrors, "mail": "Prosze podać poprawny adres email"}
        }
        if (user.password.length < 6) {
            newErrors = {...newErrors, "password": "Błędie wprowadzone hało, musi zawierać przynajmniej 6 znaków"}
        }
        if (Object.keys(newErrors).length === 0) {

            console.log("User in logg", user)

            // axios biblioteka ktora robi zadania http (komunikuje sie z backendem - czy logowany element znajduje się w bazie dodanych przy rejestracji)
            try {
                const response = await axios.post("/api/users/login", user)
                console.log("odpowiedz od serwera", response)
                // tutaj powinnam ustawić tego użytkownika zalogowanego w context
                history.push("/book-dentist")
            } catch (e) {
                console.error("odpowiedz od serwera jest bledna", e)
            }
            // jeśli odpowiedz jest pozytywna - status = 200 to chciałabym automatycznie przejsc na stronę widoku kalendarza

        } else {
            console.error("Wtystepuja bledy", newErrors)
        }
        setErrors(newErrors)
    }

    return (
        <>
            <Box paddingTop={10}>
                <Container maxWidth="sm">
                    <>
                        <form onSubmit={handleLogin} autoComplete="on">
                            <Card className={classes.root}>
                                <CardContent>

                                    <Typography className={classes.pos} color="textSecondary">
                                        Aby się zalogowac wprowadź poprawne dane:
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField error={!!errors["mail"]} helperText={errors["mail"]}
                                                       type={"mail"} fullWidth={true} label="Adres e-mail"
                                                       variant="outlined" value={mail}
                                                       onChange={handleMailChange}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField error={!!errors["password"]} helperText={errors["password"]}
                                                       type={"password"} fullWidth={true}
                                                       label="Hasło" variant="outlined" value={password}
                                                       onChange={handlePasswordChange}/>
                                        </Grid>

                                    </Grid>
                                    <Typography className={classes.pos} color="textSecondary">
                                        Nie masz jeszcze konta ? Zarejestruj się tutaj:
                                        <Link to={'/register'}> Rejestracja</Link>
                                    </Typography>

                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" color="primary" type={"submit"}>Zaloguj się</Button>
                                </CardActions>
                            </Card>
                        </form>
                    </>

                </Container>
            </Box>
        </>
    )
};

export default LoginPage;
