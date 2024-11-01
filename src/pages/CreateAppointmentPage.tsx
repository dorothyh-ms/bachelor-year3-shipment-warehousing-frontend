
import PageLayout from "../layouts/PageLayout.tsx";
import AppointmentForm from "../components/AppointmentForm/AppointmentForm.tsx";

const CreateAppointmentPage = () => {
    return (
        <PageLayout title={"Create appointment"}>
            <AppointmentForm/>
        </PageLayout>
    )
}

export default CreateAppointmentPage