import { useState, Dispatch, SetStateAction } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/useApp';
import { withdrawAmountAction, availableNotesAction } from '../../reducers/atm';
import type { Notes } from '../../reducers/atm';
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
  withdrewNotes: string;
  setWithdrewNotes: Dispatch<SetStateAction<string>>;
  onWithdrawClick: (withdrawAmount: number) => void;
  withdraw: (withdrawAmount: number) => void;
};

const WithdrawHandler = (currentBalance: number): WithdrawHandler => {
  const dispatch = useAppDispatch();
  const { availableNotes, withdrawAmount } = useAppSelector((state) => state.atm);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [withdrewNotes, setWithdrewNotes] = useState<string>('');
  
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
    setSuccessMessage(`Withdraw £${withdrawAmount} successfully`);
    setWithdrewNotes(getWithdrewNotesMessage(noteCombinations,));
    dispatch(withdrawAmountAction(0));
  }

  return {
    errorMessage,
    warningMessage,
    setWarningMessage,
    successMessage,
    setSuccessMessage,
    withdrewNotes,
    setWithdrewNotes,
    onWithdrawClick,
    withdraw
  }
};

export const getWithdrewNotesMessage = (noteCombinations: Notes): string => {
  const noteTypes: string[] = Object.keys(noteCombinations).sort((a,b) => b.localeCompare(a, 'en', {numeric: true}));
  let message: string[] = [];

  for(let i = 0; i < noteTypes.length; i++) {
    const noteType = noteTypes[i] as (keyof Notes);
    const withdrewNote = noteCombinations[noteType];
    if(withdrewNote !== 0) {
      message.push(`£${noteType}x${noteCombinations[noteType]}`);
    }
  }
  return message.join(', ');
}

export default WithdrawHandler;
