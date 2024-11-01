import {useQuery} from "react-query";
import {getAppointments} from "../services/appointmentsService.ts";

export function useAppointments( ) {
    const {isLoading, isError, data: appointments} = useQuery({
        queryKey: ['appointments',],
        queryFn: () => getAppointments()
    })

    return {
        isLoading,
        isError,
        appointments
    }
}