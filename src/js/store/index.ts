import { createStore, combineReducers } from "redux";
import appReducer from "./app/reducer";
import modelListReducer from "./model-list/reducer";
import modelNamingDialogReducer from "./model-naming-dialog/reducer";
import modelTrainingDialogReducer from "./model-training-dialog/reducer";
import modelImportingDialogReducer from "./model-importing-dialog/reducer";

const rootReducer = combineReducers({
    app: appReducer,
    modelList: modelListReducer,
    modelNamingDialog: modelNamingDialogReducer,
    modelTrainingDialog: modelTrainingDialogReducer,
    modelImportingDialog: modelImportingDialogReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, window.hasOwnProperty("__REDUX_DEVTOOLS_EXTENSION__") && window["__REDUX_DEVTOOLS_EXTENSION__"]());

export type Store = typeof store;

export default store;
