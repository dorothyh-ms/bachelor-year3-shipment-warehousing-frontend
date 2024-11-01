import dayjs from "dayjs";
import {Button, Chip, IconButton, ListItem, ListItemText, Stack, Tooltip, Typography} from "@mui/material";
import {Appointment, NewAppointment, UpdateAppointment} from "../../models/Appointment.ts";
import {formatEnum} from "../../utils/formatEnum.ts";
import EditIcon from '@mui/icons-material/Edit';
import {useState} from "react";
import {useFormik} from "formik";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import * as Yup from "yup";
import {Material} from "../../models/Material.ts";
import {useUpdateAppointment} from "../../hooks/useUpdateAppointment.ts";

interface TruckArrivalCardProps {
    appointment: Appointment;
}

const validationSchema = Yup.object({
    timeSlot: Yup.date()
        .min(dayjs().add(1, 'day').startOf('day'), 'Time slot can only be booked at least one day in advance')
        .required('Time slot is required'),

});

const TruckArrivalCard = (props: TruckArrivalCardProps) => {
    const {appointment} = props;
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const {updateAppointment} = useUpdateAppointment();

    const onSubmit = () => {

        console.log("submitting")
        updateAppointment({
            appointmentId: appointment.id,
            updatedAppointmentData: {timeSlot: dayjs(formik.values.timeSlotStart).format('YYYY-MM-DD HH:mm:ss')},
        });

    }

    const formik = useFormik<UpdateAppointment>({
        initialValues: {
            timeSlot: dayjs(appointment.timeSlotStart).format("YYYY-MM-DD HH:mm:ss"),
        },
        validationSchema,
        onSubmit
    });

    let truckStatus = "Not arrived yet";
    if ((appointment.status != "CONSOLIDATED") && (dayjs(appointment.timeSlotStart).isBefore(dayjs().add(2, "hour")))) {
        truckStatus = "Delayed";
    }

    if (appointment.status == "CONSOLIDATED") {
        truckStatus = "Arrived on time";
    }

    if (appointment.status == "IN_PROGRESS") {
        truckStatus = "On site";
    }

    if ((appointment.status != "CONSOLIDATED") && (dayjs(appointment.timeSlotStart).isAfter(dayjs()))) {
        truckStatus = "Not yet arrived";
    }

    const renderForm = () => {
        return <form>
            <Stack gap={1} sx={{mt: 1}}>
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                >
                    <DateTimePicker
                        views={['year', 'day', 'hours']}
                        label="New timeslot"
                        value={dayjs(formik.values.timeSlot)}
                        onChange={(value) => formik.setFieldValue('timeSlot', value)}
                        onError={(error) => formik.setFieldError('timeSlot', error ? String(error) : '')}

                        slotProps={{
                            textField: {
                                color: "secondary",
                                variant: 'outlined',
                                error: formik.touched.timeSlot && Boolean(formik.errors.timeSlot),
                                helperText: formik.errors.timeSlot,
                            },
                        }}
                    />

                </LocalizationProvider>
                <Stack
                    direction={"row"}
                    gap={1}
                >
                    <Button

                        // disabled={formik.isSubmitting || !formik.isValid || Object.keys(formik.touched).length < 1}
                        variant="contained"
                        color="secondary"
                        onClick={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                            setIsEditing(false);
                        }}
                    >
                        Submit
                    </Button>
                    <Button

                        // disabled={formik.isSubmitting || !formik.isValid || Object.keys(formik.touched).length < 1}
                        variant="contained"
                        color="error"
                        onClick={() => {

                            setIsEditing(false);
                        }}
                    >
                        Cancel
                    </Button>
                </Stack>
            </Stack>
        </form>
    }


    return (
        <ListItem
            secondaryAction={
                (truckStatus === "Not yet arrived" && !isEditing) ? <Tooltip title={"Change schedule date"}>
                    <IconButton aria-label="Change scheduled date"
                                onClick={() => {
                                    setIsEditing(true)
                                }}
                    >
                        <EditIcon/>
                    </IconButton>
                </Tooltip> : null

            }
        >
            <Stack sx={{
                alignItems: "center",
                mr: 2,
                width: "5em",
                height: "5em",
                paddingY: "0.5em",
                justifyContent: "space-between"
            }}>
                <Typography sx={{fontWeight: "bold"}}
                            variant={"caption"}>Scheduled: {dayjs(appointment.timeSlotStart).format("D/MM/YYYY HH:00")}</Typography>
            </Stack>
            <Stack>
                <ListItemText
                    sx={{fontWeight: "bold"}}
                    primary={`Material: ${formatEnum(appointment.material)}`}
                />
                <ListItemText
                    sx={{fontWeight: "bold"}}
                    primary={`Truck: ${appointment.truckLicensePlate}`}

                />
                <Chip sx={{width: "fit-content", mb: 1}} label={truckStatus}
                      color={truckStatus === "Delayed" ? "error" : ""}/>
                {isEditing && renderForm()}
            </Stack>
        </ListItem>

    )
}

export default TruckArrivalCard;