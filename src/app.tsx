import * as React from "react";
import {Switch, Route} from "react-router-dom";
import * as Loadable from "react-loadable";
import Loading from "./components/Loading";
import "./styles/base.scss";

const Home = Loadable({
    loader: () => import("./components/pages/Home"),
    loading: Loading,
});

class App extends React.Component {
    render() {
        return <Switch>
            <Route exact path="/" component={Home} />
        </Switch>;
    }
}

export default App;
