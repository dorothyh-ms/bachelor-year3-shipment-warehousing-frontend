import {useQuery} from "react-query";
import {getPurchaseOrders, PurchaseOrderQueryFilter} from "../services/purchaseOrdersService.ts";


export function usePurchaseOrders(filter?: PurchaseOrderQueryFilter) {
    const {isLoading, isError, data: purchaseOrders} = useQuery({
        queryKey: ['purchaseOrders', filter],
        queryFn: () => getPurchaseOrders(filter)
    })

    return {
        isLoading,
        isError,
        purchaseOrders
    }
}