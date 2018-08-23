const React = require('react');

var Tone;
var player;

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: props.file
    }
  }

  componentDidMount() {
    Tone = require('tone');
    player = new Tone.Player("static/music/" + this.state.file).toMaster();
    this.setState({ mounted: true });
  }



  // Toggles play on and off and creates a synth
  // to be played. Changes the button text to 
  // on/off
  playAudio() {
    // Play the audio when loaded and clicked and the transport isn't playing anything
    if (this.state.mounted && !this.state.play && Tone.Transport.state === "stopped") {
      this.props.updateProps({
        sync: true
      })
      player.start();
      Tone.Transport.start();
    } else {
      this.turnOff();
    }
    document.getElementById("audioThreePtr").classList.add("hide");
  }

  turnOff() {
    this.props.updateProps({
      sync: false
    })
    Tone.Transport.stop();
    player.stop();
    document.getElementById("audioThreePtr").classList.remove("hide");

  }

  render() {
    const { hasError, idyll, updateProps, ...props } = this.props;
    return (
      <div className="hoverableAudio" onMouseEnter={this.playAudio.bind(this)} onMouseLeave={this.turnOff.bind(this)} >
        <h4>3/4</h4>
        <img id="audioThree" src={"static/images/audio.svg"} opacity={.2} />
        <img id="audioThreePtr" src={"static/images/cursor2.png"} opacity={.2} />
      </div>
    )
  }
}

module.exports = AudioPlayer;