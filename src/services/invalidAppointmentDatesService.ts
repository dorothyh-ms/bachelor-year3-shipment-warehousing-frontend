
import axiosApi from "../api/axios.ts";
import {UnavailableDate} from "../models/UnavailableDate.ts";

export async function getInvalidAppointmentDates() : Promise<UnavailableDate[]>   {
    const {data: invalidAppointmentDates} = await axiosApi.get<UnavailableDate[]>(`/unavailable-appointment-dates`);
    return invalidAppointmentDates;
}