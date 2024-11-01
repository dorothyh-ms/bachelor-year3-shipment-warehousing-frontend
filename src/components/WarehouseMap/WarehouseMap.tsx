import {Warehouse} from "../../models/Warehouse.ts";
import {Box} from "@mui/material";
import WarehouseMarker from "./WarehouseMarker.tsx";

const mapWidth = 800;

interface WarehouseMapProps {
    warehouses?: Warehouse[]

}

const WarehouseMap = (props: WarehouseMapProps) => {

    const {warehouses} = props;
    return (
        <Box

            sx={{
                width: `${mapWidth}px`,
                backgroundColor: "white",
                height: `${mapWidth}px`,
                p: 3,
            }}
        >
            <Box sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                width: `${mapWidth}px`
            }}>
                {
                    warehouses && warehouses.map(((warehouse) =>
                                <WarehouseMarker warehouse={warehouse}/>
                        )
                    )
                }
            </Box>
        </Box>);
}

export default WarehouseMap;