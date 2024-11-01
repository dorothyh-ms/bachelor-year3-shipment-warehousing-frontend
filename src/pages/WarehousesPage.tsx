import PageLayout from "../layouts/PageLayout.tsx";

import {useWarehouses} from "../hooks/useWarehouses.ts";

import WarehouseMap from "../components/WarehouseMap/WarehouseMap.tsx";
import SellerFilter from "../components/SellerFilter/SellerFilter.tsx";
import {useState} from "react";
import {Box} from "@mui/material";


const WarehousesPage = () => {
    const [selectedSeller, setSelectedSeller] = useState<string>();
    const {warehouses, isLoading, isError} = useWarehouses(selectedSeller);
    return <PageLayout title={"Warehouses"}>
        <Box>
            <SellerFilter selectedSeller={selectedSeller} setSelectedSeller={setSelectedSeller}/>
            <WarehouseMap warehouses={warehouses}/>
        </Box>
    </PageLayout>
}

export default WarehousesPage;