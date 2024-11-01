import {useQuery} from "react-query";
import {getAppointments} from "../services/appointmentsService.ts";

export function useAppointments(sellerId : number) {
    const {isLoading, isError, data: appointments} = useQuery({
        queryKey: ['appointments', sellerId],
        queryFn: () => getAppointments(sellerId)
    })

    return {
        isLoading,
        isError,
        appointments
    }
}