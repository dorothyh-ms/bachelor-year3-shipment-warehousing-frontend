import PageLayout from "../layouts/PageLayout.tsx";
import {Box, Divider, Paper, Stack} from "@mui/material";
import {usePurchaseOrders} from "../hooks/usePurchaseOrders.ts";
import PurchaseOrderCard from "../components/PurchaseOrderCard/PurchaseOrderCard.tsx";
import PurchaseOrderStatusFilter from "../components/PurchaseOrderStatusFilter/PurchaseOrderStatusFilter.tsx";
import {useEffect, useState} from "react";
import {PurchaseOrderQueryFilter} from "../services/purchaseOrdersService.ts";

const PurchaseOrdersPage = () => {
    const [purchaseOrderFilter, setPurchaseOrderFilter] = useState<PurchaseOrderQueryFilter>();
    const [selectedPurchaseOrderStatus, setSelectedPurchaseOrderStatus] = useState<string>("");
    const {purchaseOrders, isLoading, isError} = usePurchaseOrders(purchaseOrderFilter);

    useEffect(() => {

        console.log("changing filter")
        setPurchaseOrderFilter({
            purchaseOrderStatus: selectedPurchaseOrderStatus
        })

    }, [selectedPurchaseOrderStatus])

    return <PageLayout title={"Purchase orders"}>
        <Stack sx={{
            width: {xs: "90%", sm: "75%", md: "50%", xl: "30%"},
            gap: 1
        }}>
        <Stack direction={"row"} sx={{justifyContent: "space-between"}}>
            <PurchaseOrderStatusFilter selectedStatus={selectedPurchaseOrderStatus} setSelectedStatus={setSelectedPurchaseOrderStatus} />
        </Stack>
        <Paper sx={{display: "flex", flexDirection: "column", width: "100%"}}>
            {
                purchaseOrders && purchaseOrders.map((po, ix) => {
                        return <>
                            <PurchaseOrderCard purchaseOrder={po}/>
                            {ix !== (purchaseOrders.length -1) && <Divider/> }
                        </>
                    }
                )
            }
        </Paper>
        </Stack>
    </PageLayout>;
};

export default PurchaseOrdersPage;