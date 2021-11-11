import React from 'react';

import { useAppSelector } from '../../hooks/useApp';

const ATM = (): JSX.Element => {
  const { currentBalance } = useAppSelector((state) => state.user);

  return (
    <div className="atm-screen page-bg">
      <main className="main-content">
        <p>Current balance: {currentBalance}</p>
      </main>
    </div>
  );
};

export default ATM;
