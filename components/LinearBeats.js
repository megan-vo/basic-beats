const React = require('react');

var Tone;
var pattern;
var sampler;

const MAIN_BEAT = "#FF851B";
const UNSTRESSED = "#EDAE49";
const STRESSED_OFFBEAT = "#087E8B";

class LinearBeats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      mounted: false,
      text: "Start Audio",
      opacity: "0.8",
      onBeat: 0
    };
  }

  componentDidMount() {
    Tone = require('tone');
    // creates it once to avoid overlapping synths
    sampler = new Tone.Sampler({
      "E4": "static/sounds/hihat3.mp3",
    }).toMaster();

    // To avoid overlapping patterns, declare here
    // Allows stop and start to end where it left off
    pattern = new Tone.Sequence(function (time, note) {
      this.animateCircles(note, time);
      sampler.triggerAttackRelease(note, .25);
    }.bind(this), ["E4", "E4", "E4", "E4", "E4", "E4"], "4n");

    // Make sure it is mounted before loading up
    // sampler
    this.setState({ mounted: true });
  }

  // Animates the circle in sync with the current
  // note being played
  animateCircles(note, time) {
    Tone.Draw.schedule(function () {
      this.props.updateProps({
        beatNum: ((this.props.beatNum) % 6) + 1
      });
      console.log(this.props.beatCount);
      this.setState({ onBeat: this.state.onBeat + 1 });
    }.bind(this), time);
  }

  // Function for time -> Angle

  // Toggles play on and off and creates a synth
  // to be played. Changes the button text to 
  // on/off
  playAudio() {
    this.setState({ onBeat: -1 }); // reset each time
    Tone.Transport.bpm.value = 120;
    // Play the audio when loaded and clicked and the transport isn't playing anything
    if (this.state.mounted && !this.state.play && Tone.Transport.state === "stopped") {
      this.props.updateProps({
        beatNum: 0
      });
      this.setState({ degrees: 0 });
      this.setState({ onBeat: 0 });

      // starts the transport and lets
      // us know that playback is on
      Tone.Transport.start();
      pattern.start(0);
      this.setState({ play: true });
    } else if (this.state.play) {
      // Stops transport and lets us know
      // playback is free to start playing
      // the next thing
      turnOff();
    }
    document.getElementById("ptr").classList.add("hide");
  }

  turnOff() {
    Tone.Transport.stop();
    pattern.stop();
    this.setState({ play: false });
    document.getElementById("ptr").classList.remove("hide");
  }

  // Displays the strong vs weak text based on what is hovered over
  showText() {
    var result;
    if (this.props.displayThreeFour && this.props.mode !== 1) {
      var strong = <text x="1%" y="30">Strong</text>;
      var weak1 = <text x="35%" y="30">Weak</text>;
      var weak2 = <text x="69%" y="30">Weak</text>;
      result = [strong, weak1, weak2];
    } else if (this.props.displaySixEight && this.props.mode !== 0) {
      var strongest = <text x="0.2%" y="30">Strongest</text>;
      var weak1 = <text x="19%" y="30">Weak</text>;
      var weak2 = <text x="35%" y="30">Weak</text>;
      var strong = <text x="52%" y="30">Strong</text>;
      var weak4 = <text x="69%" y="30">Weak</text>;
      var weak5 = <text x="86%" y="30">Weak</text>;
      result = [strongest, weak1, weak2, strong, weak4, weak5];
    }
    return result;
  }


  render() {
    const { displayThreeFour, displaySixEight, play, beatCount, mode, hasError, idyll, updateProps, ...props } = this.props;
    var beat = mode === 2 ? this.state.onBeat : beatCount; // later switch to ternary when using props
    var display = displayThreeFour || displaySixEight;
    var validDisplay1 = displayThreeFour && mode !== 1; // only display when mode corresponds correctly
    var validDisplay2 = displaySixEight && mode !== 0; // only display when mode is 1 or 2
    return (
      <div className="hoverable" onMouseEnter={this.playAudio.bind(this)} onMouseLeave={this.turnOff.bind(this)}>
        <svg version="1.1"
          baseProfile="full"
          width="100%" height="90px"
          xmlns="http://www.w3.org/2000/svg">
          <g>
            <circle cx="5.67%" cy="50" r={mode !== 2 || display ? "15" : "10"} fill={mode !== 2 || display ? MAIN_BEAT : UNSTRESSED}
              opacity={beat % 6 === 1 ? 1 : 0.7} />
            <circle cx="22.33%" cy="50" r="10" fill={UNSTRESSED}
              opacity={beat % 6 === 2 ? 1 : 0.7} />
            <circle cx="39%" cy="50" r={mode === 0 || validDisplay1 ? "13" : "10"} fill={mode === 0 || validDisplay1 ? STRESSED_OFFBEAT : UNSTRESSED}
              opacity={beat % 6 === 3 ? 1 : 0.7} />
            <circle cx="55.67%" cy="50" r={mode === 1 || validDisplay2 ? "15" : "10"} fill={mode === 1 || validDisplay2 ? STRESSED_OFFBEAT : UNSTRESSED}
              opacity={beat % 6 === 4 ? 1 : 0.7} />
            <circle cx="72.34%" cy="50" r={mode === 0 || validDisplay1 ? "13" : "10"} fill={mode === 0 || validDisplay1 ? STRESSED_OFFBEAT : UNSTRESSED}
              opacity={beat % 6 === 5 ? 1 : 0.7} />
            <circle cx="89%" cy="50" r="10" fill={UNSTRESSED} opacity={beat % 6 === 0 ? 1 : 0.7} />
          </g>
          {display ? this.showText() : () => { }}
        </svg>
        <img id="ptr" src={"static/images/cursor2.png"} opacity={.2} />
      </div>
    )
  }
}

module.exports = LinearBeats;