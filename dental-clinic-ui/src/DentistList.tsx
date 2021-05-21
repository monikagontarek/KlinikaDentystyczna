import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import React, {FC} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {IDentist} from "./types";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(3),
            minWidth: 120,
            paddingTop: 15,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);


export interface DentistListProps {
    dentists: IDentist[];
    selectedDentist: IDentist
    onSelectedDentist: (dentist: IDentist) => void;
}




const DentistList: FC<DentistListProps> = (props) => {
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        // props.onSelectedDentist(event.target.value)
        const value = event.target.value;
        // console.log("value", value)

        // console.log("props.dentists", props.dentists)



        const filteredDentists = props.dentists.filter(dentist => dentist.id == value);
        // console.log("filteredDentists", filteredDentists)
        const currentSelectedDentist = filteredDentists[0]
        // console.log("filteredDentists[0]", currentSelectedDentist)
        props.onSelectedDentist(currentSelectedDentist)
    };



    return (
        <FormControl className={classes.formControl}>
            <InputLabel style={{fontSize: '18px', color: 'darkblue', padding: '5px'}}><strong>Wybierz Lekarza: </strong></InputLabel><br/>
            <Select
                value={props.selectedDentist.id}
                onChange={handleChange}
            >
                {
                    props.dentists.map(dentist => {
                        return (
                            <MenuItem key={dentist.id} value={dentist.id}>{dentist.firstName} {dentist.lastName}</MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    );
};

export default DentistList;
