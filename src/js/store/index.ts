import { createStore, combineReducers } from "redux";
import appReducer from "./app/reducer";
import modelListReducer from "./model-list/reducer";
import modelNamingDialogReducer from "./model-naming-dialog/reducer";
import modelCreatingDialogReducer from "./model-creating-dialog/reducer";
import modelTrainingDialogReducer from "./model-training-dialog/reducer";
import modelImportingDialogReducer from "./model-importing-dialog/reducer";

const rootReducer = combineReducers({
    app: appReducer,
    modelList: modelListReducer,
    modelNamingDialog: modelNamingDialogReducer,
    modelCreatingDialog: modelCreatingDialogReducer,
    modelTrainingDialog: modelTrainingDialogReducer,
    modelImportingDialog: modelImportingDialogReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const enhancer = window.hasOwnProperty("__REDUX_DEVTOOLS_EXTENSION__") ? window["__REDUX_DEVTOOLS_EXTENSION__"]() : undefined;

const store = createStore(rootReducer, enhancer);

export type Store = typeof store;

export default store;
