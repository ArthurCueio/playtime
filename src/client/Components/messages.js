import React from 'react';

export const SucessMessage = (props) => {
  const { name, time } = props.value;

  return (
    <p>{`Of the last 24 hours ${name} spent ${time.hours}:${time.minutes}:${time.seconds} playing`}</p>
  );
}

export const ErrorMessage = () => {
  return (
    <p>Error fetching data</p>
  );
}
