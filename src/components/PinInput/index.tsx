import React, { useState, useEffect } from 'react';

import { verifyPinAPI } from '../../adapters/pin';

const PinInput = (): JSX.Element => {
  const pinLength: number = 4;
  const initialPin: string = "";

  const [pin, setPin] = useState<string>(initialPin);
  const [isValidatingPin, setIsValidatingPin] = useState<boolean>(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPin(e.target.value);
  };

  const verifyPin = async(pin: string) => {
    setPin(initialPin);
    try {
      setIsValidatingPin(true);
      const { data } = await verifyPinAPI(pin);
      // TODO: Store current balance to redux store
    } catch(err) {
    }
    setIsValidatingPin(false);
  };

  useEffect(() => {
    if(pin.length === pinLength) {
      verifyPin(pin);
    }
  }, [pin]);

  return (
    <div>
      <input
        className="pin-input"
        type="password"
        maxLength={4}
        size={4}
        onChange={(e) => handleOnChange(e)}
        value={pin}
        disabled={isValidatingPin}
      />
      {isValidatingPin && <p>Loading</p>}
    </div>
  );
};

export default PinInput;
