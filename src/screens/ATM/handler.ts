import React, { useState } from 'react';

import { useAppDispatch } from '../../hooks/useApp';
import { currentBalance } from '../../reducers/user';
import { validateWithdrawAmount } from '../../services/withdraw';


type SubmitHandler = {
  errorMessage: string;
  warningMessage: string;
  isSuccess: boolean;
  onWithdrawClick: (withdrawAmount: number) => void;
  validateOverdrawn: (withdrawAmount: number) => void;
};

const SubmitHandler = (balance: number): SubmitHandler => {
  const dispatch = useAppDispatch();

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  const onWithdrawClick = (withdrawAmount: number) => {
    const error = validateWithdrawAmount(withdrawAmount, balance);
    if(error) {
      setErrorMessage(error.toString());
      return;
    }

    dispatch(currentBalance(balance - withdrawAmount));
    setIsSuccess(true);
  };

  const validateOverdrawn = (withdrawAmount: number) => {
    if(withdrawAmount > balance) {
      setWarningMessage('Be careful! You are trying to overdrawn the balance.');
    }
  }

  return {
    errorMessage,
    warningMessage,
    isSuccess,
    onWithdrawClick,
    validateOverdrawn,
  }
};

export default SubmitHandler;
