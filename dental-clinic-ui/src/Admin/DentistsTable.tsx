import * as React from 'react';
import {DataGrid, GridColDef, GridValueGetterParams, useGridSlotComponentProps} from '@material-ui/data-grid';
import {IDentist, IReservation} from "../types";
import {useEffect, useState} from "react";
import axios from "axios";
import {uuid} from "uuidv4";
import SaveDentistForm from "./SaveDentistForm";
import { makeStyles } from '@material-ui/core';



const columns: GridColDef[] = [
{
    field: 'id',
    headerName: 'ID',
    hide: true,
},
{
    field: 'firstName',
    headerName: 'Imie',
    width: 250},
{
    field: 'lastName',
    headerName: 'Nazwisko',
    width: 250},
{
    field: 'email',
    headerName: 'E-mail',
    width: 250},
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
        setVisibleButton(true);
        if (event.selectionModel.length === 0) {
            setVisibleButton(false);
        }

        const index = props.rows.findIndex(row => row.id === event.selectionModel[0]);
        setIndexInput(index);

    }
    const handleRemove = (event: any) => {

        const newRows = [...props.rows];

        newRows.splice(indexInput, 1);
        props.onDeleteDentist(newRows)


    }

    const handleEdit = (event: any) => {

        const editDentist: IDentist = props.rows[indexInput]
        setVisibleEditPanel(true)
        setEditDentist(editDentist);
    }


    // obsługa edycji wybranego denstysty przez administratora
    const handleEditDentist = async (dentist: IDentist) => {
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
        <div style={{height: 300, width: '100%'}}>
            {visibleButton
                ?
                <button style={
                    {
                        height: 55,
                        display: "block",
                        width: 200,
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginBottom: 5,
                        border: 0,

                        borderRadius: 5,
                        backgroundColor: "#D5D5D5",
                        color: "#383838",
                    }}
                        onClick={handleRemove}>Usuń wybranego użytkownika</button>
                : null
            }
            {visibleButton
                ? <button style={
                    {
                        height: 55,
                        display: "block",
                        width: 200,
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginBottom: 5,
                        border: 0,
                        borderRadius: 5,
                        backgroundColor: "#D5D5D5",
                        color: "#383838"}}
                        onClick={handleEdit}>Edytuj użytkownika</button>
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

