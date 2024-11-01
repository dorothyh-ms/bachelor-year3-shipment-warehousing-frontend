
import axiosApi from "../api/axios.ts";
import {PurchaseOrder} from "../models/PurchaseOrder.ts";

export interface PurchaseOrderQueryFilter {
    status?: string; // Added a colon here
    sellerName?: string;
}

export async function getPurchaseOrders(filter? : PurchaseOrderQueryFilter) : Promise<PurchaseOrder[]>   {
    const params = new URLSearchParams();

    // Check if the filter exists and append parameters if they exist
    if (filter) {
        if (filter.status) {
            params.append('status', filter.status.toString());
        }
        if (filter.sellerName) {
            params.append('sellerName', filter.sellerName);
        }
    }
    const {data: purchaseOrders} = await axiosApi.get<PurchaseOrder[]>(`/purchase-orders${params.toString() ? '?' + params.toString() : ''}`);

    return purchaseOrders;
}
