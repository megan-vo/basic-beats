// Audio play button that user clicks on to allow audio to play on page
// to satisfy audio policy

const React = require("react");
const StartAudioContext = require("startaudiocontext");

var Tone;

class Unmute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      on: false
    };
  }

  componentDidMount() {
    Tone = require("tone");
    StartAudioContext(Tone.context, "#unmute");
  }

  buttonClick() {
    if (!this.state.on) {
      this.setState({
        on: !this.state.on
      });
    }
  }

  render() {
    return [
      <div id="unmuteContainer">
        <button
          id="unmute"
          onClick={this.buttonClick.bind(this)}
          style={
            this.state.on
              ? {
                  background: "#edae49",
                  border: "none",
                  color: "white",
                  cursor: "auto"
                }
              : {
                  background: "none",
                  border: "2px solid #edae49",
                  color: "grey"
                }
          }
        >
          {this.state.on ? "Audio On" : "Audio Off"}
        </button>
      </div>
    ];
  }
}

module.exports = Unmute;
