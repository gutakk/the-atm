import { useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom'

import { verifyPinAPI } from '../../adapters/pin';
import { useAppDispatch } from '../../hooks/useApp';
import { currentBalance, isLoggedin } from '../../reducers/user';


type SubmitHandler = {
  isValidatingPin: boolean,
  hasError: boolean,
  verifyPinAndStoreBalance: (pin: string) => void
};

const SubmitHandler = (): SubmitHandler => {
  const history: RouteComponentProps['history'] = useHistory();
  const dispatch = useAppDispatch();

  const [isValidatingPin, setIsValidatingPin] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const verifyPinAndStoreBalance = async(pin: string) => {
    try {
      setIsValidatingPin(true);
      setHasError(false);

      const { data } = await verifyPinAPI(pin);
      dispatch(currentBalance(data.currentBalance));
      dispatch(isLoggedin(true));
      
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

export default SubmitHandler;
