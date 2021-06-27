import React, {useState} from 'react';
import logo from './logo.svg';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    HashRouter,
    Link,
    Redirect
} from "react-router-dom";
import AppProvider from "./AppContext";
import UserInfo from "./UserInfo";
import Button from "./Button";
import RegisterPage from "./Register/RegisterPage";
import {makeStyles} from "@material-ui/core/styles";
import {createMuiTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import LoginPage from "./Register/LoginPage";
import BookDentistPage from "./BookDentistPage";
import AdminPage from "./Admin/AdminPage";
import axios from "axios";



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
// mockData();


const setupAxiosInterceptors = (onUnauthenticated?: any) => {
    const onRequestSuccess = async (config: any) => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (!config.headers.Authorization && token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }
    // const onResponseSuccess = (response: any) => response
    // const onResponseError = (err: any) => {
    //     const status = err.status || (err.response ? err.response.status : 0)
    //     if (status === 403 || status === 401) {
    //         // onUnauthenticated()
    //     }
    //     return Promise.reject(err)
    // }
    axios.interceptors.request.use(onRequestSuccess)
}




setupAxiosInterceptors();
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


