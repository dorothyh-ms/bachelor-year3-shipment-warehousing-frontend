import {PurchaseOrderStatus} from "../../models/PurchaseOrder.ts";
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {initCap} from "../../utils/initCap.ts";


interface PurchaseOrderStatusFilterProps{
    selectedStatus : string | undefined;
    setSelectedStatus: (status: string) => void;
}

const PurchaseOrderStatusFilter = (props: PurchaseOrderStatusFilterProps) => {
    const {selectedStatus, setSelectedStatus} = props;
    return <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="status-select-helper-label">Status</InputLabel>
        <Select
            labelId="status-select-helper-label"
            id="status-select-helper"
            value={selectedStatus}
            label="Status"
            onChange={(event: SelectChangeEvent) => {
                setSelectedStatus(event.target.value);
            }}
            sx={{backgroundColor: "white"}}
        >
            <MenuItem value="">
                All
            </MenuItem>
            {Object.values(Object.keys(PurchaseOrderStatus).filter(key => !isNaN(Number(PurchaseOrderStatus[key])))).map((value) => (
                <MenuItem key={value} value={value}>
                    {initCap(value)}
                </MenuItem>
            ))}

        </Select>
    </FormControl>;
};

export default PurchaseOrderStatusFilter;