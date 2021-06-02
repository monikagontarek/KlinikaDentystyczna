import React, {useContext} from "react";
import {useGlobalContext} from "./AppContext";


const UserInfo = () => {

    const {currentLoggedUser} = useGlobalContext()
    // console.log("current logged", currentLoggedUser)
    return (
        <div>
            <p> {currentLoggedUser ? `Witaj ${currentLoggedUser.email}` : "Nie jesteś zalogowany - aby porawnie umówić się na wizytę do dentysty, musisz się zalogować! Pamiętaj, że odświeżenie strony powoduje automatyczne wylogowanie."}</p>
        </div>
    )

}

export default UserInfo;
