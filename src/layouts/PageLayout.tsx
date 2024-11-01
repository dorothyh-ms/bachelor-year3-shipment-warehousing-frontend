import { Stack, Typography} from "@mui/material";

interface PageLayoutProps {
    title: string;
    children: React.ReactNode;
}

const PageLayout = (props: PageLayoutProps) => {
    const {title, children} = props;
    return (<Stack sx={{alignItems: "center", mt: 2}}>
        <Typography sx={{mb: 2}} variant={"h5"}>{title}</Typography>
        <>
            {children}
        </>
    </Stack>)
}
export default PageLayout;