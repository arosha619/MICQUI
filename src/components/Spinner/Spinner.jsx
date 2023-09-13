import React from 'react';
import "./Spinner.css"
import PropTypes from 'prop-types';


const Loading = ({ backgroundColor, height }) => {

  const loaderStyle = {
    backgroundColor: backgroundColor, 
    height: height,
  };
  return (
    <div className="loading-container" style={loaderStyle}>
      <div className="loader"></div>
    </div>
  );
};
Loading.propTypes = {
  backgroundColor: PropTypes.string, // Prop type validation
  height: PropTypes.string, // Prop type validation for height
};

export default Loading;