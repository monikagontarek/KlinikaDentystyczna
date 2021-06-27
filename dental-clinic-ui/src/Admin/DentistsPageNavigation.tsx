import React, {FC, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from "react-router-dom";

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Autocomplete } from '@material-ui/lab';


const useStyles = makeStyles({
    root: {
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
    },
});

export interface Iadd {
    onAdd: () => void,
    onRemove: () => void,
}


export default function DentistsPageNavigation(props: Iadd) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [visiblePanelAdd, setVisiblePanelAdd] = useState(false);

    // let history = useHistory();

    const handleClickAdd = () =>{
        props.onAdd();
    }

    const handleClickRemove = () =>{
        props.onRemove();
    }
    // const handleClickLogOut = () =>{
    //     history.push("/login")
    // }

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction onClick={handleClickAdd} label="Dodaj" icon={<PersonAddIcon />} />
            <BottomNavigationAction onClick={handleClickRemove} label="Edytuj / usuń" icon={<EditIcon/>} />
            {/*<BottomNavigationAction onClick={handleClickLogOut} label="Wyloguj" icon={<ExitToAppIcon/>} />*/}
        </BottomNavigation>
    );
}
