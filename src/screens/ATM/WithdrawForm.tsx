import React, { useState } from 'react';

type WithdrawFormProps = {
  onWithdrawClick: (withdrawAmount: number) => void;
};

const WithdrawForm = ({ onWithdrawClick }: WithdrawFormProps): JSX.Element => {
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWithdrawAmount(parseInt(e.target.value));
  };

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === '.') {
      e.preventDefault();
    }
  };

  return (
    <div className="withdraw-form">
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
        onClick={() => onWithdrawClick(withdrawAmount)}
      >
        Withdraw
      </button>
    </div>
  );
};

export default WithdrawForm;
