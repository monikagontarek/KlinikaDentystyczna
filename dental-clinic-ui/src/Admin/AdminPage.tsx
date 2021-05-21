import React, {useState} from 'react';
import DentistsPageNavigation from "./DentistsPageNavigation";
import DentistsTable from "./DentistsTable";
import SaveDentistForm from "./SaveDentistForm";


import {IDentist} from "../types";
import {uuid} from "uuidv4";
import axios from "axios";

// export interface IAdminPage {
//     openDialog: boolean;
// }

const initialRows: IDentist[] = [
    {
        id: uuid(),
        firstName: "Michal",
        lastName: "Nowak",
        email: "nowak@",
        password: "",
        reservations: [],

    },
    {
        id: uuid(),
        firstName: "Maciej",
        lastName: "Jankowski",
        email: "",
        password: "",
        reservations: [],

    }

];
const AdminPage = () => {
        const [visibleDentistsTable, setVisibleDentistsTable] = useState(false);
        const [visibleAdd, setVisibleAdd] = useState(false);
        const [rows, setRows] = useState(initialRows);
        const [openDialog, setOpenDialog] = useState(false)

        const handlePageAdd = () => {
            setVisibleAdd(true)
            setVisibleDentistsTable(false);
            setOpenDialog(true);

        }

        const handlePageRemove = () => {
            setVisibleDentistsTable(true);
            setVisibleAdd(false);


        }
        const handleOnAdd = async(dentist: IDentist) => {
            try {
                await axios.put("/api/dentists", dentist)
            } catch (e) {
                console.error("error sending to backend", e)
            }
            setRows([...rows, dentist])
        }
        const handleDeleteDentist = (newRows: IDentist[]) => {
            setRows(newRows);
        }
        const handleEditDentist = (newDentists: IDentist[]) => {
            setRows(newDentists)
        }
        const handleCancel = () => {
            setVisibleAdd(false);
        }

        return (
            <div>
                <DentistsPageNavigation onAdd={handlePageAdd} onRemove={handlePageRemove}/>
                {visibleAdd ? <SaveDentistForm onSave={handleOnAdd}/> : null};
                {visibleDentistsTable ? <DentistsTable rows={rows} onDeleteDentist={handleDeleteDentist} onEditDentist={handleEditDentist}/> : null}
            </div>

        );
    }
;

export default AdminPage;
