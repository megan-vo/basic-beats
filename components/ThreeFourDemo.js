const React = require('react');
import CircleGraphic from './CircleGraphic.js';

var Tone;
var sampler;
var pattern;

class ThreeFourDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      mounted: false,
      opacity: "0.8",
      onBeat: 0,
      rotation: "rotate(0  200 150)",
      degrees: 0
    };
  }

  componentDidMount() {
    Tone = require('tone');
    // creates it once to avoid overlapping synths
    sampler = new Tone.Sampler({
      "C4": "static/sounds/bassdrum4.wav",
      "E4": "static/sounds/silence.wav",
      "D4": "static/sounds/hihat3.wav"
    }).toMaster();

    // To avoid overlapping patterns, declare here
    // Allows stop and start to end where it left off
    pattern = new Tone.Sequence(function (time, note) {
      this.animateCircles(note, time);
      sampler.triggerAttackRelease(note, .25);
    }.bind(this), ["C4", "E4", "D4", "E4", "D4", "E4"], "4n");

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
      })

      this.setState({ onBeat: this.state.onBeat + 1 });
      this.setState({ rotation: "rotate(" + this.state.degrees + "  200 150)" });
      this.setState({ degrees: this.state.degrees + 60 });
    }.bind(this), time);
  }

  // Toggles play on and off and creates a synth
  // to be played. Changes the button text to 
  // on/off
  playAudio() {

    // Play the audio when loaded and clicked
    if (Tone.Transport.state === "stopped") {
      Tone.Transport.bpm.value = 120;
      this.turnOn("+0");
    } else if (this.state.play) {
      this.turnOff();
    }
  }

  turnOff() {
    Tone.Transport.stop();
    pattern.stop();
    this.setState({ opacity: "0.6" });
    this.setState({ play: false });
    this.props.updateProps({
      on: false,
      hover: false,
    });
  }

  turnOn(start) {
    if (this.state.mounted && !this.state.play) {
      this.setState({ degrees: 0 });
      this.setState({ onBeat: 0 });
      this.props.updateProps({
        beatNum: 0,
      });

      // starts the transport and lets
      // us know that playback is on
      Tone.Transport.start(start);
      pattern.start(start);
      this.setState({ opacity: "1" });
      this.setState({ play: true });
      this.props.updateProps({
        on: true,
        hover: true
      });
    } else if (this.state.play) {
      this.turnOff();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.play !== prevProps.play) {
      this.playAudio();
    } else if (this.props.sync !== prevProps.sync) {
      Tone.Transport.bpm.value = 348; // For audio sync
      Tone.Transport.bpm.rampTo(364, 10);
      Tone.Transport.timeSignature = [3, 4];
      this.turnOn("+2.2"); // start time of audio
    }
  }

  render() {
    const { steps, beatNum, hasError, idyll, updateProps, ...props } = this.props;
    var beat = this.state.onBeat;
    return [
      <div className="hoverable" onMouseEnter={this.playAudio.bind(this)} onMouseLeave={this.turnOff.bind(this)}>
        <CircleGraphic numCircles={3} placement={[90, 210, 330]} opacity={this.state.opacity}
          miniOpacity={[beat % 6 === 1 ? 0.9 : 0.5, beat % 6 === 3 ? 0.9 : 0.5, beat % 6 === 5 ? 0.9 : 0.5]}
          fill={["#FF851B", "#087E8B", "#087E8B"]} rotation={this.state.rotation}
          showText={steps === 3 || steps === 4}
          name="ThreeFour" label={steps > 1 ? "3/4" : ""} />
      </div>
    ]
  }
}

module.exports = ThreeFourDemo;