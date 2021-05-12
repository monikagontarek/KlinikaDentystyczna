import {EventInput} from "@fullcalendar/react";


export type IReservation = EventInput

export interface IDentist {
    id: string;
    firstName: string
    lastName: string
    reservations: IReservation[]
}
