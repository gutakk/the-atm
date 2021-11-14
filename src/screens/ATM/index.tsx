import React from 'react';

import { useAppSelector } from '../../hooks/useApp';
import WithdrawForm from './WithdrawForm';
import useATM from './hook';
import Alert from '../../components/Alert';
import Modal, { modalType } from '../../components/Modal';

const ATM = (): JSX.Element => {
  const { currentBalance } = useAppSelector((state) => state.user);
  const { 
    errorMessage,
    warningMessage,
    successMessage,
    withdrewNotesMessage,
    onWithdrawClick,
    onConfirmWarningModal,
    onCloseWarningModal,
    onCloseSuccessModal
  } = useATM(currentBalance);

  return (
    <div className="atm-screen page-bg">
      <main className="main-content">
        <h3 className="main-content__title">BALANCE</h3>
        <h1 className="main-content__balance" data-test-id="currentBalance">
          <span className="main-content__balance--currency">£</span>{currentBalance}
        </h1>
        {errorMessage && <Alert detail={errorMessage} />}
        {successMessage &&
          <Modal
            isOpen={true}
            description={successMessage}
            modalType={modalType.success}
            withdrewNotesMessage={withdrewNotesMessage}
            customOnClose={onCloseSuccessModal}
          />
        }
        {warningMessage &&
          <Modal
            isOpen={true}
            description={warningMessage}
            modalType={modalType.warning}
            customOnClose={onCloseWarningModal}
            onConfirm={onConfirmWarningModal}
          />
        }
        <WithdrawForm onWithdrawClick={onWithdrawClick} />
      </main>
    </div>
  );
};

export default ATM;
