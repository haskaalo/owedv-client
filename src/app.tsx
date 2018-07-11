import * as React from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import * as Loadable from "react-loadable";
import Loading from "./components/Loading";
import Footer from "./components/Footer";

import "./styles/base.scss";

const Home = Loadable({
    loader: () => import("./components/pages/Home"),
    loading: Loading,
});

class App extends React.Component {
    render() {
        return <div>
                <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/v/:platform/:battletag?" component={Home} />
                </Switch>
                </BrowserRouter>
            <Footer/>
        </div>;
    }
}

export default App;
