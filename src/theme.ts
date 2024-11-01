import {createTheme} from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: [

            'sans-serif',
        ].join(','),
    },
    palette: {
        primary: {
            main: "#fff",
            contrastText: "#253746"
        },
        secondary: {
            main: "#253746",
            contrastText: "#fff"
        },
        warning: {
            main: "#fdbd01"
        },
        info: {
            main: "#8d101c"
        },
        error: {
            main: "#cb0001"
        },
        success: {
            main: "#00782e",
            contrastText: "#fff"
        },
        background: {
            default: "#f5f5f5"
        }
    }
})


export default theme;