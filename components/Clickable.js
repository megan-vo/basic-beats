const React = require('react'); 

// TODO Hover text effect

// Works just like incrementer on the docs
class Clickable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {word: this.props.word};
  }

  increment() {
    this.props.updateProps({
      value: !this.props.value
    })
  }

  render() {
    return(
        <div onClick={this.increment.bind(this)}>
          <strong style={{color: "#087E8B"}}><ins>{this.state.word}</ins></strong>
        </div>
    )
  }
}

module.exports = Clickable;