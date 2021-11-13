import React from 'react';

import Alert from '../../components/Alert';
import PinInput from './PinForm';
import LoginHandler from './handler';

const Login = (): JSX.Element => {
  const { isValidatingPin, hasError, verifyPinAndStoreBalance } = LoginHandler();

  return (
    <div className="login-screen page-bg">
      <main className="main-content">
        <h1 className="main-content__app-name">the<span className="main-content__app-name--main">ATM</span></h1>
        <h3 className="main-content__greeting">Welcome <span className="main-content__greeting--name">Michael</span></h3>
        <p className="main-content__description">Please enter your PIN or <span className="main-content__description--alert">NO Nintendo Switch!</span></p>
        {hasError && <Alert detail="Invalid PIN" />}
        <PinInput
          isValidatingPin={isValidatingPin}
          verifyPinAndStoreBalance={verifyPinAndStoreBalance} />
      </main>
    </div>
  );
};

export default Login;
