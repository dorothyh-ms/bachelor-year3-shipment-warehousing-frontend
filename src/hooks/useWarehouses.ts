import {useQuery} from "react-query";
import {getWarehouseById, getWarehouses} from "../services/warehousesService.ts";

export function useWarehouses() {
    const {isLoading, isError, data: warehouses} = useQuery({
        queryKey: ['warehouses'],
        queryFn: () => getWarehouses()
    })

    return {
        isLoading,
        isError,
        warehouses
    }
}

export function useWarehouse(id: string) {
    const {isLoading, isError, data: warehouse} = useQuery({
        queryKey: ['warehouse', id],
        queryFn: () => getWarehouseById(id),
    })
    return {
        isLoading,
        isError,
        warehouse,
    }
}