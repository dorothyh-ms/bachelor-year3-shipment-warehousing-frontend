import PageLayout from "../layouts/PageLayout.tsx";

import {useWarehouses} from "../hooks/useWarehouses.ts";

import WarehouseMap from "../components/WarehouseMap/WarehouseMap.tsx";
import SellerFilter from "../components/SellerFilter/SellerFilter.tsx";
import {useState} from "react";
import {Box, CircularProgress, Stack} from "@mui/material";


const WarehousesPage = () => {
    const [selectedSeller, setSelectedSeller] = useState<string>();
    const {warehouses, isLoading} = useWarehouses(selectedSeller);
    return <PageLayout title={"Warehouses"}>
        <Stack>
            <SellerFilter selectedSeller={selectedSeller} setSelectedSeller={setSelectedSeller}/>
            {isLoading && <CircularProgress sx={{alignSelf: "center"}} color={'secondary'}/>}
            {warehouses && <WarehouseMap warehouses={warehouses}/>}
        </Stack>
    </PageLayout>
}

export default WarehousesPage;