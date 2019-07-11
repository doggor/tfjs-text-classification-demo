import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "typeface-roboto";
import store from "./store";
import App from "./components/app";


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("#app")
);
