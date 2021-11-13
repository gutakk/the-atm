import React from 'react';

import { useAppSelector } from '../../hooks/useApp';
import WithdrawForm from './WithdrawForm';
import WithdrawHandler from './handler';
import Alert from '../../components/Alert';
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
        <h3 className="main-content__title">BALANCE</h3>
        <h1 className="main-content__balance"><span className="main-content__balance--currency">£</span>{currentBalance}</h1>
        {errorMessage && <Alert detail={errorMessage} />}
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
