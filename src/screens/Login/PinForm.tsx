import React, { useState, useEffect } from 'react';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type PinFormProps = {
  isValidatingPin: boolean,
  hasError: boolean,
  verifyPinAndStoreBalance: (pin: string) => void;
};

const PinForm = ({ isValidatingPin, hasError, verifyPinAndStoreBalance }: PinFormProps): JSX.Element => {
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
    <div className="pin-form">
      {isValidatingPin && <FontAwesomeIcon className="pin-form__spinner" icon={faCircleNotch} spin />}
      <input
        className="pin-form__input"
        type="password"
        maxLength={4}
        size={4}
        onChange={(e) => handleOnChange(e)}
        value={pin}
        disabled={isValidatingPin}
      />
      {hasError && <p>Invalid PIN</p>}
    </div>
  );
};

export default PinForm;
