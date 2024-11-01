import {useQuery} from "react-query";
import {getSellers} from "../services/sellersService.ts";

export function useSellers() {
    const {isLoading, isError, data: sellers} = useQuery({
        queryKey: ['sellers'],
        queryFn: () => getSellers()
    })

    return {
        isLoading,
        isError,
        sellers
    }
}