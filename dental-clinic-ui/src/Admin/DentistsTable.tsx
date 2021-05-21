import * as React from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from '@material-ui/data-grid';
import {IDentist, IReservation} from "../types";
import {useEffect, useState} from "react";
import axios from "axios";
import {uuid} from "uuidv4";
import SaveDentistForm from "./SaveDentistForm";


const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'firstName', headerName: 'Imie', width: 130},
    {field: 'lastName', headerName: 'Nazwisko', width: 130},
    {field: 'email', headerName: 'E-mail', width: 130},

];


export interface IdataGrid {
    rows: IDentist[],
    onDeleteDentist: (newDentists: IDentist[]) => void;
    onEditDentist: (newDentists: IDentist[]) => void;
}

export default function DentistsTable(props: IdataGrid) {


    const [visibleButton, setVisibleButton] = useState(false);
    const [indexInput, setIndexInput] = useState(-1);
    const [visibleEditPanel, setVisibleEditPanel] = useState(false)
    const [editDentist, setEditDentist] = useState<IDentist | null>(null)

    const handleSelection = (event: any) => {
        // console.log("wybrany ", event.selectionModel);
        setVisibleButton(true);
        if (event.selectionModel.length === 0) {
            setVisibleButton(false);
        }

        const index = props.rows.findIndex(row => row.id === event.selectionModel[0]);
        setIndexInput(index);

    }
    const handleRemove = (event: any) => {

        const newRows = [...props.rows];
        // console.log("index", indexInput)
        newRows.splice(indexInput, 1);
        props.onDeleteDentist(newRows)


    }

    const handleEdit = (event: any) => {
        // console.log("edytuj", event);
        // console.log("index edytowanego", indexInput);
        const editDentist: IDentist = props.rows[indexInput]
        setVisibleEditPanel(true)
        setEditDentist(editDentist);
    }

    const handleEditDentist = async(dentist: IDentist) => {
        const cloned = [...props.rows];
        cloned[indexInput] = dentist;
        console.log("edytowany obiekt", props.rows[indexInput]);
        try {
            await axios.post("/api/dentists", dentist)

        } catch (e) {
            console.error("error sending to backend", e)
        }
        props.onEditDentist(cloned);
    }


    return (
        <div style={{height: 400, width: '100%'}}>
            {visibleButton
                ?
                <button style={{height: 35, backgroundColor: "#3f51b5", color: "white"}} onClick={handleRemove}>Usuń wybranego użytkownika</button>
                : null
            }
            {visibleButton
                ? <button style={{height: 35, width: "160px", backgroundColor: "#3f51b5", color: "white"}} onClick={handleEdit}>Edytuj użytkownika</button>
                : null
            }
            {visibleEditPanel
                ? <SaveDentistForm editDentist={editDentist} onSave={handleEditDentist}/>
                : null
            }
            <DataGrid rows={props.rows} columns={columns} pageSize={5} checkboxSelection
                      onSelectionModelChange={handleSelection}

            />


        </div>
    )
}

