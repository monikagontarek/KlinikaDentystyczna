import React, {useState} from 'react';
import DentistList from "./DentistList";
import {IDentist} from "./types";
import DentistCalendar, {createEventId} from "./DentistCalendar";
import AlertDialog from "./Register/PopupAlert";




const dentistsList: IDentist[] = [
    {
        id: "1",
        firstName: "Michal",
        lastName: "Nowak",
        reservations: [
            {
                id: "1",
                title: 'Monika',
                start: "2021-05-11T13:30:00"
            }
        ]
    },
    {
        id: "2",
        firstName: "Maciej",
        lastName: "Jankowski",
        reservations: [
            {
                id: "1",
                title: 'Monika',
                start: "2021-05-12T12:30:00"
            }
        ]
    }
]



const BookDentistPage = () => {
    const [selectedDentist, setSelectedDentist] = useState<IDentist>(dentistsList[0]);
    const [allReservations, setAllReservations] = useState([]);

    const handleReservation = (events: any)=>{
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
        console.log("event reservation not work ")
    }

    return (
        <>

            <DentistList selectedDentist={selectedDentist} dentists={dentistsList} onSelectedDentist={dentist => setSelectedDentist(dentist)}/>
            <DentistCalendar selectedDentist={selectedDentist} onSaveEvent={handleReservation}/>

        </>
    );
};




export default BookDentistPage;
