import { h, Component } from "preact";
import "./ad.scss";

class Ad extends Component {
    render() {
        return <div className="ad col-lg-10 super-center" id="div-gpt-ad-1507329467536-0">
            <script>
                 if (window.googletag && googletag.pubadsReady) {
                    googletag.cmd.push(() => { googletag.display("div-gpt-ad-1507329467536-0"); })
                };
            </script>
        </div>;
    }
}

export default Ad;
