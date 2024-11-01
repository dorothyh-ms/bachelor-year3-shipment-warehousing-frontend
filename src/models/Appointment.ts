
export type Appointment = {
    id: string;
    timeSlotStart: string;
    truckLicensePlate: string,
    material: string,
    status: string
}


export type NewAppointment = {
    timeSlot: string;
    truckLicensePlate?:string ;
    amountTons: number;
    sellerName: string;
    material: string;
}

export type UpdateAppointment = {
    timeSlotStart: string;
}

