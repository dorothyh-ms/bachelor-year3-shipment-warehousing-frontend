import {UpdateAppointment} from "../models/Appointment.ts";
import {useMutation, useQueryClient} from "react-query";
import {updateAppointment} from "../services/appointmentsService.ts";

type UpdateAppointmentData = {
    appointmentId: string,
    updatedAppointmentData: UpdateAppointment
}

export function useUpdateAppointment() {
    const queryClient = useQueryClient();

    const {mutate, isLoading, isError} = useMutation({
        mutationFn: (data: UpdateAppointmentData) => updateAppointment(data.appointmentId, data.updatedAppointmentData),
        onSuccess: () => queryClient.invalidateQueries(['appointments']),
    });

    return {
        isLoading, // Changed from isPending to isLoading for consistency
        isError,
        updateAppointment: mutate,
    };
}