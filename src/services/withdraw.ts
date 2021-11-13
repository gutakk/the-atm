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
    return new WithdrawError('Withdraw amount exceeds balance');
  }
  if(isWithdrawAmountCannotMod5(withdrawAmount)) {
    return new WithdrawError(`Sorry, we do not have enough notes to withdraw £${withdrawAmount}`);
  }
  return null;
};

export const validateOverdrawn = (withdrawAmount: number, currentBalance: number): WithdrawError | null  => {
  if(withdrawAmount > currentBalance) {
    return new WithdrawError(`Be careful! You are trying to overdrawn the balance.`);
  }
  return null;
};

const isNotValidWithdrawAmount = (withdrawAmount: number): boolean => {
  return isNaN(withdrawAmount) || withdrawAmount <= 0;
};

const isWithdrawAmountExceedBalance = (withdrawAmount: number, currentBalance: number): boolean => {
  const overdraftAmount = 100;

  return withdrawAmount > currentBalance + overdraftAmount;
};

const isWithdrawAmountCannotMod5 = (withdrawAmount: number): boolean => {
  return withdrawAmount % 5 !== 0;
};

type GetRoughlyEvenMixNotes = {
  noteCombinations: Notes;
  remainingNotes: Notes;
  getNoteError: WithdrawError | null;
};

export const getRoughlyEvenMixNotes = (availableNotes: Notes, withdrawAmount: number): GetRoughlyEvenMixNotes => {
  const noteTypes: string[] = Object.keys(availableNotes).sort();
  let noteCombinations: Notes = { '5': 0, '10': 0, '20': 0 };
  let remainingNotes = { ...availableNotes};

  let i = 0;
  while(true) {
    if(i > 2) { i = 0 };
    if(withdrawAmount <= 0) break;
    if(isAtmRunOutOfNote(remainingNotes)) return {
      noteCombinations,
      remainingNotes,
      getNoteError: new WithdrawError(`Sorry, we do not have enough notes to withdraw £${withdrawAmount}`),
    }
    let noteType: string = noteTypes[i];
    let noteValue = parseInt(noteType)
    
    if(noteType === '5' || noteType === '10' || noteType === '20') {
      if(noteValue > withdrawAmount || remainingNotes[noteType] <= 0) {
        i++;
        continue; 
      }

      withdrawAmount -= noteValue;
      noteCombinations[noteType] += 1;
      remainingNotes[noteType] -= 1
    }
    i++;
  };

  return { noteCombinations, remainingNotes, getNoteError: null }
};

const isAtmRunOutOfNote = (remainingNotes: Notes): boolean => {
  return Object.values(remainingNotes).every(value => value === 0);
}
