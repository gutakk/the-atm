import { getWithdrewNotesMessage } from '../../../screens/ATM/handler';
import { Notes } from '../../../reducers/atm';

describe('ATM screen handler', () => {
  describe('#getWithdrewNotesMessage', () => {
    describe('given valid noteCombinations', () => {
      describe('given all note combinations in ascesding order', () => {
        it('returns descending note type string message', () => {
          const noteCombinations: Notes = { '5': 1, '10': 1, '20': 1};

          const result = getWithdrewNotesMessage(noteCombinations);

          expect(result).toEqual('£20x1, £10x1, £5x1');
        });
      });

      describe('given all note combinations in descending order', () => {
        it('returns descending note type string message', () => {
          const noteCombinations: Notes = { '20': 1, '10': 1, '5': 1};

          const result = getWithdrewNotesMessage(noteCombinations);

          expect(result).toEqual('£20x1, £10x1, £5x1');
        });
      });

      describe('given all note combinations in shuffled order', () => {
        it('returns descending note type string message', () => {
          const noteCombinations: Notes = { '10': 1, '20': 1, '5': 1};

          const result = getWithdrewNotesMessage(noteCombinations);

          expect(result).toEqual('£20x1, £10x1, £5x1');
        });
      });

      describe('given missing one note', () => {
        it('returns descending note type string message', () => {
          const noteCombinations: Notes = { '5': 1, '10': 1, '20': 0};

          const result = getWithdrewNotesMessage(noteCombinations);

          expect(result).toEqual('£10x1, £5x1');
        });
      });

      describe('given missing two note', () => {
        it('returns descending note type string message', () => {
          const noteCombinations: Notes = { '5': 1, '10': 0, '20': 0};

          const result = getWithdrewNotesMessage(noteCombinations);

          expect(result).toEqual('£5x1');
        });
      });

      describe('given missing all notes', () => {
        it('returns descending note type string message', () => {
          const noteCombinations: Notes = { '5': 0, '10': 0, '20': 0};

          const result = getWithdrewNotesMessage(noteCombinations);

          expect(result).toEqual('');
        });
      });
    });
  });
});
