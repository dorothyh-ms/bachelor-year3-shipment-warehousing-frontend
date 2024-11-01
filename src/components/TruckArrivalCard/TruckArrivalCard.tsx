import dayjs from "dayjs";
import {Chip, ListItem, ListItemText, Stack, Typography} from "@mui/material";
import {Appointment} from "../../models/Appointment.ts";

interface TruckArrivalCardProps {
    appointment: Appointment;
}

const TruckArrivalCard = (props: TruckArrivalCardProps) => {
    const {appointment} = props;
    console.log("appointment", appointment)
    let truckStatus = "Not arrived yet";
    if ((appointment.status != "CONSOLIDATED") && (dayjs(appointment.timeSlotStart).isBefore(dayjs().add(2, "hour")))) {
        truckStatus = "Late";
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


    return (
        <ListItem
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
                    primary={`Material: ${appointment.material}`}
                />
                <ListItemText
                    sx={{fontWeight: "bold"}}
                    primary={`Truck: ${appointment.truckLicensePlate}`}

                />
               <Chip sx={{width: "fit-content"}} label={truckStatus} color={truckStatus === "Late" ? "error" : ""}/>

            </Stack>
        </ListItem>

    )
}

export default TruckArrivalCard;