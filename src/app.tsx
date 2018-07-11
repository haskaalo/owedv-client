import * as React from "react";
import {Switch, Route} from "react-router-dom";
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
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/v/:platform/:battletag" component={Home} />
            </Switch>
            <Footer/>
        </div>;
    }
}

export default App;
