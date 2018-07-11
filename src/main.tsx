import * as React from "react";
import { render } from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./app";
import { Provider } from "react-redux";
import store from "./redux/store";

render(
<BrowserRouter>
    <Provider store={store}>
        <App/>
    </Provider>
</BrowserRouter>,
document.getElementById("root-app"),
);
