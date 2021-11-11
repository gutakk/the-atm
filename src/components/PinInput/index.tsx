import React from 'react';

const PinInput = (): JSX.Element => {
  return (
    <input className="pin-input" type="password" maxLength={4} size={4} />
  );
};

export default PinInput;
