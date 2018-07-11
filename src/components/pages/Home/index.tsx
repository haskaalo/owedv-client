import * as React from "react";
import FormPart from "./FormPart";
import EndorsementViewer from "./EndorsementViewer";

class Home extends React.Component {
    render() {
        return <div className="container-fluid max-height">
            <div className="row max-height">
                <FormPart/>
                <EndorsementViewer/>
            </div>
        </div>;
    }
}

export default Home;
