import React, { useState } from 'react';

type SubmitHandler = {
  hasError: boolean;
  errorMessage: string;
  hasWarning: boolean;
  warningMessage: string;
  handleSubmit: (withdrawAmount: number) => void;
  validateOverdrawn: (withdrawAmount: number) => void;
};

const SubmitHandler = (currentBalance: number): SubmitHandler => {
  const overdraftAmount = 100;

  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [hasWarning, setHasWarning] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>('');
  
  const handleSubmit = (withdrawAmount: number) => {
    if(isNaN(withdrawAmount)) {
      setHasError(true);
      setHasWarning(false);
      setErrorMessage('Please enter withdraw amount!');
      return;
    }

    if(withdrawAmount > currentBalance + overdraftAmount) {
      setHasError(true);
      setHasWarning(false);
      setErrorMessage('Withdraw amount exceeds current balance!');
      return;
    }
  };

  const validateOverdrawn = (withdrawAmount: number) => {
    setHasError(false);
    if(withdrawAmount > currentBalance) {
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
    handleSubmit,
    validateOverdrawn,
  }
};

const getNotes = (withdrawAmount: number) => {
  
}

export default SubmitHandler;
