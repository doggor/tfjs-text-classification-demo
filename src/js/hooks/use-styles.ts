import { makeStyles } from "@material-ui/core/styles";
import { amber, orange, lightGreen, cyan, blue, purple, deepPurple, grey, yellow } from "@material-ui/core/colors";

export default makeStyles(theme => ({
    spacing1: {
        margin: theme.spacing(1),
    },
    fWhite: {
        color: "#fff",
    },
    bgAmber: {
        backgroundColor: amber["700"],
    },
    bgOrange: {
        backgroundColor: orange["700"],
    },
    bgLightGreen: {
        backgroundColor: lightGreen["500"],
    },
    bgCyan: {
        backgroundColor: cyan["500"],
    },
    bgBlue: {
        backgroundColor: blue["500"],
    },
    bgPurple: {
        backgroundColor: purple["400"],
    },
    bgDeepPurple: {
        backgroundColor: deepPurple["400"],
    },
    bgBlackHover: {
        "&:hover": {
            backgroundColor: grey["900"],
        },
    },
    dropArea: {
        display: "block",
        borderWidth: "2px",
        borderStyle: "dashed",
        borderColor: grey["900"],
        borderRadius: "10px",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        textAlign: "center",
        "&:first-child": {
            marginBottom: theme.spacing(2),
        },
        "& input[type=file]": {
            display: "none",
        },
    },
    onTop: {
        zIndex: 100,
    },
    onTopProgress: {
        color: yellow["500"],
        margin: theme.spacing(2),
        zIndex: 101,
        position: "fixed",
        bottom: "50%",
        right: "50%",
    },
}));
