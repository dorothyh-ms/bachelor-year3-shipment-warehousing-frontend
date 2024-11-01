import {Warehouse} from "../../models/Warehouse.ts";
import {Stack, Typography} from "@mui/material";
import {initCap} from "../../utils/initCap.ts";
import {grey, red} from "@mui/material/colors";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import {WAREHOUSES} from "../../routes.ts";
import {useNavigate} from "react-router-dom";

interface WarehouseMarkerProps {
    warehouse: Warehouse;
}

const getColor = (contents: number, maxCapacity: number) => {
    const percentFull = contents / maxCapacity;
    if (percentFull < 0.1) return "#f5f5f5";
    if (percentFull < 0.2) return red[50];
    if (percentFull < 0.3) return red[100];
    if (percentFull < 0.4) return red[200];
    if (percentFull < 0.5) return red[300];
    if (percentFull < 0.6) return red[400];
    if (percentFull < 0.7) return red[500];
    if (percentFull < 0.8) return red[600];
    if (percentFull < 0.9) return red[700];
    return red[800];
}

const WarehouseMarker = (props: WarehouseMarkerProps) => {
    const {warehouse} = props;
    const navigate = useNavigate();

    return <Stack
        onClick={() => {
            navigate(`${WAREHOUSES}/${warehouse.id}`)
        }}
        key={warehouse.id}
        sx={{
            cursor: "pointer",
            position: "absolute",
            top: warehouse.yCoord,
            left: warehouse.xCoord,
            width: `${warehouse.widthMeters}px`,
            backgroundColor: `${getColor(warehouse.amountTons, warehouse.maxCapacityTons)}`,
            '&:hover': {
                backgroundColor: grey[300],
            },
            height: `${warehouse.lengthMeters}px`,
            alignItems: "center",
            gap: 0.5,
            padding: 1,
            borderRadius: "4px",
            transition: "background-color 0.3s ease",

        }}
    >

        <Typography variant="overline" sx={{m: 0}}>{warehouse.sellerName}</Typography>
        <Typography variant="caption">Content: {initCap(warehouse.material.toString())}</Typography>
        <Typography variant="caption">Stock: {warehouse.amountTons} tons</Typography>
        {
            (warehouse.amountTons >= warehouse.maxCapacityTons) &&
            <Stack direction={"row"} sx={{alignItems: "center", gap: 1}}>
                <WarningAmberIcon fontSize={"small"} sx={{h: "100%"}}/>
                <Typography variant={"body1"} sx={{m: 0}}>Overflow</Typography>
            </Stack>
        }
    </Stack>;
}

export default WarehouseMarker;