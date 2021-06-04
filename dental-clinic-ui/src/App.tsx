import React, {useState} from 'react';
import logo from './logo.svg';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, HashRouter, Redirect
} from "react-router-dom";
import AppProvider from "./AppContext";
import UserInfo from "./UserInfo";
import Button from "./Button";
import RegisterPage from "./Register/RegisterPage";
import {makeStyles} from "@material-ui/core/styles";
import {createMuiTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import LoginPage from "./Register/LoginPage";
import BookDentistPage from "./BookDentistPage";
import {mockData} from "./mock";
import AdminPage from "./Admin/AdminPage";



// tworze temat
const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                body: {
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#489da8",
                },
                html: {
                    width: "100%",
                    height: "100%"
                },
                "#root": {
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#489da8",
                },
            },
        },
    },
});
mockData();

function AdmiPage() {
    return null;
}

const App = () => {


    return (
        <AppProvider>
            < ThemeProvider theme={theme}>
                <CssBaseline/>

                <HashRouter>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/adminPage">
                            <AdminPage/>
                        </Route>
                        <Route path="/register">
                            <RegisterPage/>
                        </Route>
                        <Route path="/login">
                            <LoginPage/>
                        </Route>
                        <Route path="/book-dentist">
                            <BookDentistPage/>
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/login" />
                        </Route>

                    </Switch>
                </HashRouter>
            </ThemeProvider>
        </AppProvider>
    );


}

export default App;


