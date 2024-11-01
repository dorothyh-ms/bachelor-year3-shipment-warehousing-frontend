import {Divider, IconButton, List, ListItem, ListItemText, Paper, Stack, Typography} from "@mui/material";
import {Delete as DeleteIcon} from "@mui/icons-material";

import {useParams} from "react-router";
import {useAppointments} from "../hooks/useAppointments.ts";
import dayjs from "dayjs";
import PageLayout from "../layouts/PageLayout.tsx";

const AppointmentsPage = () => {

    const {sellerId} = useParams();
    const {appointments, isLoading, isError} = useAppointments(Number(sellerId));

    if (isLoading) {
        return <Typography>Loading</Typography>;
    }

    if (isError || !appointments) {
        return <Typography>Error</Typography>;
    }


    return (
        <PageLayout title={"Appointments"}>
            <Paper sx={{width: "32em"}}>
                <Stack>
                    <List>
                        {appointments.map((appointment, ix) =>
                            <>
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete" sx={{mr: 1}}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    }
                                >
                                    <Stack sx={{
                                        borderRadius: "99px",
                                        backgroundColor: "secondary.main",
                                        alignItems: "center",
                                        mr: 2,
                                        width: "5em",
                                        height: "5em",
                                        paddingY: "0.5em",
                                        justifyContent: "space-between"
                                    }}>
                                        <Typography sx={{fontWeight: "bold"}}
                                                    variant={"caption"}>{dayjs(appointment.date).format("D")}</Typography>
                                        <Typography sx={{fontWeight: "bold", paddingTop: 0}}

                                                    >{dayjs(appointment.date).format("MMM")}</Typography>
                                        <Typography sx={{fontWeight: "bold"}}
                                                    variant={"caption"}>{dayjs(appointment.date).format("YYYY")}</Typography>
                                    </Stack>
                                    <Stack>
                                    <ListItemText
                                        sx={{fontWeight: "bold"}}
                                        primary={`Material: ${appointment.material}`}
                                    />
                                    <ListItemText
                                        sx={{fontWeight: "bold"}}
                                        primary={`Truck: ${appointment.licensePlate}`}

                                    />
                                    </Stack>
                                </ListItem>
                                {(ix !== (appointments.length-1)) && <Divider/> }
                            </>
                        )}
                    </List>
                </Stack>
            </Paper>

        </PageLayout>
    )
}


export default AppointmentsPage;