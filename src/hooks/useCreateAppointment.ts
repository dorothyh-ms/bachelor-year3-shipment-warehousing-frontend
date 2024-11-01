import {NewAppointment} from "../models/Appointment.ts";
import {useMutation, useQueryClient} from "react-query";
import {createAppointment} from "../services/appointmentsService.ts";

export function useCreateAppointment() {
    const queryClient = useQueryClient();

    const { mutate, isLoading, isError } = useMutation({
        mutationFn: (appointment: NewAppointment) => createAppointment(appointment),
        onSuccess: () => queryClient.invalidateQueries(['appointments']),
    });

    return {
        isLoading, // Changed from isPending to isLoading for consistency
        isError,
        createAppointment: mutate,
    };
}