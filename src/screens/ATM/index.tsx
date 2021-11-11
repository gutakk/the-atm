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
    handleSubmit 
  } = SubmitHandler(currentBalance);

  return (
    <div className="atm-screen page-bg">
      <main className="main-content">
        <p>Balance: £{currentBalance}</p>
        <WithdrawForm
          hasError={hasError}
          errorMessage={errorMessage}
          hasWarning={hasWarning}
          warningMessage={warningMessage}
          handleSubmit={handleSubmit}
        />
      </main>
    </div>
  );
};

export default ATM;
