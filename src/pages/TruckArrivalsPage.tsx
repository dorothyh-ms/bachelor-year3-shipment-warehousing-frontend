import {CircularProgress, Divider, List, Paper, Stack, Typography} from "@mui/material";

import {useAppointments} from "../hooks/useAppointments.ts";

import PageLayout from "../layouts/PageLayout.tsx";
import TruckArrivalCard from "../components/TruckArrivalCard/TruckArrivalCard.tsx";

const TruckArrivalsPage = () => {

    const {appointments, isLoading, isError} = useAppointments();


    return (
        <PageLayout title={"Truck arrivals"}>
            {appointments && <Typography variant={"subtitle1"} sx={{mb: 2}}>Currently on
                site: {appointments.filter(appointment => appointment.status === "IN_PROGRESS").length
                }</Typography>}
            <Stack>
                {isLoading && <CircularProgress sx={{alignSelf: "center"}} color={'secondary'}/>}
                {appointments && <Paper sx={{width: "32em"}}>
                    <Stack>
                        <List>
                            {appointments.map((appointment, ix) => <>
                                <TruckArrivalCard appointment={appointment}/>
                                {(ix !== (appointments.length - 1)) && <Divider/>}
                            </>)
                            }
                        </List>
                    </Stack>
                </Paper>}
            </Stack>

        </PageLayout>
    )
}


export default TruckArrivalsPage;