import PageLayout from "../layouts/PageLayout.tsx";
import {CircularProgress, Divider, Paper, Stack, Typography} from "@mui/material";
import {usePurchaseOrders} from "../hooks/usePurchaseOrders.ts";
import PurchaseOrderCard from "../components/PurchaseOrderCard/PurchaseOrderCard.tsx";
import PurchaseOrderStatusFilter from "../components/PurchaseOrderStatusFilter/PurchaseOrderStatusFilter.tsx";
import {useEffect, useState} from "react";
import {PurchaseOrderQueryFilter} from "../services/purchaseOrdersService.ts";
import SellerFilter from "../components/SellerFilter/SellerFilter.tsx";
import {grey} from "@mui/material/colors";
import {PurchaseOrder} from "../models/PurchaseOrder.ts";

const PurchaseOrdersPage = () => {
    const [purchaseOrderFilter, setPurchaseOrderFilter] = useState<PurchaseOrderQueryFilter>();
    const [selectedPurchaseOrderStatus, setSelectedPurchaseOrderStatus] = useState<string>("");
    const [selectedSeller, setSelectedSeller] = useState<string>("");
    const {purchaseOrders, isLoading, isError} = usePurchaseOrders(purchaseOrderFilter);

    useEffect(() => {
        setPurchaseOrderFilter({
            status: selectedPurchaseOrderStatus
        })

    }, [selectedPurchaseOrderStatus]);

    useEffect(() => {
        setPurchaseOrderFilter({
            sellerName: selectedSeller
        })

    }, [selectedSeller]);

    const renderPurchaseOrderStats = (purchaseOrders: PurchaseOrder[]) => {
        return <Stack direction={"column"} sx={{ gap: 0.5}} >
            <Typography variant={"subtitle1"} >Fulfilled: {purchaseOrders.filter(po => po.status === "FULFILLED").length}</Typography>
            <Typography variant={"subtitle1"} >Outstanding: {purchaseOrders.filter(po => po.status === "OUTSTANDING").length}</Typography>
        </Stack>
    }

    const renderFilterControls = () => {
        return <Stack direction={"row"} sx={{justifyContent: "space-between"}}>
            <PurchaseOrderStatusFilter selectedStatus={selectedPurchaseOrderStatus}
                                       setSelectedStatus={setSelectedPurchaseOrderStatus}/>
            <SellerFilter selectedSeller={selectedSeller} setSelectedSeller={setSelectedSeller}/>
        </Stack>
    }

    const renderPurchaseOrders = () => {
        return <Paper sx={{display: "flex", flexDirection: "column", width: "100%"}}>

            {
                purchaseOrders && purchaseOrders.map((po, ix) => {
                        return <>
                            <PurchaseOrderCard purchaseOrder={po}/>
                            {ix !== (purchaseOrders.length - 1) && <Divider/>}
                        </>
                    }
                )
            }

        </Paper>
    }

    return <PageLayout title={"Purchase orders"}>
        <Stack sx={{
            width: {xs: "90%", sm: "75%", md: "50%", xl: "30%"},
            gap: 1,
        }}>
            {purchaseOrders && renderPurchaseOrderStats(purchaseOrders)}
            {purchaseOrders && renderFilterControls()}
            {purchaseOrders && renderPurchaseOrders()}
            {
                purchaseOrders && (purchaseOrders.length < 1) &&
                <Typography color={grey[500]}>No purchase orders found.</Typography>
            }
            {
                isLoading && <CircularProgress sx={{alignSelf: "center"}} color={'secondary'}/>
            }
        </Stack>
    </PageLayout>;
};

export default PurchaseOrdersPage;