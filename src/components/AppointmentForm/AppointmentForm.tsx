import {Button, CircularProgress, MenuItem, Paper, Stack, TextField} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";


import * as Yup from 'yup';
import {FormikHelpers, useFormik} from "formik";
import {Material} from "../../models/Material.ts";
import {NewAppointment} from "../../models/Appointment.ts";
import dayjs, {Dayjs} from "dayjs";
import {useCreateAppointment} from "../../hooks/useCreateAppointment.ts";
import {useSellers} from "../../hooks/useSellers.ts";

import {formatEnum} from "../../utils/formatEnum.ts";
import {useInvalidAppointmentDates} from "../../hooks/useInvalidAppointmentDates.ts";
import {useNavigate} from "react-router-dom";

const validationSchema = Yup.object({
    timeSlot: Yup.date()
        .min(dayjs().add(1, 'day').startOf('day'), 'Time slot can only be booked at least one day in advance')
        .required('Time slot is required'),
    truckLicensePlate: Yup.string()
        .required('Truck license plate is required'),
    amountTons: Yup.number()
        .min(1, 'Amount in tons cannot be negative')
        .required('Amount in tons is required'),
    sellerName: Yup.string()
        .required('Seller name is required'),
    material: Yup.mixed<Material>()
        // .oneOf(Object.values(Material), 'Select a valid material')
        .required('Material is required'),
});


const AppointmentForm = () => {
    const {createAppointment} = useCreateAppointment();
    const {sellers, isLoading: sellersLoading} = useSellers();
    const {invalidDates, isLoading: invalidDatesLoading} = useInvalidAppointmentDates();
    const navigate = useNavigate();
    const shouldDisableDate = (date: Dayjs): boolean => {
        return Boolean(invalidDates?.some(invalidDate => dayjs(invalidDate.date).isSame(date, 'day')));
    };

    const onSubmit = (values: NewAppointment, actions: FormikHelpers<NewAppointment>) => {
        actions.resetForm();
        createAppointment(values);
        navigate("/trucks")
    }

    const formik = useFormik<NewAppointment>({
        initialValues: {
            timeSlot: dayjs().add(2, 'day').format("YYYY-MM-DD HH:mm:ss"),
            truckLicensePlate: '',
            amountTons: 1,
            sellerName: '',
            material: "",
        },
        validationSchema,
        onSubmit
    });

    return <Stack sx={{width: {xs: "75%", md: "50%", lg: "25%"}}}>
        {(sellersLoading || invalidDatesLoading) && <CircularProgress color={'secondary'} sx={{alignSelf: "center"}} />}
        {sellers && invalidDates && <Paper sx={{p: 4}}>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                    >
                        {invalidDates && <DateTimePicker
                            views={['year', 'day', 'hours']}
                            label="Time Slot"
                            value={dayjs(formik.values.timeSlot)}
                            onChange={(value) => formik.setFieldValue('timeSlot', value)}
                            onError={(error) => formik.setFieldError('timeSlot', error ? String(error) : '')}
                            shouldDisableDate={shouldDisableDate}
                            slotProps={{
                                textField: {
                                    color: "secondary",
                                    variant: 'outlined',
                                    error: formik.touched.timeSlot && Boolean(formik.errors.timeSlot),
                                    helperText: formik.errors.timeSlot,
                                },
                            }}
                        />}

                    </LocalizationProvider>
                    <TextField
                        color={"secondary"}
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
                        color={"secondary"}
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
                        color={"secondary"}
                        select
                        label={"Seller"}
                        name="sellerName"
                        value={formik.values.sellerName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        {sellers && sellers.map((seller) => (
                            <MenuItem key={seller.id} value={seller.name}>
                                {seller.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        color={"secondary"}
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
                        {Object.values(Object.keys(Material).filter(key => !isNaN(Number(Material[key])))).map((value) => (
                            <MenuItem key={value} value={value}>
                                {formatEnum(value)}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button
                        type="submit"
                        // disabled={formik.isSubmitting || !formik.isValid || Object.keys(formik.touched).length < 1}
                        variant="contained"
                        color="secondary"
                    >
                        Submit
                    </Button>
                </Stack>
            </form>
        </Paper>}</Stack>;
}
export default AppointmentForm;