import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import PropTypes from 'prop-types';

const VizSensor = props => {
  const { visibility, setVisibility, offset, children } = props;
  return (
    <VisibilitySensor partialVisibility offset={offset}>
      {({ isVisible }) => {
        if (!visibility && isVisible) setVisibility(true);
        return children;
      }}
    </VisibilitySensor>
  );
};

VizSensor.propTypes = {
  visibility: PropTypes.bool.isRequired,
  setVisibility: PropTypes.func.isRequired,
  offset: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    bottom: PropTypes.number,
    right: PropTypes.number
  }),
  children: PropTypes.node.isRequired
};

export default VizSensor;
