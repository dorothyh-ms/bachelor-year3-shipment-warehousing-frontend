import {Box, Typography} from "@mui/material";

interface PurchaseOrderDetailProps {
    detail: string;
    value: string;
}

const PurchaseOrderDetail = (props: PurchaseOrderDetailProps) => {
    const {detail, value} = props;

    return (
        <Box sx={{display: "flex", justifyContent: "space-between", p: 0.5}}>
            <Typography >{detail}: </Typography>
            <Typography >{value}</Typography>
        </Box>)

}

export default PurchaseOrderDetail;