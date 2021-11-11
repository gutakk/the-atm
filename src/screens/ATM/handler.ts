import React, { useState } from 'react';

type SubmitHandler = {
  hasError: boolean;
  errorMessage: string;
  hasWarning: boolean;
  warningMessage: string;
  handleSubmit: (withdrawAmount: number) => void;
};

const SubmitHandler = (currentBalance: number): SubmitHandler => {
  const overdraftAmount = 100;

  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [hasWarning, setHasWarning] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>('');
  
  const handleSubmit = (withdrawAmount: number) => {
    if(withdrawAmount > currentBalance + overdraftAmount) {
      setHasError(true);
      setHasWarning(false);
      setErrorMessage('Withdraw amount exceeds current balance!');
      return;
    } 
    
    if(withdrawAmount > currentBalance && withdrawAmount <= currentBalance + overdraftAmount) {
      setHasWarning(true);
      setHasError(false);
      setWarningMessage('Be careful! You are trying to overdrawn the balance.');
    }
  };

  return {
    hasError,
    errorMessage,
    hasWarning,
    warningMessage,
    handleSubmit
  }
};

const getNotes = (withdrawAmount: number) => {
  
}

export default SubmitHandler;
