import React, { useState, useEffect } from 'react';

type PinInputProps = {
  isValidatingPin: boolean,
  hasError: boolean,
  verifyPinAndStoreBalance: (pin: string) => void;
};

const PinInput = ({ isValidatingPin, hasError, verifyPinAndStoreBalance }: PinInputProps): JSX.Element => {
  const pinLength: number = 4;
  const initialPin: string = "";

  const [pin, setPin] = useState<string>(initialPin);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPin(e.target.value);
  };

  useEffect(() => {
    if(pin.length === pinLength) {
      verifyPinAndStoreBalance(pin);
      setPin(initialPin);
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
      {hasError && <p>Invalid PIN</p>}
    </div>
  );
};

export default PinInput;
