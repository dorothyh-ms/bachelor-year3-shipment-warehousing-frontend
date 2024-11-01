import {WarehouseActivity} from "./WarehouseActivity.ts";
import {Material} from "./Material.ts";

export type Warehouse = {
    id : string,
    amountTons: number,
    xCoord: number,
    yCoord: number,
    widthMeters: number
    lengthMeters: number,
    maxCapacityTons: number,
    material: Material,
    sellerName: string,
    sellerId: string,
    warehouseActivities?: WarehouseActivity[]
}