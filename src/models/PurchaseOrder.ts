import {Material} from "./Material.ts";

export enum PurchaseOrderStatus {
    OUTSTANDING,
    FULFILLED
}

export type OrderLine = {
    material: Material;
    amountTons: number;
}

export type PurchaseOrder = {
    id: string;
    purchaseOrderNumber: string;
    buyerEnterpriseNumber: string;
    sellerId: string;
    sellerName: string;
    orderLines: OrderLine[];
    orderDateTime: Date;
    status: PurchaseOrderStatus;
}