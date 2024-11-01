

import {Appointment} from "../models/Appointment.ts";
import axiosApi from "../api/axios.ts";

export async function getAppointments() : Promise<Appointment[]>   {
    const {data: appointments} = await axiosApi.get<Appointment[]>(`/appointments`);
    return appointments;
}