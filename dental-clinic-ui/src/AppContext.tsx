import React, {createContext, useContext, useState} from 'react';
import {IuserLogged} from "./Register/LoginPage";
import {IUser} from "./types";
import {useLocalStorage} from "./useLocalStorage";

// export const defaultObject = {
//     isUserLogged: false,
//     toggleLoggesState: () => {
//     },
//
// }

// export const AppContext = createContext(defaultObject);



//  przekopiowalam te linie z tutorialu https://dev.to/madv/usecontext-with-typescript-23ln (skopiowalam po prostu kod)
//  zamieniam sobie te nazwe zmiennej z copy na typ User i nazwe zmienna tez user
//  roznica pomiedzy propsami a react context https://miro.medium.com/max/3472/1*Jx8BCxZFN2SCuhQtZqfgMQ.jpeg
export type GlobalContent = {
    // copy: string
    isUserLogged: boolean,
    currentLoggedUser: IUser | null,
    setCurrentUser:(c: IUser) => void,
    token: string
    setToken:(token: string) => void,

}

export const MyGlobalContext = createContext<GlobalContent>({
    // copy: 'Hello World', // set a default value
    setCurrentUser: () => {},
    isUserLogged: false,
    currentLoggedUser : null,
    token: "",
    setToken: () => {},
})

export const useGlobalContext = () => useContext(MyGlobalContext)


const AppProvider = ({children}) => {
    // const [user, setUser] = useState<string>("");
    // const [user, setUser] = useState<IUser>();
    const [user, setUser] = useLocalStorage("logged_user", null);
    const [token, setToken] = useLocalStorage("token", "");
    // const array = useLocalStorage("logged_user", null);
    // const user = array[0]
    // const setUser = array[1]
    // const toggleLoggedState =()=>{
    //     setLoggedUser(prevValue => !prevValue)
    // }

    return(
        <MyGlobalContext.Provider value={{ currentLoggedUser : user, setCurrentUser: setUser, isUserLogged : false, token: token, setToken: setToken }}>
            {children}
        </MyGlobalContext.Provider>
    )
}

export default AppProvider;
