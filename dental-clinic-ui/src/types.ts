import {EventInput} from "@fullcalendar/react";


export type IReservation = EventInput

export interface IDentist {
    id: string;
    firstName: string
    lastName: string
    email: string,
    password: string,
    reservations: IReservation[]
}

// dodalam typ iuser, mozesz go wykorzystac w swoim global context
export interface IUser {
    email: string,
    password: string

}

// firstName: string
// lastName: string
