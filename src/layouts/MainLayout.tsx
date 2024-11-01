import {Outlet, useNavigate} from "react-router-dom";
import {AppBar, Box, Button, Stack, Toolbar, Typography} from "@mui/material";

import AuthContext from "../context/AuthContext.ts";
import {ReactNode, useContext} from "react";
import {TRUCKS, PURCHASE_ORDERS, WAREHOUSES, CREATE_APPOINTMENT} from "../routes.ts";
import WarehouseIcon from '@mui/icons-material/Warehouse';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

type PageData = {
    title: string;
    route: string;
    icon: ReactNode

}

const pages: PageData[] = [
    {
        title: "Warehouses",
        route: WAREHOUSES,
        icon: <WarehouseIcon/>
    },
    {
        title: "Purchase orders",
        route: PURCHASE_ORDERS,
        icon: <WarehouseIcon/>
    },
    {
        title: "Truck arrivals",
        route: TRUCKS,
        icon: <CalendarMonthIcon/>
    },
]

const MainLayout = () => {
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();


    return (

        <Box sx={{flexGrow: 1, gap: 2}}>
            <AppBar position="static" sx={{mb: 4}}>
                <Toolbar sx={{width: "100%", justifyContent: "space-between"}}>

                    <Stack direction="row" sx={{gap: 2}} >
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Krystal Distribution Group
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {
                                pages.map((page) => (
                                    <Button
                                        color="secondary"
                                        onClick={() => {
                                            navigate(page.route);
                                        }}>
                                        {page.title}
                                    </Button>
                                ))
                            }

                        </Box>
                    </Stack>
                    <Button sx={{justifySelf: "end"}} color="inherit" onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>


            <main>
                <Outlet/>
            </main>
        </Box>
    )
}

export default MainLayout;