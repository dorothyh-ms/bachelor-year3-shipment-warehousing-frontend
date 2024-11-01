

import {Appointment} from "../models/Appointment.ts";
import axiosApi from "../api/axios.ts";

export async function getAppointments(id: number) : Promise<Appointment[]>   {
    const {data: appointments} = await axiosApi.get<Appointment[]>(`/appointments?sellerId=${id}`);
    return appointments;
}