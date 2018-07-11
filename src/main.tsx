import * as React from "react";
import { render } from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./app";
import { Provider } from "react-redux";
import store from "./redux/store";

render(
<Provider store={store}>
    <App/>
</Provider>,
document.getElementById("root-app"),
);
