import React, { useState, Dispatch, SetStateAction } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/useApp';
import { withdrawAmountAction } from '../../reducers/atm';
import { currentBalance } from '../../reducers/user';
import { validateOverdrawn, validateWithdrawAmount } from '../../services/withdraw';


type WithdrawHandler = {
  errorMessage: string;
  warningMessage: string;
  setWarningMessage: Dispatch<SetStateAction<string>>;
  successMessage: string;
  setSuccessMessage: Dispatch<SetStateAction<string>>;
  onWithdrawClick: (withdrawAmount: number) => void;
  withdraw: (withdrawAmount: number) => void;
};

const WithdrawHandler = (balance: number): WithdrawHandler => {
  const dispatch = useAppDispatch();
  const { withdrawAmount } = useAppSelector((state) => state.atm);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  const onWithdrawClick = () => {
    const amountError = validateWithdrawAmount(withdrawAmount, balance);
    if(amountError) {
      setErrorMessage(amountError.toString());
      dispatch(withdrawAmountAction(0));
      return;
    }

    const overdrawnWarning = validateOverdrawn(withdrawAmount, balance);
    if(overdrawnWarning) {
      setWarningMessage(overdrawnWarning.toString());
      return;
    }

    withdraw(withdrawAmount);
  };

  const withdraw = (withdrawAmount: number) => {
    setErrorMessage('');
    setWarningMessage('');

    dispatch(currentBalance(balance - withdrawAmount));
    setSuccessMessage('Withdraw successfully');
    dispatch(withdrawAmountAction(0));
  }

  return {
    errorMessage,
    warningMessage,
    setWarningMessage,
    successMessage,
    setSuccessMessage,
    onWithdrawClick,
    withdraw
  }
};


export default WithdrawHandler;
