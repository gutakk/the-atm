import { getRoughlyEvenMixNotes } from "../../services/withdraw";
import { Notes } from '../../reducers/atm';

describe('#getRoughlyEvenMixNotes', () => {
  describe('given enough all notes', () => {
    const availableNotes: Notes = { '5': 4, '10': 15, '20': 7 };

    describe('given 0 withdraw amount', () => {
      it('returns correct noteCombinations, remainingNotes and no error', () => {
        const withdrawAmount = 0;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).toBeNull();
        expect(result.noteCombinations).toEqual({ '5': 0, '10': 0, '20': 0 });
        expect(result.remainingNotes).toEqual(availableNotes);
      });
    });

    describe('given 5 withdraw amount', () => {
      it('returns correct noteCombinations, remainingNotes and no error', () => {
        const withdrawAmount = 5;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).toBeNull();
        expect(result.noteCombinations).toEqual({ '5': 1, '10': 0, '20': 0 });
        expect(result.remainingNotes).toEqual({ '5': 3, '10': 15, '20': 7 });
      });
    });

    describe('given 10 withdraw amount', () => {
      it('returns correct noteCombinations, remainingNotes and no error', () => {
        const withdrawAmount = 10;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).toBeNull();
        expect(result.noteCombinations).toEqual({ '5': 0, '10': 1, '20': 0 });
        expect(result.remainingNotes).toEqual({ '5': 4, '10': 14, '20': 7 });
      });
    });

    describe('given 15 withdraw amount', () => {
      it('returns correct noteCombinations, remainingNotes and no error', () => {
        const withdrawAmount = 15;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).toBeNull();
        expect(result.noteCombinations).toEqual({ '5': 1, '10': 1, '20': 0 });
        expect(result.remainingNotes).toEqual({ '5': 3, '10': 14, '20': 7 });
      });
    });

    describe('given 20 withdraw amount', () => {
      it('returns correct noteCombinations, remainingNotes and no error', () => {
        const withdrawAmount = 20;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).toBeNull();
        expect(result.noteCombinations).toEqual({ '5': 0, '10': 0, '20': 1 });
        expect(result.remainingNotes).toEqual({ '5': 4, '10': 15, '20': 6 });
      });
    });

    describe('given 25 withdraw amount', () => {
      it('returns correct noteCombinations, remainingNotes and no error', () => {
        const withdrawAmount = 25;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).toBeNull();
        expect(result.noteCombinations).toEqual({ '5': 1, '10': 0, '20': 1 });
        expect(result.remainingNotes).toEqual({ '5': 3, '10': 15, '20': 6 });
      });
    });

    describe('given 30 withdraw amount', () => {
      it('returns correct noteCombinations, remainingNotes and no error', () => {
        const withdrawAmount = 30;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).toBeNull();
        expect(result.noteCombinations).toEqual({ '5': 0, '10': 1, '20': 1 });
        expect(result.remainingNotes).toEqual({ '5': 4, '10': 14, '20': 6 });
      });
    });

    describe('given 35 withdraw amount', () => {
      it('returns correct noteCombinations, remainingNotes and no error', () => {
        const withdrawAmount = 35;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).toBeNull();
        expect(result.noteCombinations).toEqual({ '5': 1, '10': 1, '20': 1 });
        expect(result.remainingNotes).toEqual({ '5': 3, '10': 14, '20': 6 });
      });
    });

    describe('given 40 withdraw amount', () => {
      it('returns correct noteCombinations, remainingNotes and no error', () => {
        const withdrawAmount = 40;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).toBeNull();
        expect(result.noteCombinations).toEqual({ '5': 2, '10': 1, '20': 1 });
        expect(result.remainingNotes).toEqual({ '5': 2, '10': 14, '20': 6 });
      });
    });

    describe('given 220 withdraw amount', () => {
      it('returns correct noteCombinations, remainingNotes and no error', () => {
        const withdrawAmount = 220;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).toBeNull();
        expect(result.noteCombinations).toEqual({ '5': 4, '10': 6, '20': 7 });
        expect(result.remainingNotes).toEqual({ '5': 0, '10': 9, '20': 0 });
      });
    });
  });

  describe('given 5 note is empty', () => {
    const availableNotes: Notes = { '5': 0, '10': 15, '20': 7 };

    describe('given 5 withdraw amount', () => {
      it('returns error', () => {
        const withdrawAmount = 5;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).not.toBeNull();
        expect(result.getNoteError?.toString()).toEqual(`Sorry, we do not have enough notes to withdraw £${withdrawAmount}`);
      });
    });

    describe('given 15 withdraw amount', () => {
      it('returns error', () => {
        const withdrawAmount = 15;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).not.toBeNull();
        expect(result.getNoteError?.toString()).toEqual(`Sorry, we do not have enough notes to withdraw £${withdrawAmount}`);
      });
    });

    describe('given 25 withdraw amount', () => {
      it('returns error', () => {
        const withdrawAmount = 25;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).not.toBeNull();
        expect(result.getNoteError?.toString()).toEqual(`Sorry, we do not have enough notes to withdraw £${withdrawAmount}`);
      });
    });

    describe('given 35 withdraw amount', () => {
      it('returns error', () => {
        const withdrawAmount = 35;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).not.toBeNull();
        expect(result.getNoteError?.toString()).toEqual(`Sorry, we do not have enough notes to withdraw £${withdrawAmount}`);
      });
    });

    describe('given 40 withdraw amount', () => {
      it('returns correct noteCombinations, remainingNotes and no error', () => {
        const withdrawAmount = 40;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).toBeNull();
        expect(result.noteCombinations).toEqual({ '5': 0, '10': 2, '20': 1 });
        expect(result.remainingNotes).toEqual({ '5': 0, '10': 13, '20': 6 });
      });
    });
  });

  describe('given 10 note is empty', () => {
    const availableNotes: Notes = { '5': 4, '10': 0, '20': 7 };

    describe('given 10 withdraw amount', () => {
      it('returns correct noteCombinations, remainingNotes and no error', () => {
        const withdrawAmount = 10;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).toBeNull();
        expect(result.noteCombinations).toEqual({ '5': 2, '10': 0, '20': 0 });
        expect(result.remainingNotes).toEqual({ '5': 2, '10': 0, '20': 7 });
      });
    });

    describe('given 30 withdraw amount', () => {
      it('returns correct noteCombinations, remainingNotes and no error', () => {
        const withdrawAmount = 30;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).toBeNull();
        expect(result.noteCombinations).toEqual({ '5': 2, '10': 0, '20': 1 });
        expect(result.remainingNotes).toEqual({ '5': 2, '10': 0, '20': 6 });
      });
    });
  });

  describe('given 20 note is empty', () => {
    const availableNotes: Notes = { '5': 4, '10': 15, '20': 0 };

    describe('given 20 withdraw amount', () => {
      it('returns correct noteCombinations, remainingNotes and no error', () => {
        const withdrawAmount = 20;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).toBeNull();
        expect(result.noteCombinations).toEqual({ '5': 2, '10': 1, '20': 0 });
        expect(result.remainingNotes).toEqual({ '5': 2, '10': 14, '20': 0 });
      });
    });
  });

  describe('given only 5 note available', () => {
    const availableNotes: Notes = { '5': 4, '10': 0, '20': 0 };

    describe('given 10 withdraw amount', () => {
      it('returns correct noteCombinations, remainingNotes and no error', () => {
        const withdrawAmount = 10;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).toBeNull();
        expect(result.noteCombinations).toEqual({ '5': 2, '10': 0, '20': 0 });
        expect(result.remainingNotes).toEqual({ '5': 2, '10': 0, '20': 0 });
      });
    });

    describe('given 20 withdraw amount', () => {
      it('returns correct noteCombinations, remainingNotes and no error', () => {
        const withdrawAmount = 20;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).toBeNull();
        expect(result.noteCombinations).toEqual({ '5': 4, '10': 0, '20': 0 });
        expect(result.remainingNotes).toEqual({ '5': 0, '10': 0, '20': 0 });
      });
    });

    describe('given 25 withdraw amount', () => {
      it('returns error', () => {
        const withdrawAmount = 25;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).not.toBeNull();
        expect(result.getNoteError?.toString()).toEqual(`Sorry, we do not have enough notes to withdraw £${withdrawAmount}`);
      });
    });
  });

  describe('given only 10 note available', () => {
    const availableNotes: Notes = { '5': 0, '10': 5, '20': 0 };

    describe('given 5 withdraw amount', () => {
      it('returns correct noteCombinations, remainingNotes and no error', () => {
        const withdrawAmount = 5;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).not.toBeNull();
        expect(result.getNoteError?.toString()).toEqual(`Sorry, we do not have enough notes to withdraw £${withdrawAmount}`);
      });
    });

    describe('given 15 withdraw amount', () => {
      it('returns correct noteCombinations, remainingNotes and no error', () => {
        const withdrawAmount = 15;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).not.toBeNull();
        expect(result.getNoteError?.toString()).toEqual(`Sorry, we do not have enough notes to withdraw £${withdrawAmount}`);
      });
    });

    describe('given 20 withdraw amount', () => {
      it('returns error', () => {
        const withdrawAmount = 20;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).toBeNull();
        expect(result.noteCombinations).toEqual({ '5': 0, '10': 2, '20': 0 });
        expect(result.remainingNotes).toEqual({ '5': 0, '10': 3, '20': 0 });
      });
    });
  });

  describe('given only 20 note available', () => {
    const availableNotes: Notes = { '5': 0, '10': 0, '20': 100 };

    describe('given 40 withdraw amount', () => {
      it('returns correct noteCombinations, remainingNotes and no error', () => {
        const withdrawAmount = 40;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).toBeNull();
        expect(result.noteCombinations).toEqual({ '5': 0, '10': 0, '20': 2 });
        expect(result.remainingNotes).toEqual({ '5': 0, '10': 0, '20': 98 });
      });
    });

    describe('given 2000 withdraw amount', () => {
      it('returns correct noteCombinations, remainingNotes and no error', () => {
        const withdrawAmount = 2000;

        const result = getRoughlyEvenMixNotes(availableNotes, withdrawAmount);

        expect(result.getNoteError).toBeNull();
        expect(result.noteCombinations).toEqual({ '5': 0, '10': 0, '20': 100 });
        expect(result.remainingNotes).toEqual({ '5': 0, '10': 0, '20': 0 });
      });
    });
  });
});