import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

import {Seller} from "../../models/Seller.ts";
import {useSellers} from "../../hooks/useSellers.ts";
import {Typography} from "@mui/material";


interface SellerFilterProps {
    selectedSeller: string | undefined;
    setSelectedSeller: (status: string) => void;
}

const SellerFilter = (props: SellerFilterProps) => {
    const {selectedSeller, setSelectedSeller} = props;
    const {sellers, isLoading, isError} = useSellers();
    if (isLoading) {
        return null;
    }
    if (isError) {
        return <Typography>Sellers could not be loaded.</Typography>
    }
    if (sellers) {
        return <FormControl color={"secondary"} sx={{m: 1, minWidth: 120}}>
            <InputLabel id="seller-select-helper-label">Seller</InputLabel>
            <Select
                labelId="seller-select-helper-label"
                id="seller-select-helper"
                value={selectedSeller}
                label="Seller"
                onChange={(event: SelectChangeEvent) => {
                    setSelectedSeller(event.target.value);
                }}
                sx={{backgroundColor: "white"}}
            >

                {sellers.map(seller => (
                    <MenuItem key={seller.name} value={seller.name}>
                        {seller.name}
                    </MenuItem>
                ))}

            </Select>
        </FormControl>;
    }
    return null;
};

export default SellerFilter;