import React, { useState } from 'react';

import { useAppDispatch } from '../../hooks/useApp';
import { currentBalance } from '../../reducers/user';


type SubmitHandler = {
  hasError: boolean;
  errorMessage: string;
  hasWarning: boolean;
  warningMessage: string;
  isSuccess: boolean;
  handleSubmit: (withdrawAmount: number) => void;
  validateOverdrawn: (withdrawAmount: number) => void;
};

const SubmitHandler = (balance: number): SubmitHandler => {
  const dispatch = useAppDispatch();
  const overdraftAmount = 100;

  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [hasWarning, setHasWarning] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  const handleSubmit = (withdrawAmount: number) => {
    setHasWarning(false);

    if(isNaN(withdrawAmount)) {
      setIsSuccess(false);
      setHasError(true);
      setErrorMessage('Please enter withdraw amount!');
      return;
    }

    if(withdrawAmount > balance + overdraftAmount) {
      setIsSuccess(false);
      setHasError(true);
      setErrorMessage('Withdraw amount exceeds current balance!');
      return;
    }

    dispatch(currentBalance(balance - withdrawAmount));
    setHasError(false);
    setIsSuccess(true);
  };

  const validateOverdrawn = (withdrawAmount: number) => {
    setIsSuccess(false);
    setHasError(false);
    if(withdrawAmount > balance) {
      setHasWarning(true);
      setWarningMessage('Be careful! You are trying to overdrawn the balance.');
    } else {
      setHasWarning(false);
    }
  }

  return {
    hasError,
    errorMessage,
    hasWarning,
    warningMessage,
    isSuccess,
    handleSubmit,
    validateOverdrawn,
  }
};

const getNotes = (withdrawAmount: number) => {
  
}

export default SubmitHandler;
