import { h, render } from "preact";
import App from "./app";
import { Provider } from "preact-redux";
import store from "./redux/store";

render(
<Provider store={store}>
    <App/>
</Provider>,
document.getElementById("root-app"),
);
