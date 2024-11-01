

import {Appointment, NewAppointment} from "../models/Appointment.ts";
import axiosApi from "../api/axios.ts";

export async function getAppointments() : Promise<Appointment[]>   {
    const {data: appointments} = await axiosApi.get<Appointment[]>(`/appointments`);
    return appointments;
}


export async function createAppointment(appointment: NewAppointment) : Promise<NewAppointment>   {
    const {data: createdAppointment} = await axiosApi.post<NewAppointment>(`/appointments`, appointment);
    return createdAppointment;
}
