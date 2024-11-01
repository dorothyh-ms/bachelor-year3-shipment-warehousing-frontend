
import axiosApi from "../api/axios.ts";
import {Seller} from "../models/Seller.ts";

export async function getSellers() : Promise<Seller[]>   {
    const {data: sellers} = await axiosApi.get<Seller[]>(`/sellers`);
    return sellers;
}