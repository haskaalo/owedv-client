import * as React from "react";
import { Dispatch } from "redux";
import { ViewProfile, IProfile, ViewProfileAction } from "../../../redux/actions/profile";
import ViewProfileRequest from "../../../request/viewprofile";

import "./formpart.scss";
import { SetError, IError, SetErrorAction } from "../../../redux/actions/error";
import { connect } from "react-redux";

export interface IState {
    btag: string;
    platform: string;
}

export interface IProps {
    viewProfile: (profile: IProfile) => ViewProfileAction;
    setError: (error: IError) => SetErrorAction;
    error: IError;
}

class FormPart extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {btag: "", platform: "pc"};
    }
    render() {
        return <form className="formpart col-md-3" onSubmit={this.handleFormSubmit.bind(this)}>
            <span className="form-title">Find out how much you have left until the next Endorsement level</span>
            {this.props.error === null ? null : <p>{this.props.error.message}</p>}
            <div className="form-group">
                <label htmlFor="btag">Battle#Tag</label>
                <input type="text" id="btag" className="form-control" value={this.state.btag} onChange={this.handleBtagChange.bind(this)} />
            </div>
            <div className="form-group btn-group btn-group-toggle">
                <label className="btn btn-secondary active" id="pc">
                    <input type="radio" name="platform" checked={this.state.platform === "pc"} onChange={this.handlePlatformChange.bind(this)} value="pc"/> PC
                </label>
                <label className="btn btn-secondary" id="psn">
                    <input type="radio" name="platform" checked={this.state.platform === "psn"} onChange={this.handlePlatformChange.bind(this)} value="psn"/> PSN
                </label>
                <label className="btn btn-secondary" id="xbox">
                    <input type="radio" name="platform" checked={this.state.platform === "xbox"} onChange={this.handlePlatformChange.bind(this)} value="xbox"/> Xbox
                </label>
            </div>
        </form>;
    }

    private async handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (this.state.btag === "" || this.state.platform === "") {
            return;
        }

        const profile = await ViewProfileRequest(this.state.btag, this.state.platform).catch((err: Error) => {
            // Errors are already filtered, so its safe to display
            this.props.setError({
                message: err.message,
            });
        });

        if (profile) {
            this.props.viewProfile(profile);
        }
    }

    private handleBtagChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({btag: event.target.value});
    }

    private handlePlatformChange(event: React.ChangeEvent<HTMLInputElement>) {
        // Remove old active element
        let el = document.querySelector("label.active");
        el.classList.remove("active");
        el.children[0].classList.remove("checked");

        // Add active class to clicked
        el = document.querySelector(`label#${event.target.value}`);
        el.classList.add("active");
        el.children[0].classList.add("checked");

        this.setState({platform: el.id});
    }
}

const mapStateToProps = ({error}: {error: IError}) => {
    return {error};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        viewProfile: (profile: IProfile) => {
            dispatch(ViewProfile(profile));
        },
        setError: (error: IError) => {
            dispatch(SetError(error));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormPart);
