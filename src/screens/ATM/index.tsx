import React from 'react';

import { useAppSelector } from '../../hooks/useApp';
import WithdrawForm from './WithdrawForm';
import SubmitHandler from './handler';

const ATM = (): JSX.Element => {
  const { currentBalance } = useAppSelector((state) => state.user);
  const { 
    errorMessage,
    warningMessage,
    isSuccess,
    onWithdrawClick,
    validateOverdrawn
  } = SubmitHandler(currentBalance);

  return (
    <div className="atm-screen page-bg">
      <main className="main-content">
        <p>Balance: £{currentBalance}</p>
        {isSuccess && <p>Withdraw successfully</p>}
        {errorMessage && <p>{errorMessage}</p>}
        {warningMessage && <p>{warningMessage}</p>}
        <WithdrawForm onWithdrawClick={onWithdrawClick} validateOverdrawn={validateOverdrawn} />
      </main>
    </div>
  );
};

export default ATM;
