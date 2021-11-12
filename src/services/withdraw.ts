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
