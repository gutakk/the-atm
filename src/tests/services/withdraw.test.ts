import { current } from '@reduxjs/toolkit';
import * as withdraw from '../../services/withdraw';

describe('withdraw service', () => {
  describe('#validateOverdrawn', () => {
    describe('given withdraw amount lower than current balance', () => {
      it('returns no error', () => {
        const withdrawAmount = 100;
        const currentBalance = 200;

        const error = withdraw.validateOverdrawn(withdrawAmount, currentBalance);

        expect(error).toBeNull();
      });
    });

    describe('given withdraw amount more than current balance', () => {
      it('returns error', () => {
        const withdrawAmount = 200;
        const currentBalance = 100;

        const error = withdraw.validateOverdrawn(withdrawAmount, currentBalance);

        expect(error).not.toBeNull();
        expect(error?.toString()).toEqual('Be careful! You are trying to overdrawn the balance');
      });
    });
  });

  describe('#isNotValidWithdrawAmount', () => {
    describe('given valid withdraw amount (positive number)', () => {
      it('returns false', () => {
        const withdrawAmount = 100;

        const result = withdraw.isNotValidWithdrawAmount(withdrawAmount);

        expect(result).toBeFalsy();
      });
    });

    describe('given invalid withdraw amount', () => {
      describe('given 0', () => {
        it('returns true', () => {
          const withdrawAmount = 0;
  
          const result = withdraw.isNotValidWithdrawAmount(withdrawAmount);
  
          expect(result).toBeTruthy();
        });
      });
  
      describe('given negative value', () => {
        it('returns true', () => {
          const withdrawAmount = -100;
  
          const result = withdraw.isNotValidWithdrawAmount(withdrawAmount);
  
          expect(result).toBeTruthy();
        });
      });
    });

  });

  describe('#isWithdrawAmountExceedBalance', () => {
    describe('given valid withdraw amount', () => {
      describe('given withdraw amount lower than current balance and overdraft amount', () => {
        it('returns false', () => {
          const currentBalance = 220;
          const withdrawAmount = 100;
  
          const result = withdraw.isWithdrawAmountExceedBalance(withdrawAmount, currentBalance);
  
          expect(result).toBeFalsy();
        });
      });

      describe('given withdraw amount equal current balance and overdraft amount', () => {
        it('returns false', () => {
          const currentBalance = 220;
          // Overdraft amount is 100
          const withdrawAmount = 320;
  
          const result = withdraw.isWithdrawAmountExceedBalance(withdrawAmount, currentBalance);
  
          expect(result).toBeFalsy();
        });
      });
    });

    describe('given withdraw amount more than current balance and overdraft amount', () => {
      it('returns true', () => {
        const currentBalance = 220;
        const withdrawAmount = 900;

        const result = withdraw.isWithdrawAmountExceedBalance(withdrawAmount, currentBalance);

        expect(result).toBeTruthy();
      });
    });
  });

  describe('#isWithdrawAmountCannotMod5', () => {
    describe('given withdraw amount can be mod by 5', () => {
      it('returns false', () => {
        const withdrawAmount = 100;

        const result = withdraw.isWithdrawAmountCannotMod5(withdrawAmount);

        expect(result).toBeFalsy();
      });
    });

    describe('given withdraw amount cannot be mod by 5', () => {
      it('returns true', () => {
        const withdrawAmount = 101;

        const result = withdraw.isWithdrawAmountCannotMod5(withdrawAmount);

        expect(result).toBeTruthy();
      });
    });
  });

  describe('#validateWithdrawAmount', () => {
    describe('given valid parameters', () => {
      it('returns no error', () => {
        const withdrawAmount = 100;
        const currentBalance = 200;

        const error = withdraw.validateWithdrawAmount(withdrawAmount, currentBalance);

        expect(error).toBeNull();
      });
    });

    describe('given invalid parameters', () => {
      describe('given 0 withdraw amount', () => {
        it('returns error', () => {
          const withdrawAmount = 0;
          const currentBalance = 220;

          const error = withdraw.validateWithdrawAmount(withdrawAmount, currentBalance);

          expect(error).not.toBeNull();
          expect(error?.toString()).toEqual('Please enter valid withdraw amount');
        });
      });

      describe('given withdraw amount exceeds balance and overdraft', () => {
        it('returns error', () => {
          const withdrawAmount = 900;
          const currentBalance = 220;

          const error = withdraw.validateWithdrawAmount(withdrawAmount, currentBalance);

          expect(error).not.toBeNull();
          expect(error?.toString()).toEqual('Withdraw amount exceeds balance and overdraft');
        });
      });

      describe('given withdraw amount cannot be mod 5', () => {
        it('returns error', () => {
          const withdrawAmount = 101;
          const currentBalance = 220;

          const error = withdraw.validateWithdrawAmount(withdrawAmount, currentBalance);

          expect(error).not.toBeNull();
          expect(error?.toString()).toEqual(`Sorry, we do not have enough notes to withdraw £${withdrawAmount}`);
        });
      });
    });
  });
});
