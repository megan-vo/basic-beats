const React = require('react');

class BeatCount extends React.Component {
  constructor(props) {
    super(props);
  }

  beatCounts() {
    var result = [];
    for (var i = 1; i <= this.props.upTo; i++) {
      var color = i === 1 ? "#FF851B" : "#087E8B";
      var beatCount = this.props.beatCount;
      if (this.props.upTo === 3) {
        var fontWeightAnd = (i === 1 && beatCount === 2 ||
          i === 2 && beatCount === 4 ||
          i === 3 && beatCount === 6) ? "bold" : "normal";
        result.push(<span style={{ color: color }}>
          <span id={i + "3"} style={1 / 2 * beatCount + 1 / 2 === i ? { fontWeight: "bold", fontSize: "1.5em" } : { fontSize: "1.5em" }}>{i + " "}</span>
          <span id={i + "and3"} style={{ fontWeight: fontWeightAnd, fontSize: "1em", color: "#EDAE49" }}> and </span>
        </span>);
      } else {
        var fontWeightAnd = (i === 1 && beatCount === 2 || i === 2 && beatCount === 5) ? "bold" : "normal";
        var fontWeightAh = (i === 1 && beatCount === 3 || i === 2 && beatCount === 6) ? "bold" : "normal";

        result.push(<span style={{ color: color }}>
          <span id={i + "6"} style={1 / 3 * beatCount + 2 / 3 === i ? { fontWeight: "bold", fontSize: "1.5em" } : { fontSize: "1.5em" }}>{i + " "}</span>
          <span id={i + "and6"} style={{ fontWeight: fontWeightAnd, fontSize: "1em", color: "#EDAE49" }}> and </span>
          <span id={i + "ah6"} style={{ fontWeight: fontWeightAh, fontSize: "1em", color: "#EDAE49" }}>ah </span>
        </span>)
      }
    }
    return result;
  }

  hoverOn() {
    this.props.updateProps({
      hover: true
    })
    document.getElementById("ptr" + this.props.upTo).classList.add("hide");
  }

  hoverOff() {
    this.props.updateProps({
      hover: false
    })
    document.getElementById("ptr" + this.props.upTo).classList.remove("hide");
  }

  renderAlt() {
    // 1 2 3 4 5 6
    // 1     2
    var result = [];
    for (var i = 1; i <= this.props.upTo; i++) {
      var color = i === 1 ? "#FF851B" : "#087E8B";
      var beatCount = this.props.beatCount;
      if (this.props.upTo === 3) {
        var fontWeightAnd = (i === 1 && beatCount === 2 ||
          i === 2 && beatCount === 4 ||
          i === 3 && beatCount === 6) ? "bold" : "normal";
        result.push(<span style={{ color: color }}>
          <span id={i + "3"} style={1 / 2 * beatCount + 1 / 2 === i ? { fontWeight: "bold", fontSize: "1em" } : { fontSize: "1em" }}>{i * 2 - 1 + " "}</span>
          <span id={i + "plus1"} style={{ fontWeight: fontWeightAnd, fontSize: "0.7em", color: "#EDAE49" }}> {i * 2 + " "} </span>
        </span>);
      } else {
        var fontWeightAnd = (i === 1 && beatCount === 2 || i === 2 && beatCount === 5) ? "bold" : "normal";
        var fontWeightAh = (i === 1 && beatCount === 3 || i === 2 && beatCount === 6) ? "bold" : "normal";

        result.push(<span style={{ color: color }}>
          <span id={i + "6"} style={1 / 3 * beatCount + 2 / 3 === i ? { fontWeight: "bold", fontSize: "1em" } : { fontSize: "1em" }}>{3 * i - 2 + " "}</span>
          <span id={i + "and6"} style={{ fontWeight: fontWeightAnd, fontSize: "0.7em", color: "#EDAE49" }}>{3 * i - 1 + " "}</span>
          <span id={i + "ah6"} style={{ fontWeight: fontWeightAh, fontSize: "0.7em", color: "#EDAE49" }}>{3 * i + " "}</span>
        </span>)
      }
    }
    return result;
  }

  render() {
    const { altShow, hasError, idyll, updateProps, ...props } = this.props;

    return [
      <div className="hoverable" onMouseEnter={this.hoverOn.bind(this)} onMouseLeave={this.hoverOff.bind(this)}>
        <div className="beatCounts">
          <p className="counts" align="center">{this.props.upTo !== 0 ? this.beatCounts() : () => { }}</p>
          <p className="alts" align="center"><span id={"alt" + this.props.upTo}>{altShow ? this.renderAlt() : () => { }}</span></p>
        </div>
        <img className="ptrs" id={"ptr" + this.props.upTo} src={"static/images/cursor2.png"} opacity={.2} />
      </div>
    ]
  }
}

module.exports = BeatCount;