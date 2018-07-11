import * as React from "react";
import { Dispatch } from "redux";
import { ViewProfile, IProfile, ViewProfileAction } from "../../../redux/actions/profile";
import ILastPlayer from "../../../interfaces/lastplayer";
import ViewProfileRequest from "../../../request/viewprofile";

import "./formpart.scss";
import { SetError, IError, SetErrorAction, RemoveErrorAction, RemoveError } from "../../../redux/actions/error";
import { connect } from "react-redux";

export interface IState {
    btag: string;
    platform: string;
    disableInput: boolean;
}

export interface IProps {
    viewProfile: (profile: IProfile) => ViewProfileAction;
    setError: (error: IError) => SetErrorAction;
    removeError: () => RemoveErrorAction;
    error: IError;

    // React Router Props
    match?: {
        params: {
            battletag: string;
            platform: string;
        },
    };
}

class FormPart extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {btag: "", platform: "pc", disableInput: false};

        // Get latest player
        const item = localStorage.getItem("lastPlayer");

        if (item !== null && window.location.pathname === "/") {
            const lastPlayer: ILastPlayer = JSON.parse(item);
            this.state = {
                btag: lastPlayer.battletag.replace("-", "#"),
                platform: lastPlayer.platform,
                disableInput: false,
            };
            return;
        }

        if (this.props.match !== undefined && window.location.pathname !== "/") {
            this.state = {
                btag: this.props.match.params.battletag.replace("-", "#"),
                platform: this.props.match.params.platform,
                disableInput: false,
            };
        }
    }

    componentDidMount() {
        // Add ads
        const googletag = window.googletag || {};
        googletag.cmd = googletag.cmd || [];

        googletag.cmd.push(() => { googletag.display("div-gpt-ad-1507329467536-0"); });

        googletag.cmd.push(() => {
        const mappingcontentad1 = googletag.sizeMapping().
                addSize([992, 0], [[728, 90], [336, 280], [300, 250], [1, 1]]).
                addSize([768, 0], [[728, 90], [336, 280], [300, 250], [1, 1]]).
                addSize([320, 0], [[320, 50], [320, 100], [320, 200], [300, 250], [1, 1]]).
                addSize([0, 0], [[300, 250], [1, 1]]).
                build();

        const slot1 = googletag.defineSlot("/27606634/bd-ad", [[728, 90], [320, 50]], "div-gpt-ad-1507329467536-0").defineSizeMapping(mappingcontentad1).addService(googletag.pubads());
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();

        setInterval(() => { googletag.pubads().refresh([slot1]); }, 60000);
        });

        // Submit if latest player exist or is in /v/:...
        if (this.state.btag !== "" && this.state.btag !== undefined) {
            // Add active class to button
            const el = document.querySelector(`label#${this.state.platform}`);
            el.classList.add("active");
            el.children[0].classList.add("checked");
            this.handleFormSubmit(null);
        }
    }

    render() {
        return <form className="formpart col-lg-3 super-center" onSubmit={this.handleFormSubmit.bind(this)} id="formpart">
            <h1>OWEDV</h1>
            <span className="form-title super-center description">Everything about Overwatch endorsements</span>
            {this.props.error === null ? null : <p>{this.props.error.message}</p>}
            <div className="form-group">
                <input type="text" id="btag" className="form-control form-control-lg" value={this.state.btag} onChange={this.handleBtagChange.bind(this)} placeholder="Search for a player (case sensitive)" disabled={this.state.disableInput}/>
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
            <div id="div-gpt-ad-1507329467536-0" className="ad col-lg-1 super-center"></div>
        </form>;
    }

    private async handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        if (event != null) {
            event.preventDefault();
        }
        if (this.state.btag === "" || this.state.platform === "") {
            return;
        }
        this.props.removeError();
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

            // Add profile to last player storage
            const lastPlayer: ILastPlayer = {battletag: this.state.btag, platform: this.state.platform};
            localStorage.setItem("lastPlayer", JSON.stringify(lastPlayer));

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
        removeError: () => {
            dispatch(RemoveError());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormPart);
