import React from "react";
import PropTypes from "prop-types";

export const SucessMessage = ({ value }) => {
  const { name, time } = value;
  const { hours, minutes, seconds } = time;

  let message = "";
  if (hours === 0 && minutes === 0 && seconds === 0) {
    message = `${name} hasn't played today.`;
  } else {
    message = `Today ${name} spent ${hours}:${minutes}:${seconds} playing.`;
  }

  return <p>{message}</p>;
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
