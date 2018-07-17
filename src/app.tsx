import { h, Component } from "preact";
import { Router } from "preact-router";
import Footer from "./components/Footer";

import "./styles/base.scss";
import Home from "./components/pages/Home";

class App extends Component {
    render() {
        return <div>
                <Router>
                    <Home path="/" />
                    <Home path="/v/:platform/:battletag" />
                </Router>
            <Footer/>
        </div>;
    }
}

export default App;
