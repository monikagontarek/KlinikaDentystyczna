import React, {useEffect, useState} from 'react';
import DentistList from "./DentistList";
import {IDentist} from "./types";
import DentistCalendar, {createEventId} from "./DentistCalendar";
import AlertDialog from "./Register/PopupAlert";
import UserInfo from "./UserInfo";
import Button from "./Button";
import {useGlobalContext} from "./AppContext";
import axios from "axios";





// mock.onGet("/api/dentists").reply(200);



const BookDentistPage = () => {
    const [selectedDentist, setSelectedDentist] = useState<IDentist>(null);
    const [allReservations, setAllReservations] = useState([]);
    const {currentLoggedUser} = useGlobalContext();
    const [messageInInput, setMessageInInput] = useState("");
    const [dentists, setDentists] = useState<IDentist[]>([]);
    // const [bookReservation, setBookReservation] = useState({
    //     id: "",
    //     title: "",
    //     start: "",
    // });

    useEffect(() => {
        axios.get<IDentist[]>("/api/dentists").then(response => {
            const responseDentists = response.data;
            setDentists(responseDentists)
            setSelectedDentist(responseDentists[0])
        }).catch(error => {
            // debugger
            // console.error("Error", error)
        })
    }, [])


    const handleReservation = (event: any) => {
        console.log("dentysta - detist list [0]", dentists[0]);
        console.log("event w reserwation", event)


        const bookReservation = {
            id: event.id,
            title: currentLoggedUser.email,
            start: event.start,
            end: event.end
        }

        axios.post("/api/dentists/reservations", {
            dentistId: selectedDentist.id,
            userEmail: currentLoggedUser.email,
            eventStart: event.start
        })


        if (selectedDentist.id === dentists[0].id) {

            const resInDen1 = [...selectedDentist.reservations];

            resInDen1.push(bookReservation);
            selectedDentist.reservations = resInDen1;
            console.log("data dodawane", event.start );
            console.log("rezerwacje dla michała", selectedDentist.reservations)
        }
        if (selectedDentist.id === dentists[1].id) {
            const resInDen2 = [...selectedDentist.reservations];

            resInDen2.push(bookReservation);
            selectedDentist.reservations = resInDen2;
            // console.log("wybrałam", selectedDentist.id);
            console.log("rezerwacje dla maćka", selectedDentist.reservations)
        }
        // setIdInRes(idInRes +1);
    }

    const handleRemoveReservation = (event: any) => {
        // console.log("jestem w obsludze usuwania, moje eventy to ", event);
        // console.log(" data  usuwane", event.start)
        //
        // const resInDen1 = [...selectedDentist.reservations];
        // console.log("usu", resInDen1)
        // const removElement  = resInDen1.filter(res => res.start === event.start);
        //
        // console.log("usuwany", removElement)


    }

    // let newReservatios = [...allReservations];
    // newReservatios.push(events);
    // console.log("events", events)
    // if(selectedDentist.id === dentistsList[0].id ){
    //     let res = [...dentistsList[0].reservations];
    //     console.log("res",res)
    //     res[0].id = events.id;
    //     res[0].title = events.title;
    //     res[0].start = events.start;
    //
    //
    // }
    // if(selectedDentist.id === dentistsList[1].id ){
    //     dentistsList[1].reservations.push(events)
    // }

    //
    // // if(dentistsList[1] === selectedDentist){
    // //     console.log(dentistsList[1].reservations)
    // // }
    //
    // // console.log(dentistsList[0].reservations)
    // setAllReservations(newReservatios)
    // console.log(allReservations);
    // console.log(dentistsList[0].reservations)


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
