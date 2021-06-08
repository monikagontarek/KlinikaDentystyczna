import React, {useState} from "react";
import {Box, Container, Grid, TextField} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Alert, AlertTitle, Autocomplete} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";


import {
    Link, useHistory
} from "react-router-dom";
import RegisterPage from "./RegisterPage";
import axios from "axios";
import {useGlobalContext} from "../AppContext";
import {IUser} from "../types";
import MockAdapter from "axios-mock-adapter";
import { pink } from "@material-ui/core/colors";

export interface IuserLogged {
    email: string,
    password: string
}




const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },

    buttonZaloguj: {
        backgroundColor: '#489da8',
        "&:hover": {
        backgroundColor: '#347b85',
        },
        border: 0,
        borderRadius: 3,
        color: '#fff',
        height: 48,
        padding: '0 30px',
      },

    logo: {
        width: 300,
        height: 90,
        marginLeft: '39%',
        marginTop: '1%',
    },

    linkrejestracja: {
        color: '#ce9f1f',
        marginLeft: '5px',

    },

    niemaszjeszczekonta: {
        marginTop: '10px',
    },

    title: {
        fontSize: 14,

    },
    pos: {
        marginBottom: 12,
        fontWeight: 100,
    },
});



const LoginPage = () => {
    const classes = useStyles();
    const [email, setMail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const {currentLoggedUser, setCurrentUser} = useGlobalContext()


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
            email: email,
            password: password
        }
        // if(userLogged.email !== registerUser.email){
        //
        // }

        if (!user.email.includes("@")) {
            newErrors = {...newErrors, "email": "Prosze podać poprawny adres email"}
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

                // jezeli kod przechodzi tutaj to znaczy ze logowanie przeszlo prawidlowo i ustawim w zmiennej globalnej copy email usera
                const myUser: IUser = {
                    email: user.email,
                    password: user.password,
                }
                setCurrentUser(myUser)
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
        <img src="http://lapavlo.pl/wp-content/uploads/2021/05/logodenti.png" className={classes.logo} />
            <Box paddingTop={4} >
                <Container maxWidth="sm">
                    <>
                        <form onSubmit={handleLogin} autoComplete="on">
                            <Card className={classes.root}>
                                <CardContent>

                                    <Typography className={classes.pos}>
                                        Aby się zalogować wprowadź poprawne dane:
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField error={!!errors["mail"]} helperText={errors["mail"]}
                                                       type={"mail"} fullWidth={true} label="Adres e-mail"
                                                       variant="outlined" value={email}
                                                       className="fieldColor"
                                                       onChange={handleMailChange}
                                                       id="outlined-basic"



                                                        />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField error={!!errors["password"]} helperText={errors["password"]}
                                                       type={"password"} fullWidth={true}
                                                       label="Hasło" variant="outlined" value={password}
                                                       onChange={handlePasswordChange}
                                                       color="secondary" />
                                        </Grid>

                                    </Grid>
                                    <Typography className={classes.niemaszjeszczekonta} color="textSecondary">
                                        Nie masz jeszcze konta? Zarejestruj się tutaj:
                                        <Link to={'/register'} className={classes.linkrejestracja} >Rejestracja</Link>
                                    </Typography>

                                </CardContent>
                                <CardActions>
                                    <Button className={classes.buttonZaloguj} type={"submit"}>Zaloguj się</Button>
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
