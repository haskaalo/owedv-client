import * as React from "react";
import FormPart from "./FormPart";
import EndorsementViewer from "./EndorsementViewer";
import Ad from "../../Ad";

class Home extends React.Component {
    render() {
        return <div className="container-fluid max-height max-width">
            <div className="row max-height">
                <FormPart {...this.props}/>
                <div className="w-100"></div>
                <Ad/>
                <EndorsementViewer {...this.props}/>
            </div>
        </div>;
    }
}

export default Home;
