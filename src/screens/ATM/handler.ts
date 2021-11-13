import React, { useState, Dispatch, SetStateAction } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/useApp';
import { withdrawAmountAction, availableNotesAction } from '../../reducers/atm';
import { currentBalanceAction } from '../../reducers/user';
import {
  getRoughlyEvenMixNotes,
  validateOverdrawn,
  validateWithdrawAmount
} from '../../services/withdraw';


type WithdrawHandler = {
  errorMessage: string;
  warningMessage: string;
  setWarningMessage: Dispatch<SetStateAction<string>>;
  successMessage: string;
  setSuccessMessage: Dispatch<SetStateAction<string>>;
  onWithdrawClick: (withdrawAmount: number) => void;
  withdraw: (withdrawAmount: number) => void;
};

const WithdrawHandler = (currentBalance: number): WithdrawHandler => {
  const dispatch = useAppDispatch();
  const { availableNotes, withdrawAmount } = useAppSelector((state) => state.atm);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  const onWithdrawClick = () => {
    const amountError = validateWithdrawAmount(withdrawAmount, currentBalance);
    if(amountError) {
      setErrorMessage(amountError.toString());
      dispatch(withdrawAmountAction(0));
      return;
    }

    const overdrawnWarning = validateOverdrawn(withdrawAmount, currentBalance);
    if(overdrawnWarning) {
      setWarningMessage(overdrawnWarning.toString());
      return;
    }

    withdraw(withdrawAmount);
  };

  const withdraw = (withdrawAmount: number) => {
    setErrorMessage('');
    setWarningMessage('');
    const { noteCombinations, remainingNotes, getNoteError } = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);
    if(getNoteError) {
      setErrorMessage(getNoteError.toString());
      dispatch(withdrawAmountAction(0));
      return;
    }
    dispatch(currentBalanceAction(currentBalance - withdrawAmount));
    dispatch(availableNotesAction(remainingNotes));
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
