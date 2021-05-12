import React, {FC, useState} from 'react';
import FullCalendar, {DateSelectArg, EventApi, EventClickArg, EventContentArg, EventInput} from "@fullcalendar/react";
import {CalendarContext, DateSpanApi} from "@fullcalendar/common";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {IDentist} from "./types";
import AlertDialog from "./Register/PopupAlert";


export interface DentistCalendarProps {
    selectedDentist: IDentist,
    onSaveEvent: (event: any) => void
}

const DentistCalendar: FC<DentistCalendarProps> = (props) => {
    const [weekendsVisible, setWeekendsVisible] = useState(false);
    const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [selectInfo, setSelectInfo] = useState<DateSelectArg>();
// const currentLoggedUser = useLoggedUser()
    const handleWeekendsToggle = () => {
        setWeekendsVisible(!weekendsVisible)
    }

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
    }

    const handleEvents = (events: EventApi[]) => {
        setCurrentEvents(events);
        console.log("events w handle events", events)
        props.onSaveEvent(events);

    }


    const handleSelectAllow = (span: DateSpanApi, movingEvent: EventApi | null) => {
        let diffMs = (span.end.getTime() - span.start.getTime()); // milliseconds
        const diffInMinutes = diffMs / 60 / 1000;

        return diffInMinutes <= 30;
    }

    const handleYes = () => {
        const title ="tytuł zdarzenia";
        // title = currentLoggerUser.firstName
        let calendarApi = selectInfo.view.calendar
        console.log("elect info", selectInfo)

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

        setShowAlert(false);
    }
    const handleNo = () => {
        setShowAlert(false)
    }

    return (
        <>
            <AlertDialog show={showAlert} onYes={handleYes} onNo={handleNo}/>
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
    console.log("event content", eventContent)
    return (
        <>
            <b>{eventContent.timeText}</b>
            <i>{eventContent.event.title}</i>
        </>
    )
}


let eventGuid = 1

export const INITIAL_EVENTS: EventInput[] = [

    {
        id: createEventId(),
        title: 'Monika',
        start: "2021-05-11T12:30:00"
    },
]

export function createEventId() {
    return String(eventGuid++)
}

export default DentistCalendar;
