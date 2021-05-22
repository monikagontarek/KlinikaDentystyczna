import React, {useEffect, useState} from 'react';
import DentistList from "./DentistList";
import {IDentist, IReservation} from "./types";
import DentistCalendar, {createEventId} from "./DentistCalendar";
import AlertDialog from "./Register/PopupAlert";
import UserInfo from "./UserInfo";
import Button from "./Button";
import {useGlobalContext} from "./AppContext";
import axios from "axios";


const BookDentistPage = () => {
    const [selectedDentist, setSelectedDentist] = useState<IDentist>(null);
    const [allReservations, setAllReservations] = useState([]);
    const {currentLoggedUser} = useGlobalContext();
    const [messageInInput, setMessageInInput] = useState("");
    const [dentists, setDentists] = useState<IDentist[]>([]);

    useEffect(() => {
        axios.get<IDentist[]>("/api/dentists").then(response => {
            const responseDentists = response.data;
            setDentists(responseDentists)
            setSelectedDentist(responseDentists[0])
        }).catch(error => {

            // console.error("Error", error)
        })
    }, [])


    const handleReservation = async(event: any) => {
        console.log("dentysta - detist list [0]", dentists[0]);
        console.log("event w reserwation", event)


        const bookReservation = {
            id: event.id,
            title: currentLoggedUser.email,
            start: event.start,
            end: event.end
        }

        try{
            await axios.post("/api/dentists/reservations", {
                dentistId: selectedDentist.id,
                userEmail: currentLoggedUser.email,
                eventStart: event.start
            })
        } catch (e) {
            console.error("Error contacting backend")
        }


        // klonowanie obiektu
        const clonedDentist: IDentist = {...selectedDentist};
        clonedDentist.reservations = [...clonedDentist.reservations, bookReservation]
        setSelectedDentist(clonedDentist)

        const clonedDentists = [...dentists];
        const index = clonedDentists.findIndex(row => row.id === clonedDentist.id);
        clonedDentists[index] = clonedDentist;

        setDentists(clonedDentists)

    }

    const handleRemoveReservation = (reservation: IReservation) => {
        // klonowanie obiektu
        const clonedDentist: IDentist = {...selectedDentist};
        clonedDentist.reservations = [...clonedDentist.reservations].filter(clonedReservation => clonedReservation.id != reservation.id)
        setSelectedDentist(clonedDentist)

        const clonedDentists = [...dentists];
        const index = clonedDentists.findIndex(row => row.id === clonedDentist.id);
        clonedDentists[index] = clonedDentist;

        setDentists(clonedDentists)

    }


    if(selectedDentist == null || dentists.length == 0) {
        return <>Brak dentystów</>
    }

    return (
        <>
            <UserInfo/>
            <Button/>
            <DentistList selectedDentist={selectedDentist} dentists={dentists} onSelectedDentist={dentist => setSelectedDentist(dentist)}/>
            <DentistCalendar selectedDentist={selectedDentist} onSaveEvent={handleReservation} onRemoveEvent={handleRemoveReservation}/>

        </>
    )
};


export default BookDentistPage;
