
import axiosApi from "../api/axios.ts";
import {Warehouse} from "../models/Warehouse.ts";

export async function getWarehouses(sellerName?: string) : Promise<Warehouse[]>   {


    const {data: warehouses} = await axiosApi.get<Warehouse[]>(`/warehouse-projections${sellerName ? "?sellerName=" + sellerName : "" }`);
    return warehouses;
}

export async function getWarehouseById(warehouseId: string) : Promise<Warehouse>   {
    const {data: warehouses} = await axiosApi.get<Warehouse>(`/warehouses/${warehouseId}`);
    return warehouses;
}
