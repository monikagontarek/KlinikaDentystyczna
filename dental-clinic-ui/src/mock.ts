import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {IDentist} from "./types";
import {uuid} from "uuidv4";


// const mock = new MockAdapter(axios);
//
// mock.onGet("/api/dentists").reply(200);

const emptyDentistsList = []

const dentistsList: IDentist[] = [
    {
        id: uuid(),
        firstName: "Michal",
        lastName: "Nowak",
        email: "a",
        password: "a",
        reservations: [
            {
                id: uuid(),
                title: 'Monika',
                start: "2021-05-18T13:30:00"
            }
        ]
    },
    {
        id:  uuid(),
        firstName: "Maciej",
        lastName: "Jankowski",
        email: "b",
        password: "b",
        reservations: [
            {
                id: uuid(),
                title: 'Monika',
                start: "2021-05-18T12:30:00"
            }
        ]
    }
]

const newReservationResponse: IDentist[] = [
    {
        id: "1",
        firstName: "Michal",
        lastName: "Nowak",
        email: "a",
        password: "a",
        reservations: [
            {
                id: uuid(),
                title: 'Monika',
                start: "2021-05-11T13:30:00"
            },
            {
                id: uuid(),
                title: "Title",
                start: "2021-05-11T13:30:00"
            }
        ]
    },
    {
        id: "2",
        firstName: "Maciej",
        lastName: "Jankowski",
        email: "b",
        password: "b",
        reservations: [
            {
                id: uuid(),
                title: 'Monika',
                start: "2021-05-12T12:30:00"
            }
        ]
    }
]


export const mockData = () => {
    const mock = new MockAdapter(axios);

    // mock.onPost("/api/users/login", {email: "user@gmail.com", password: "123456"}).reply(200);
    // mock.onPost("/api/users/login").reply(403);
    // mock.onPost("/api/users/register").reply(200);
    // mock.onGet("/api/dentists").reply(200, dentistsList);
    mock
        .onPost("/api/dentists")
        .passThrough();
    mock
        .onPost("/login.php")
        .passThrough();
    mock
        .onPost("/registration.php")
        .passThrough();
    mock
        .onGet("/dentists.php")
        .passThrough();

    mock
        .onPost("/create-event.php")
        .passThrough();

    mock
        .onPut("/api/dentists")
        .passThrough();
}
