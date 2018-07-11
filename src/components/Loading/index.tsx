import * as React from "react";
import {LoadingComponentProps} from "react-loadable";

// TODO: Change loading to a spinner?
class Loading extends React.Component<LoadingComponentProps> {
    render() {
        return <h1>Loading</h1>;
    }
}

export default Loading;
