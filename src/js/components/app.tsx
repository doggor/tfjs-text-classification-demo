import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import useStyles from "../hooks/use-styles";
import StylesProvider from "@material-ui/styles/StylesProvider";
import Container from "@material-ui/core/Container";
import Actionbar from "./action-bar";
import ModelList from "./model-list";
import ModelImportingDialog from "./model-importing-dialog";
import ModelNamingDialog from "./model-naming-dialog";
import ModelTrainingDialog from "./model-training-dialog";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function App() {
    const isLoading = useSelector((store: AppState) => store.app.isLoading);
    const classes = useStyles({});

    return (
        <StylesProvider injectFirst>
            <Container>
                <Actionbar />
                <ModelList />
                <ModelImportingDialog />
                <ModelNamingDialog />
                <ModelTrainingDialog />
                {isLoading ? (
                    <>
                        <Backdrop open={true} className={classes.onTop} />
                        <CircularProgress className={classes.onTopProgress} />
                    </>
                ) : (
                    <></>
                )}
            </Container>
        </StylesProvider>
    );
}
