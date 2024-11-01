import {
    Card,
    CardContent,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemText,
    Paper,
    Stack,
    Typography
} from "@mui/material";

import {useAppointments} from "../hooks/useAppointments.ts";

import PageLayout from "../layouts/PageLayout.tsx";
import TruckArrivalCard from "../components/TruckArrivalCard/TruckArrivalCard.tsx";
import {useWarehouse} from "../hooks/useWarehouses.ts";
import {useParams} from "react-router";
import {formatEnum} from "../utils/formatEnum.ts";
import dayjs from "dayjs";

const WarehouseDetailPage = () => {

    const {id} = useParams();
    const {warehouse, isLoading, isError} = useWarehouse(id);
    const numberOfActivites = warehouse && warehouse.warehouseActivities ? warehouse.warehouseActivities.length : 0;

    return (
        <PageLayout title={`Warehouse details`}>

            <Stack gap={2}>
                {isLoading && <CircularProgress sx={{alignSelf: "center"}} color={'secondary'}/>}
                {warehouse &&
                    <>
                        <Card sx={{minWidth: 275}}>
                            <CardContent>
                                <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14}}>
                                    ID: {warehouse.id}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {warehouse.sellerName}
                                </Typography>
                                <Typography sx={{
                                    color: 'text.secondary',
                                    mb: 1.5
                                }}>{formatEnum(warehouse.material)}</Typography>
                            </CardContent>
                        </Card>
                        <List component={Paper}>
                            {warehouse.warehouseActivities?.map((activity, ix) =>
                                <>
                                    <ListItem>
                                        <ListItemText primary={<Typography
                                            variant="caption">{formatEnum(activity.action)}</Typography>}/>
                                        <ListItemText primary={<Typography
                                            variant="caption">{dayjs(activity.activityDate).format("DD/MM/YYYY")}</Typography>}/>
                                        <ListItemText primary={<Typography
                                            variant="caption">{activity.amountTons + " tons"}</Typography>}/>

                                    </ListItem>
                                    {(ix != numberOfActivites-1) && <Divider />}
                                </>)
                            }
                        </List>
                    </>
                }
            </Stack>

        </PageLayout>
    )
}


export default WarehouseDetailPage;