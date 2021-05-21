import React, {useContext, useState} from "react";
import {useGlobalContext} from "./AppContext";
import LoginPage from "./Register/LoginPage";
import {Link, Route} from "react-router-dom";

const Button = () => {
    const {currentLoggedUser, setCurrentUser} = useGlobalContext();
    // const [visibleLoginPage, setVisibleLoginPage] = useState(false)

    const handleClickLogOut = () => {

        const newCurrentLoggedUser = null;
        setCurrentUser(newCurrentLoggedUser)

    };
    const handleLog = () => {

        window.location.href = "http://localhost:3000/login"

    }

    return (
        <>
            {currentLoggedUser ? (<button onClick={handleClickLogOut}>Wyloguj</button>) : handleLog()}
            {/*{visibleLoginPage? <Link to="/login"/> : null}*/}

        </>
    )
}

export default Button;
