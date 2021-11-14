import { useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom'

import { verifyPinAPI } from '../../adapters/pin';
import { useAppDispatch } from '../../hooks/useApp';
import { availableNotesAction, initialState } from '../../reducers/atm';
import { currentBalanceAction, isLoggedinAction } from '../../reducers/user';


type useLogin = {
  isValidatingPin: boolean,
  hasError: boolean,
  verifyPinAndStoreBalance: (pin: string) => void
};

const useLogin = (): useLogin => {
  const history: RouteComponentProps['history'] = useHistory();
  const dispatch = useAppDispatch();

  const [isValidatingPin, setIsValidatingPin] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const verifyPinAndStoreBalance = async(pin: string) => {
    try {
      setIsValidatingPin(true);
      setHasError(false);

      const { data } = await verifyPinAPI(pin);
      dispatch(currentBalanceAction(data.currentBalance));
      dispatch(isLoggedinAction(true));
      dispatch(availableNotesAction(initialState.availableNotes));
      
      history.push('/atm');
    } catch(err) {
      setHasError(true);
    }
    setIsValidatingPin(false);
  };

  return {
    isValidatingPin,
    hasError,
    verifyPinAndStoreBalance
  }
};

export default useLogin;
