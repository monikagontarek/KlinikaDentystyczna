import React from 'react';
import logo from './logo.svg';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import RegisterPage from "./Register/RegisterPage";
import {makeStyles} from "@material-ui/core/styles";
import {createMuiTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import LoginPage from "./Register/LoginPage";
import BookDentistPage from "./BookDentistPage";

// tworze temat
const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                body: {
                    width: "100%",
                    height: "100%"
                },
                html: {
                    width: "100%",
                    height: "100%"
                },
                "#root": {
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#f5f5f5"
                },
            },
        },
    },
});



function App() {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>

            <Router>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/register">
                            <RegisterPage/>
                        </Route>
                        <Route path="/login">
                            <LoginPage/>
                        </Route>
                        <Route path="/book-dentist">
                            <BookDentistPage/>
                        </Route>
                        <Route path="/">
                        </Route>
                    </Switch>
            </Router>
        </ThemeProvider>

    );
}

export default App;
