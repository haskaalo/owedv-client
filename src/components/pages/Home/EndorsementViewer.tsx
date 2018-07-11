import * as React from "react";
import { IProfile, ViewProfile } from "../../../redux/actions/profile";
import { connect } from "react-redux";

export interface IProps {
    profile: IProfile;
}

class EndorsementViewer extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        if (this.props.profile === null) {
            return null;
        }

        return <div className="col-md-9">
            <div className="media">
                <img className="mr-3 d-none d-lg-block" src={this.props.profile.player.icon} />
                <div className="media-body">
                    <h4 className="mt-0">
                        <ol className="breadcrumb" data-toggle="tooltip" data-placement="bottom" title="Name / Platform / Level / Total">
                            <li className="breadcrumb-item">
                                {this.props.profile.player.name}
                            </li>
                            <li className="breadcrumb-item active">{this.props.profile.player.platform}</li>
                            <li className="breadcrumb-item active">{this.props.profile.level}</li>
                            <li className="breadcrumb-item active">{this.props.profile.total}</li>
                        </ol>
                    </h4>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                        Shotcaller
                        <span className="badge badge-default badge-pill">{this.props.profile.shotcaller}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                        Good Teammate
                        <span className="badge badge-default badge-pill">{this.props.profile.teammate}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                        Good Sportsmanship
                        <span className="badge badge-default badge-pill">{this.props.profile.sportsmanship}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = ({profile}: {profile: IProfile}) => {
    return {profile};
};

export default connect(mapStateToProps)(EndorsementViewer);
