import {h, Component} from "preact";
import { IProfile } from "../../../redux/actions/profile";
import { connect } from "preact-redux";
import "./endorsementviewer.scss";

export interface IProps {
    profile: IProfile;
}

class EndorsementViewer extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        if (this.props.profile === null) {
            return null;
        }

        return <div className="col-lg-3 super-center">
            <div className="media">
                <div className="media-body">
                    <h4 className="mt-0">
                        <ol className="breadcrumb text-center">
                        <img className="mr-3 align-self-start player-icon" src={this.props.profile.player.icon} height="42" width="42"/>
                        <div className="w-100"></div>
                            <li className="breadcrumb-item">
                                {this.props.profile.player.name}
                            </li>
                            <div className="w-100"></div>
                            <li className="breadcrumb-item active">{this.props.profile.player.platform.toUpperCase()}</li>
                            <li className="breadcrumb-item active">LVL {this.props.profile.level}</li>
                            <li className="breadcrumb-item active">Total {this.props.profile.total}</li>
                        </ol>
                    </h4>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                        Shotcaller
                        <span className="badge badge-default badge-pill" style={{backgroundColor: "#f1941298"}}>{this.props.profile.shotcaller}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                        Good Teammate
                        <span className="badge badge-default badge-pill" style={{backgroundColor: "#c81af598"}}>{this.props.profile.teammate}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                        Good Sportsmanship
                        <span className="badge badge-default badge-pill" style={{backgroundColor: "#40ce4498"}}>{this.props.profile.sportsmanship}</span>
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

const anyEndorsementViewer: any = EndorsementViewer;
export default connect(mapStateToProps)(anyEndorsementViewer);
