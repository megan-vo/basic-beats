const React = require('react');
import { VictoryAnimation } from 'victory';

const centerX = 200;
const centerY = 150;
const radius = 100;

// const styles = {
//   HIDE: {
//        webkitTransition: "0.5s",
//        mozTransition: "0.5s",
//        oTransition: "0.5s",
//        transition: "0.5s",
//        visibility: "hidden"
//   },
//   SHOW: {
//     visibility: "visible"
//   }
// }

class CircleGraphic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numCircles: props.numCircles,
      placement: props.placement,
      circleTags: [],
      textTags: [],
    };

    // Set up the initial smaller circle states
    // And compute their positions based on props passed in
    for (var i = 0; i < this.state.numCircles; i++) {
      var newX = centerX + radius * Math.cos((this.state.placement[i] + 180) * Math.PI / 180);
      var newY = centerY + radius * Math.sin((this.state.placement[i] + 180) * Math.PI / 180);

      // The tags to push in
      var circles = <circle key={this.props.name + "c:" + i} cx={newX} cy={newY} r="12" fill={this.props.fill[i]} />;
      var text = <text key={this.props.name + "t:" + i} x={newX - 5} y={newY - 20} fill={this.props.fill[i]} fontWeight="bold">{(i + 1)}</text>;

      this.setState({ circleTags: this.state.circleTags.push(circles) });
      this.setState({ textTags: this.state.textTags.push(text) });
    }
  }

  // Create <g> </g> tags around circles to make sure
  // their opacity is correct on the beats when rendered
  renderTags(tags) {
    var newResult = [];
    for (var i = 0; i < this.state.numCircles; i++) {
      newResult.push(<g key={this.props.name + "g:" + i} opacity={this.props.miniOpacity[i]}>
        {tags[i]}</g>);
    }
    return newResult;
  }

  render() {
    const { opacity, rotation, showText, hasError, idyll, updateProps, ...props } = this.props;
    return (
      <svg version="1.1"
        baseProfile="full"
        width="350px" height="280px"
        xmlns="http://www.w3.org/2000/svg">
        <text x="300" y="50" opacity={opacity - .2 + opacity % 0.6} fill="#EDAE49">{this.props.label}</text>
        <g opacity={opacity}>
          <circle cx="200" cy="150" r="100" fill="#F5F5F5" />
          <circle cx="200" cy="150" r="110" stroke="#F5F5F5" fill="transparent" strokeWidth="8" />
          <circle cx="200" cy="150" r="3" fill="black" />
        </g>
        {this.renderTags(this.state.circleTags)}
        {showText ? this.renderTags(this.state.textTags) : () => { }}

        <line x1="200" y1="150" x2="200" y2="50" stroke="black" strokeWidth="5" transform={rotation} />
      </svg>
    )
  }
}

module.exports = CircleGraphic;