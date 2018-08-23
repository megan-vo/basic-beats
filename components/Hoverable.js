const React = require('react'); 

// TODO MAYBE GRAY IT OUT IF ONE IS PLAYING

class Hoverable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {word: this.props.word,
                  weight: "normal"};
  }

  display() {
    this.props.updateProps({
      display: true,
      hover: true
    });
    this.setState({weight: "bold"});
  }

  reset() {
    this.props.updateProps({
      display: false,
      hover: false
    });
    this.setState({weight: "normal"});
  }

  render() {
    return(
        <span className="hoverable" onMouseEnter={this.display.bind(this)} onMouseLeave={this.reset.bind(this)}>
          <strong style={{color: "#087E8B", fontWeight: this.state.weight}}><ins>{this.state.word}</ins></strong>
        </span>
    )
  }
}

module.exports = Hoverable;