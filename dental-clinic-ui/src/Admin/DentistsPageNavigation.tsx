import React, {FC, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const useStyles = makeStyles({
    root: {
        width: 500,
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
    const handleClickAdd = () =>{
        props.onAdd();
    }

    const handleClickRemove = () =>{
        props.onRemove();
    }

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
        </BottomNavigation>
    );
}
