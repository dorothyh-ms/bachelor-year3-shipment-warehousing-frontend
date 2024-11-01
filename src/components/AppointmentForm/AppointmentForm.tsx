import {Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField} from "@mui/material";
import {DatePicker, DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";


import * as Yup from 'yup';
import {useFormik} from "formik";
import {Material} from "../../models/Material.ts";
import {Appointment} from "../../models/Appointment.ts";

const validationSchema = Yup.object({
    timeSlot: Yup.date()
        .min(new Date(), 'Time slot cannot be in the past')
        .required('Time slot is required'),
    truckLicensePlate: Yup.string()
        .required('Truck license plate is required'),
    amountTons: Yup.number()
        .min(0, 'Amount in tons cannot be negative')
        .required('Amount in tons is required'),
    sellerName: Yup.string()
        .required('Seller name is required'),
    material: Yup.mixed<Material>()
        // .oneOf(Object.values(Material), 'Select a valid material')
        .required('Material is required'),
});


const AppointmentForm = () => {


    const formik = useFormik<Appointment>({
        initialValues: {
            timeSlot: null,
            truckLicensePlate: '',
            amountTons: 0,
            sellerName: '',
            material: Material.WOOD,
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
            // Submit logic here
        },
    });

    return <Paper component={"form"} sx={{p: 2}}>
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
                <DateTimePicker
                    label="Time Slot"
                    value={formik.values.timeSlot}
                    onChange={(value) => formik.setFieldValue('timeSlot', value)}
                    onError={(error) => formik.setFieldError('timeSlot', error ? String(error) : '')}
                    renderInput={(props) => (
                        <TextField
                            {...props}
                            error={formik.touched.timeSlot && Boolean(formik.errors.timeSlot)}
                            helperText={formik.touched.timeSlot && formik.errors.timeSlot}
                            fullWidth
                        />
                    )}
                />

                <TextField
                    label="Truck License Plate"
                    name="truckLicensePlate"
                    value={formik.values.truckLicensePlate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.truckLicensePlate && Boolean(formik.errors.truckLicensePlate)}
                    helperText={formik.touched.truckLicensePlate && formik.errors.truckLicensePlate}
                    fullWidth
                />

                <TextField
                    label="Amount in Tons"
                    name="amountTons"
                    type="number"
                    value={formik.values.amountTons}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.amountTons && Boolean(formik.errors.amountTons)}
                    helperText={formik.touched.amountTons && formik.errors.amountTons}
                    fullWidth
                />

                <TextField
                    label="Seller Name"
                    name="sellerName"
                    value={formik.values.sellerName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.sellerName && Boolean(formik.errors.sellerName)}
                    helperText={formik.touched.sellerName && formik.errors.sellerName}
                    fullWidth
                />

                <TextField
                    label="Material"
                    name="material"
                    select
                    value={formik.values.material}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.material && Boolean(formik.errors.material)}
                    helperText={formik.touched.material && formik.errors.material}
                    fullWidth
                >
                    {Object.values(Material).map((material) => (
                        <MenuItem key={material} value={material}>
                            {material}
                        </MenuItem>
                    ))}
                </TextField>

                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </Stack>
        </form>
    </Paper>
}
export default AppointmentForm;