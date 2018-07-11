import * as React from "react";
import FormPart from "./FormPart";
import EndorsementViewer from "./EndorsementViewer";

class Home extends React.Component {
    render() {
        return <div className="container-fluid max-height max-width">
            <div className="row max-height">
                <FormPart {...this.props}/>
                <div className="w-100"></div>
                <EndorsementViewer {...this.props}/>
            </div>
        </div>;
    }
}

export default Home;
