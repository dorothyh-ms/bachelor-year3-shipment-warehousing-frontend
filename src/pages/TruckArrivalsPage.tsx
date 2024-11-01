import {Divider, IconButton, List, ListItem, ListItemText, Paper, Stack, Typography} from "@mui/material";
import {Delete as DeleteIcon} from "@mui/icons-material";

import {useParams} from "react-router";
import {useAppointments} from "../hooks/useAppointments.ts";
import dayjs from "dayjs";
import PageLayout from "../layouts/PageLayout.tsx";

const TruckArrivalsPage = () => {

    const {sellerId} = useParams();
    const {appointments, isLoading, isError} = useAppointments();

    if (isLoading) {
        return <Typography>Loading</Typography>;
    }

    if (isError || !appointments) {
        return <Typography>Error</Typography>;
    }


    return (
        <PageLayout title={"Truck arrivals"}>
            <Typography variant={"subtitle1"} sx={{mb: 2}}>Currently on site: { appointments.filter(appointment => appointment.status === "IN_PROGRESS").length
            }</Typography>
            <Paper sx={{width: "32em"}}>
                <Stack>
                    <List>
                        {appointments.map((appointment, ix) =>{
                            console.log("appointment", appointment)
                            let truckStatus = "Not arrived yet";
                            if ((appointment.status != "CONSOLIDATED") && (dayjs(appointment.timeSlotStart).isBefore(dayjs().add(2, "hour")))){
                                truckStatus = "Late";
                            };
                            if (appointment.status == "CONSOLIDATED") {
                                truckStatus = "Arrived on time";
                            };
                            if (appointment.status == "IN_PROGRESS") {
                                truckStatus = "On site";
                            };
                            if ((appointment.status != "CONSOLIDATED") && (dayjs(appointment.timeSlotStart).isAfter(dayjs()))){
                                truckStatus = "Not arrived yet";
                            };

                            return (<>
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
                                        <ListItemText
                                            sx={{fontWeight: "bold"}}
                                            primary={truckStatus}

                                        />
                                    </Stack>
                                </ListItem>
                                {(ix !== (appointments.length - 1)) && <Divider/>}
                            </>)}
                        )}
                    </List>
                </Stack>
            </Paper>

        </PageLayout>
    )
}


export default TruckArrivalsPage;