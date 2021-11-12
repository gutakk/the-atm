import React, { useState, Dispatch, SetStateAction } from 'react';

import { useAppDispatch } from '../../hooks/useApp';
import { currentBalance } from '../../reducers/user';
import { validateOverdrawn, validateWithdrawAmount } from '../../services/withdraw';


type WithdrawHandler = {
  errorMessage: string;
  warningMessage: string;
  setWarningMessage: Dispatch<SetStateAction<string>>;
  isSuccess: boolean;
  onWithdrawClick: (withdrawAmount: number) => void;
};

const WithdrawHandler = (balance: number): WithdrawHandler => {
  const dispatch = useAppDispatch();

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  const onWithdrawClick = (withdrawAmount: number) => {
    const amountError = validateWithdrawAmount(withdrawAmount, balance);
    if(amountError) {
      setErrorMessage(amountError.toString());
      return;
    }

    const overdrawnWarning = validateOverdrawn(withdrawAmount, balance);
    if(overdrawnWarning) {
      setWarningMessage(overdrawnWarning.toString());
      return;
    }

    dispatch(currentBalance(balance - withdrawAmount));
    setIsSuccess(true);
  };

  return {
    errorMessage,
    warningMessage,
    setWarningMessage,
    isSuccess,
    onWithdrawClick,
  }
};

export default WithdrawHandler;
