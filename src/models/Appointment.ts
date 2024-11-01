
export type Appointment = {
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
