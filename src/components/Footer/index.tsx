import { h, Component } from "preact";
import "./footer.scss";

class Footer extends Component {
    render() {
        return <footer className="footer max-width">
            <p>Created by <a href="https://blizztrack.com/">Blizztrack</a></p>
            <p>Data might not be 100% accurate</p>
            <a href="http://discord.gg/ac2HKXx">Join our discord here</a> <a href="https://www.patreon.com/BlizzTrack">Help us out on Patreon</a>
        </footer>;
    }
}

export default Footer;
