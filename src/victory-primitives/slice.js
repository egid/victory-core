import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import { isEqual } from "lodash";
import CommonProps from "./common-props";

export default class Slice extends React.Component {
  static propTypes = {
    ...CommonProps,
    datum: PropTypes.object,
    pathFunction: PropTypes.func,
    slice: PropTypes.object
  };

  componentWillMount() {
    const { style, path } = this.calculateAttributes(this.props);
    this.style = style;
    this.path = path;
  }

  shouldComponentUpdate(nextProps) {
    const { style, path } = this.calculateAttributes(nextProps);
    if (path !== this.path || !isEqual(style, this.style)) {
      this.style = style;
      this.path = path;
      return true;
    }
    return false;
  }

  calculateAttributes(props) {
    const { style, datum, active, pathFunction, slice } = props;
    return {
      style: Helpers.evaluateStyle(style, datum, active),
      path: pathFunction(slice)
    };
  }

  // Overridden in victory-core-native
  renderSlice(path, style, events) {
    const { role, shapeRendering, className } = this.props;
    return (
      <path
        d={path}
        className={className}
        role={role || "presentation"}
        style={style}
        shapeRendering={shapeRendering || "auto"}
        {...events}
      />
    );
  }

  render() {
    return this.renderSlice(this.path, this.style, this.props.events);
  }
}
