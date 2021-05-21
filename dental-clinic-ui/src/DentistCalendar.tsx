import React, {FC, useState} from 'react';
import FullCalendar, {DateSelectArg, EventApi, EventClickArg, EventContentArg, EventInput} from "@fullcalendar/react";
import {CalendarContext, DateSpanApi} from "@fullcalendar/common";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {IDentist} from "./types";
import AlertDialog from "./Register/PopupAlert";
import {useGlobalContext} from "./AppContext";


export interface DentistCalendarProps {
    selectedDentist: IDentist,
    onSaveEvent: (event: any) => void,
    onRemoveEvent: (event: any)=> void,
    // onChooseEvent: (message: any) => void,
}

const DentistCalendar: FC<DentistCalendarProps> = (props) => {
    const [weekendsVisible, setWeekendsVisible] = useState(false);
    const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [selectInfo, setSelectInfo] = useState<DateSelectArg>();
// const currentLoggedUser = useLoggedUser()
    const handleWeekendsToggle = () => {
        setWeekendsVisible(!weekendsVisible)
    };
    const {currentLoggedUser} = useGlobalContext();


    const handleDateSelect = (eventSelectInfo: DateSelectArg) => {
        setSelectInfo(eventSelectInfo);
        console.log("handle date select", selectInfo)
        setShowAlert(true);
        // let title = prompt('Proszę, wpisz jako tytuł wizyty, swój adres email')
        // let calendarApi = selectInfo.view.calendar
        // console.log("elect info", selectInfo)
        //
        // calendarApi.unselect() // clear date selection
        //
        // if (title) {
        //     calendarApi.addEvent({
        //         id: createEventId(),
        //         title,
        //         start: selectInfo.startStr,
        //         end: selectInfo.endStr,
        //         allDay: selectInfo.allDay
        //     })
        //
        // }
    }

    const handleEventClick = (clickInfo: EventClickArg) => {
        if (window.confirm(`Jesteś pewien, że chcesz usnąć ten termin wizyty? '${clickInfo.event.title}'`)) {
            clickInfo.event.remove()
        }
        props.onRemoveEvent({
            // id: eventGuid,   id nie mogę przekazać bo zawsze zwraca mi to id ktore bylo jako ostatnio powiekszone przez metode addEvent
            start: selectInfo.startStr,

        });

    }

    const handleEvents = (events: EventApi[]) => {
        setCurrentEvents(events);
    }


    const handleSelectAllow = (span: DateSpanApi, movingEvent: EventApi | null) => {
        let diffMs = (span.end.getTime() - span.start.getTime()); // milliseconds
        const diffInMinutes = diffMs / 60 / 1000;

        return diffInMinutes <= 30;
    }

    const handleYes = () => {
        const view: string = currentLoggedUser.email
        const title = view;
        let calendarApi = selectInfo.view.calendar
        calendarApi.unselect() // clear date selection

        if (title !== null) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })

        }
        props.onSaveEvent({
            id: eventGuid,
            start: selectInfo.startStr,

        });
        setShowAlert(false);


    }
    const handleNo = () => {
        setShowAlert(false);
    }
    let infoInAlert: string = "";
    if (selectInfo) {
        infoInAlert = selectInfo.start.toLocaleString("pl");

    }


    return (
        <>
            <AlertDialog show={showAlert} info={infoInAlert} onYes={handleYes} onNo={handleNo}/>
            <FullCalendar

                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView='timeGridWeek'
                editable={true}

                locale={"pl"}
                selectable={true}
                selectOverlap={false}
                slotMinTime={"08:00:00"}
                slotMaxTime={"18:00:00"}
                slotLabelFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }}
                expandRows={true}
                height={"100%"}
                selectAllow={handleSelectAllow}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={weekendsVisible}
                events={props.selectedDentist.reservations} // alternatively, use the `events` setting to fetch from a feed
                select={handleDateSelect}
                eventContent={renderEventContent} // custom render function
                eventClick={handleEventClick}
                // eventAdd={function(){}}
                eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                /* you can update a remote database when these fire:
                eventAdd={function(){}}
                eventChange={function(){}}
                eventRemove={function(){}}
                */
            />
        </>
    );
}


function renderEventContent(eventContent: EventContentArg) {
    return (
        <>
            <b>{eventContent.timeText}</b>
            <i>{eventContent.event.title}</i>
        </>
    )
}


let eventGuid = 1



export function createEventId() {
    return String(eventGuid++);


}

export default DentistCalendar;
