import type { Notes } from '../reducers/atm';

class WithdrawError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, WithdrawError.prototype);
  }

  toString() {
    return this.message
  }
}

export const validateWithdrawAmount = (withdrawAmount: number, currentBalance: number): WithdrawError | null => {
  if(isNotValidWithdrawAmount(withdrawAmount)) {
    return new WithdrawError('Please enter valid withdraw amount');
  }
  if(isWithdrawAmountExceedBalance(withdrawAmount, currentBalance)) {
    return new WithdrawError('Withdraw amount exceeds balance and overdraft');
  }
  if(isWithdrawAmountCannotMod5(withdrawAmount)) {
    return new WithdrawError(`Sorry, we do not have enough notes to withdraw £${withdrawAmount}`);
  }
  return null;
};

export const validateOverdrawn = (withdrawAmount: number, currentBalance: number): WithdrawError | null  => {
  if(withdrawAmount > currentBalance) {
    return new WithdrawError('Be careful! You are trying to overdrawn the balance');
  }
  return null;
};

export const isNotValidWithdrawAmount = (withdrawAmount: number): boolean => {
  return isNaN(withdrawAmount) || withdrawAmount <= 0;
};

export const isWithdrawAmountExceedBalance = (withdrawAmount: number, currentBalance: number): boolean => {
  const overdraftAmount = 100;

  return withdrawAmount > currentBalance + overdraftAmount;
};

export const isWithdrawAmountCannotMod5 = (withdrawAmount: number): boolean => {
  return withdrawAmount % 5 !== 0;
};

type GetRoughlyEvenMixNotes = {
  noteCombinations: Notes;
  remainingNotes: Notes;
  getNoteError: WithdrawError | null;
};

export const getRoughlyEvenMixNotes = (availableNotes: Notes, withdrawAmount: number): GetRoughlyEvenMixNotes => {
  const noteTypes: string[] = Object.keys(availableNotes).sort((a,b) => b.localeCompare(a, 'en', {numeric: true}));
  let noteCombinations: Notes = { '5': 0, '10': 0, '20': 0 };
  let remainingNotes = { ...availableNotes};
  let tempWithdrawAmount = withdrawAmount;
  let pickAvailability: { [key: string]: boolean} = { '5': true, '10': true, '20': true };

  if(!isAtmHasEnoughtAmount(remainingNotes, noteTypes, withdrawAmount)) return {
    noteCombinations,
    remainingNotes,
    getNoteError: new WithdrawError(`Sorry, we do not have enough notes to withdraw £${withdrawAmount}`),
  };
  
  let i = 0;
  let unableToGetNoteCount = 0;
  
  while(true) {
    if(unableToGetNoteCount >= 3) return {
      noteCombinations,
      remainingNotes,
      getNoteError: new WithdrawError(`Sorry, we do not have enough notes to withdraw £${withdrawAmount}`),
    };

    if(i > 2) { i = 0; unableToGetNoteCount = 0 };
    if(tempWithdrawAmount <= 0) break;

    const noteType = noteTypes[i] as (keyof Notes);
    const noteValue = parseInt(noteType)
    
    if(tempWithdrawAmount === noteValue && remainingNotes[noteType] === 0 && noteCombinations[noteType] > 0) {
      noteCombinations[noteType] -= 1;
      remainingNotes[noteType] += 1;
      tempWithdrawAmount += noteValue;
      
      pickAvailability[noteType] = false;
      i++;
      continue;
    }

    if(noteValue > tempWithdrawAmount || remainingNotes[noteType] <= 0) {
      unableToGetNoteCount++;
      i++;
      continue; 
    }

    if(pickAvailability[noteType]) {
      tempWithdrawAmount -= noteValue;
      noteCombinations[noteType] += 1;
      remainingNotes[noteType] -= 1
    }

    i++;
  };

  return { noteCombinations, remainingNotes, getNoteError: null };
};

export const isAtmHasEnoughtAmount = (availableNotes: Notes, noteTypes: string[], withdrawAmount: number): boolean => {
  let totalAtmAmount = 0;

  for(let i = 0; i < noteTypes.length; i++) {
    const noteType = noteTypes[i] as (keyof Notes);
    const noteValue = parseInt(noteType)
    totalAtmAmount += availableNotes[noteType] * noteValue;    
  }

  if(totalAtmAmount >= withdrawAmount) return true;
  return false;
};
