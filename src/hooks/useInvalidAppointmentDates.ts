
import {useQuery} from "react-query";
import {getInvalidAppointmentDates} from "../services/invalidAppointmentDatesService.ts";

export function useInvalidAppointmentDates() {
    const {isLoading, isError, data: invalidDates} = useQuery({
        queryKey: ['invalidDates'],
        queryFn: () => getInvalidAppointmentDates()
    })

    return {
        isLoading,
        isError,
        invalidDates
    }
}