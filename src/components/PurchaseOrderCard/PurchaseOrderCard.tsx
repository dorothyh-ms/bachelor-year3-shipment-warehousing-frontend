import {PurchaseOrder, PurchaseOrderStatus} from "../../models/PurchaseOrder.ts";
import {Box, Chip, Stack, Typography} from "@mui/material";
import dayjs from "dayjs";
import {grey} from "@mui/material/colors";
import {initCap} from "../../utils/initCap.ts";
import PurchaseOrderDetail from "./PurchaseOrderDetail.tsx";
import PurchaseOrderLine from "./PurchaseOrderLine.tsx";

interface PurchaseOrderCardProps {
    purchaseOrder: PurchaseOrder;
}

const PurchaseOrderCard = (props: PurchaseOrderCardProps) => {
    const {purchaseOrder} = props;
    console.log("purchase order status", purchaseOrder.status)
    return (
        <Box sx={{display: "flex", p: 3, gap: 3}}>
            <Box sx={{width: "25%"}}>
                <Typography variant={"subtitle2"}>Order: {purchaseOrder.purchaseOrderNumber}</Typography>
            </Box>
            <Stack sx={{flexGrow: 1, gap: 1}}>
                <Stack>
                    <PurchaseOrderDetail detail={"Placed"}
                                         value={dayjs(purchaseOrder.orderDateTime).format("DD MMM, YYYY")}/>
                    <PurchaseOrderDetail detail={"Seller"} value={purchaseOrder.sellerName}/>
                    <PurchaseOrderDetail detail={"Buyer enterprise number"} value={purchaseOrder.buyerEnterpriseNumber}/>
                </Stack>
                <Stack sx={{borderLeft: 1, borderColor: grey[500], paddingLeft: 2}}>
                    {purchaseOrder.orderLines.map(ol => <PurchaseOrderLine purchaseOrderLine={ol} />)}
                </Stack>
            </Stack>
            <Box sx={{width: "25%", display: "flex", justifyContent: "end" }}>
                <Chip color={purchaseOrder.status === PurchaseOrderStatus[PurchaseOrderStatus.FULFILLED] ? "success" : "error"}
                      label={initCap(purchaseOrder.status.toString())}/>
            </Box>

        </Box>)
}

export default PurchaseOrderCard;