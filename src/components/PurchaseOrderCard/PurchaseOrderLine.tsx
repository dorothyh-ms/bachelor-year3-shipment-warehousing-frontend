import {OrderLine} from "../../models/PurchaseOrder.ts";
import {Box, Stack, Typography} from "@mui/material";
import {formatEnum} from "../../utils/formatEnum.ts";

interface PurchaseOrderLineProps {
    purchaseOrderLine : OrderLine
}
const PurchaseOrderLine =(props: PurchaseOrderLineProps) => {
   const {purchaseOrderLine} = props;
    return <Stack direction="row" sx={{justifyContent: "space-between", p: 0.5}}>
        <Typography>{formatEnum(purchaseOrderLine.material)}</Typography>
        <Typography>{purchaseOrderLine.amountTons} tons</Typography>
    </Stack>
}
export default PurchaseOrderLine;