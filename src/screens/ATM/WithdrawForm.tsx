import React from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/useApp';
import { withdrawAmountAction } from '../../reducers/atm';

type WithdrawFormProps = {
  onWithdrawClick: (withdrawAmount: number) => void;
};

const WithdrawForm = ({ onWithdrawClick }: WithdrawFormProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { withdrawAmount } = useAppSelector((state) => state.atm)
  const withdrawValue = withdrawAmount > 0 ? withdrawAmount : '';

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(withdrawAmountAction(parseInt(e.target.value)));
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
        value={withdrawValue}
        onKeyPress={(e) => handleOnKeyPress(e)}
        onChange={(e) => handleOnChange(e)}
      />
      <button
        className="button withdraw-form__button"
        disabled={withdrawAmount <= 0 || isNaN(withdrawAmount)}
        onClick={() => onWithdrawClick(withdrawAmount)}
      >
        Withdraw
      </button>
    </div>
  );
};

export default WithdrawForm;
