import React from 'react';

import PinInput from './PinForm';
import LoginHandler from './handler';

const Login = (): JSX.Element => {
  const { isValidatingPin, hasError, verifyPinAndStoreBalance } = LoginHandler();

  return (
    <div className="login-screen page-bg">
      <main className="main-content">
        <h1 className="main-content__app-name">the<span className="main-content__app-name--main">ATM</span></h1>
        <h3 className="main-content__greeting">Welcome Michael</h3>
        <p className="main-content__description">Please enter your PIN or NO Nintendo Switch!</p>
        <PinInput
          isValidatingPin={isValidatingPin}
          hasError={hasError}
          verifyPinAndStoreBalance={verifyPinAndStoreBalance} />
      </main>
    </div>
  );
};

export default Login;
