import React from 'react';

import { useAppSelector } from '../../hooks/useApp';
import WithdrawForm from './WithdrawForm';
import WithdrawHandler from './handler';
import Modal, { modalType } from '../../components/Modal';

const ATM = (): JSX.Element => {
  const { currentBalance } = useAppSelector((state) => state.user);
  const { withdrawAmount } = useAppSelector((state) => state.atm);
  const { 
    errorMessage,
    warningMessage,
    setWarningMessage,
    successMessage,
    setSuccessMessage,
    withdrewNotes,
    setWithdrewNotes,
    onWithdrawClick,
    withdraw,
  } = WithdrawHandler(currentBalance);

  return (
    <div className="atm-screen page-bg">
      <main className="main-content">
        <p>Balance: £{currentBalance}</p>
        {errorMessage && <p>{errorMessage}</p>}
        {successMessage &&
          <Modal
            isOpen={true}
            description={successMessage}
            modalType={modalType.success}
            withdrewNotes={withdrewNotes}
            customOnClose={() => { setSuccessMessage(''); setWithdrewNotes(''); }}
          />
        }
        {warningMessage &&
          <Modal
            isOpen={true}
            description={warningMessage}
            modalType={modalType.warning}
            customOnClose={() => setWarningMessage('')}
            onConfirm={() => withdraw(withdrawAmount)}
          />
        }
        <WithdrawForm onWithdrawClick={onWithdrawClick} />
      </main>
    </div>
  );
};

export default ATM;
