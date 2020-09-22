import React from "react";
import PropTypes from "prop-types";

export const SucessMessage = ({ value }) => {
  const { name, time } = value;
  const { hours, minutes, seconds } = time;

  return (
    <p>{`Of the last 24 hours ${name} spent ${hours}:${minutes}:${seconds} playing`}</p>
  );
};

SucessMessage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.object.isRequired,
};

export const ErrorMessage = ({ value }) => {
  return <p>{`Error: ${value}`}</p>;
};

ErrorMessage.propTypes = {
  value: PropTypes.string.isRequired,
};
