import {PurchaseOrderStatus} from "../../models/PurchaseOrder.ts";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {formatEnum} from "../../utils/formatEnum.ts";


interface PurchaseOrderStatusFilterProps{
    selectedStatus : string | undefined;
    setSelectedStatus: (status: string) => void;
}

const PurchaseOrderStatusFilter = (props: PurchaseOrderStatusFilterProps) => {
    const {selectedStatus, setSelectedStatus} = props;
    return <FormControl color={"secondary"} sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="status-select-helper-label">Status</InputLabel>
        <Select
            labelId="status-select-helper-label"
            id="status-select-helper"
            value={selectedStatus}
            color={"secondary"}
            label="Seller"
            onChange={(event: SelectChangeEvent) => {
                setSelectedStatus(event.target.value);
            }}
            sx={{backgroundColor: "white"}}
        >
            {Object.values(Object.keys(PurchaseOrderStatus).filter(key => !isNaN(Number(PurchaseOrderStatus[key])))).map((value) => (
                <MenuItem key={value} value={value}>
                    {formatEnum(value)}
                </MenuItem>
            ))}

        </Select>
    </FormControl>;
};

export default PurchaseOrderStatusFilter;