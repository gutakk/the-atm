import React, { useState, useEffect } from 'react';

const PinInput = (): JSX.Element => {
  const pinLength: number = 4;
  const initialPin: string = "";
  const [pin, setPin] = useState<string>(initialPin);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPin(e.target.value);
  };

  useEffect(() => {
    if(pin.length === pinLength) {
      console.log('GOT 4 PIN');
      setPin(initialPin);
    }
  });

  return (
    <input
      className="pin-input"
      type="password"
      maxLength={4}
      size={4}
      onChange={(e) => handleOnChange(e)}
      value={pin}
    />
  );
};

export default PinInput;
