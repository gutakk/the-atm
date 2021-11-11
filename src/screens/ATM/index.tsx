import React from 'react';

import { useAppSelector } from '../../hooks/useApp';
import WithdrawForm from './WithdrawForm';
import SubmitHandler from './handler';

const ATM = (): JSX.Element => {
  const { currentBalance } = useAppSelector((state) => state.user);
  const { 
    hasError,
    errorMessage,
    hasWarning,
    warningMessage,
    isSuccess,
    handleSubmit,
    validateOverdrawn
  } = SubmitHandler(currentBalance);

  return (
    <div className="atm-screen page-bg">
      <main className="main-content">
        <p>Balance: £{currentBalance}</p>
        {isSuccess && <p>Withdraw successfully</p>}
        {hasError && <p>{errorMessage}</p>}
        {hasWarning && <p>{warningMessage}</p>}
        <WithdrawForm handleSubmit={handleSubmit} validateOverdrawn={validateOverdrawn} />
      </main>
    </div>
  );
};

export default ATM;
