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
    disableInput: boolean;
}

export interface IProps {
    viewProfile: (profile: IProfile) => ViewProfileAction;
    setError: (error: IError) => SetErrorAction;
    error: IError;
}

class FormPart extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {btag: "", platform: "pc", disableInput: false};
    }

    render() {
        return <form className="formpart col-lg-3 super-center" onSubmit={this.handleFormSubmit.bind(this)}>
            <h1>OWEDV</h1>
            <span className="form-title super-center description">Everything about Overwatch endorsements</span>
            {this.props.error === null ? null : <p>{this.props.error.message}</p>}
            <div className="form-group">
                <input type="text" id="btag" className="form-control form-control-lg" value={this.state.btag} onChange={this.handleBtagChange.bind(this)} placeholder="Battletag" disabled={this.state.disableInput}/>
            </div>
            <div className="form-group btn-group btn-group-toggle platform-radio">
                <label className="btn btn-block btn-secondary active" id="pc">
                    <input type="radio" name="platform" checked={this.state.platform === "pc"} onChange={this.handlePlatformChange.bind(this)} value="pc"/> PC
                </label>
                <label className="btn btn-block btn-secondary" id="psn">
                    <input type="radio" name="platform" checked={this.state.platform === "psn"} onChange={this.handlePlatformChange.bind(this)} value="psn"/> PSN
                </label>
                <label className="btn btn-block btn-secondary" id="xbox">
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
        this.setState({disableInput: true});

        const profile = await ViewProfileRequest(this.state.btag, this.state.platform).catch((err: Error) => {
            // Errors are already filtered, so its safe to display
            this.props.setError({
                message: err.message,
            });
            this.setState({disableInput: false});
        });

        if (profile) {
            if (window.history) {
                window.history.pushState("", "", `/v/${this.state.platform}/${this.state.btag.replace("#", "-")}`);
            }
            this.props.viewProfile(profile);
        }
        this.setState({disableInput: false});
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
