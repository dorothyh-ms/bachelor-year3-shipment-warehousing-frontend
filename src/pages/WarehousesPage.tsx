import PageLayout from "../layouts/PageLayout.tsx";

import {useWarehouses} from "../hooks/useWarehouses.ts";

import WarehouseMap from "../components/WarehouseMap/WarehouseMap.tsx";


const WarehousesPage = () => {
    const {warehouses, isLoading, isError} = useWarehouses();

    return <PageLayout title={"Warehouses"}>

        {warehouses &&

            <WarehouseMap warehouses={warehouses} />
        }
    </PageLayout>
}

export default WarehousesPage;