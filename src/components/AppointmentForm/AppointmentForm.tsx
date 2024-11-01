import {Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";


import {Appointment} from "../../models/Appointment.ts";
import {useState} from "react";
import {useFormik} from "formik";


const AppointmentForm = () => {


    const formik = useFormik({
        initialValues: {
            email: 'foobar@example.com',
            password: 'foobar',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return <Paper component={"form"} sx={{p: 2}}>
        <Stack sx={{gap: 2}}>
            <Stack spacing={1}>
                <InputLabel htmlFor={"licensePlate"}>Delivery truck license plate</InputLabel>
                <TextField
                    id={"licensePlate"}/>
            </Stack>
            <Stack direction={"row"} spacing={2} sx={{alignItems: "end"}}>
                <Stack spacing={1}>
                    <InputLabel htmlFor={"date"}>Date</InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker/>
                    </LocalizationProvider>
                </Stack>
                <FormControl sx={{width: "5em"}}>
                    <InputLabel id="demo-simple-select-label">Hour</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                    >
                        {
                            [...Array(24).keys()].map((hour) => <MenuItem>{hour}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Stack>
            <Stack spacing={1}>
                <InputLabel>Material</InputLabel>
                <Select
                >
                    {
                        materials && materials.map((material) => <MenuItem
                            value={material.id}>{material.name}</MenuItem>)
                    }
                </Select>
            </Stack>
            <Button variant={"contained"} color="secondary" sx={{mt: 1}}>Submit</Button>
        </Stack>
    </Paper>
}
export default AppointmentForm;