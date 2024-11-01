// import './App.css'
import {createBrowserRouter, createRoutesFromElements, Navigate, Route} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import {RouterProvider} from "react-router";

import {CssBaseline, ThemeProvider} from "@mui/material";

import CreateAppointmentPage from "./pages/CreateAppointmentPage.tsx";
import TruckArrivalsPage from "./pages/TruckArrivalsPage.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import theme from "./theme.ts";
import WarehousesPage from "./pages/WarehousesPage.tsx";

import AuthContextProvider from "./context/AuthContextProvider.tsx";
import {RequireAuth} from "./components/RequireAuth.tsx";
import PurchaseOrdersPage from "./pages/PurchaseOrdersPage.tsx";
import {TRUCKS, CREATE_APPOINTMENT, PURCHASE_ORDERS, WAREHOUSES} from "./routes.ts";
import WarehouseDetailPage from "./pages/WarehouseDetailPage.tsx";

const queryClient = new QueryClient();


const router = createBrowserRouter(
    createRoutesFromElements(

        <Route element={<RequireAuth />}>
            <Route element={<MainLayout/>}>
                <Route path={TRUCKS} element={<TruckArrivalsPage/>}/>
                <Route path={CREATE_APPOINTMENT} element={<CreateAppointmentPage/>}/>
                <Route index path="/" element={<WarehousesPage/>}/>
                <Route index path={WAREHOUSES} element={<WarehousesPage/>}/>
                <Route path={WAREHOUSES+"/:id"} element={<WarehouseDetailPage/>}/>
                <Route path={PURCHASE_ORDERS} element={<PurchaseOrdersPage/>}/>
                <Route
                    path="*"
                    element={<Navigate to={WAREHOUSES} replace />}
                />
            </Route>
        </Route>

    )
);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <RouterProvider router={router}/>
                </ThemeProvider>
            </AuthContextProvider>
        </QueryClientProvider>
    );
}

export default App;