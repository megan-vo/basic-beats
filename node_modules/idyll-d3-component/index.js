const React = require('react');
const ReactDOM = require('react-dom');

class D3Component extends React.Component {
  componentWillReceiveProps(nextProps) {
    this.update(nextProps);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { className, style } = this.props;
    return (
      <div ref={(node) => { this.initialize(node, this.props) }} className={className} style={Object.assign({ width: '100%'}, style)} />
    );
  }
}

module.exports = D3Component;
