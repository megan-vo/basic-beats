const React = require('react');

class Label extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      text: props.text
    });
  }

  componentDidMount() {

  }



  // Toggles play on and off and creates a synth


  render() {
    const { hasError, idyll, updateProps, ...props } = this.props;
    return (
      <div id={"label" + this.props.num}>
        <p><strong><ins>{this.state.text}</ins></strong></p>
      </div>
    )
  }
}

module.exports = Label;