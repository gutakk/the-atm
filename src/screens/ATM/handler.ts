import React, { useState } from 'react';

type SubmitHandler = {
  hasError: boolean;
  errorMessage: string;
  handleSubmit: (withdrawAmount: number) => void;
};

const SubmitHandler = (currentBalance: number): SubmitHandler => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (withdrawAmount: number) => {
    if (withdrawAmount > currentBalance) {
      setHasError(true);
      setErrorMessage('Withdraw amount exceeds current balance!');
      return
    }
  };

  return {
    hasError,
    errorMessage,
    handleSubmit
  }
};

export default SubmitHandler;
