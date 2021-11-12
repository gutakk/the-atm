import React from 'react';

import { useAppSelector } from '../../hooks/useApp';
import WithdrawForm from './WithdrawForm';
import WithdrawHandler from './handler';
import Modal, { modalType } from '../../components/Modal';

const ATM = (): JSX.Element => {
  const { currentBalance } = useAppSelector((state) => state.user);
  const { 
    errorMessage,
    warningMessage,
    setWarningMessage,
    isSuccess,
    onWithdrawClick,
  } = WithdrawHandler(currentBalance);

  console.log(warningMessage)

  return (
    <div className="atm-screen page-bg">
      <main className="main-content">
        <p>Balance: £{currentBalance}</p>
        {isSuccess && <p>Withdraw successfully</p>}
        {errorMessage && <p>{errorMessage}</p>}
        {warningMessage &&
          <Modal
            isOpen={true}
            description={warningMessage}
            modalType={modalType.warning}
            customOnClose={() => setWarningMessage("")}
          />
        }
        <WithdrawForm onWithdrawClick={onWithdrawClick} />
      </main>
    </div>
  );
};

export default ATM;
