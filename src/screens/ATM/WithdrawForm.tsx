import React, { useState } from 'react';

type WithdrawFormProps = {
  hasError: boolean;
  errorMessage: string;
  hasWarning: boolean;
  warningMessage: string;
  handleSubmit: (withdrawAmount: number) => void;
  validateOverdrawn: (withdrawAmount: number) => void;
};

const WithdrawForm = ({
  hasError,
  errorMessage,
  hasWarning,
  warningMessage,
  handleSubmit,
  validateOverdrawn,
}: WithdrawFormProps): JSX.Element => {
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWithdrawAmount(parseInt(e.target.value));
    validateOverdrawn(parseInt(e.target.value));
  };

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === '.') {
      e.preventDefault();
    }
  };

  return (
    <div className="withdraw-form">
      {hasError && <p>{errorMessage}</p>}
      {hasWarning && <p>{warningMessage}</p>}
      <input
        className="withdraw-form__input"
        type="number"
        value={withdrawAmount}
        onKeyPress={(e) => handleOnKeyPress(e)}
        onChange={(e) => handleOnChange(e)}
      />
      <button
        className="withdraw-form__button"
        disabled={withdrawAmount <= 0 || isNaN(withdrawAmount)}
        onClick={() => handleSubmit(withdrawAmount)}
      >
        Withdraw
      </button>
    </div>
  );
};

export default WithdrawForm;
