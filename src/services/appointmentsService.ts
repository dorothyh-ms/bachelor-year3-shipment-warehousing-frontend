

import {Appointment, NewAppointment, UpdateAppointment} from "../models/Appointment.ts";
import axiosApi from "../api/axios.ts";

export async function getAppointments() : Promise<Appointment[]>   {
    const {data: appointments} = await axiosApi.get<Appointment[]>(`/appointments`);
    return appointments;
}


export async function createAppointment(appointment: NewAppointment) : Promise<NewAppointment>   {
    const {data: createdAppointment} = await axiosApi.post<NewAppointment>(`/appointments`, appointment);
    return createdAppointment;
}


export async function updateAppointment( appointmentId : string, appointmentUpdate: UpdateAppointment) : Promise<Appointment>   {
    const {data: updatedAppointment} = await axiosApi.patch<Appointment>(`/schedules/${appointmentId}`, appointmentUpdate);
    return updatedAppointment;
}
