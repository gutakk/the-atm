import React from 'react';

const Login = (): JSX.Element => {
  return (
    <div className="login-screen">
      <main className="main-content">
        <h1 className="main-content__app-name">the<span className="main-content__app-name--main">ATM</span></h1>
        <h3 className="main-content__greeting">Welcome Michael</h3>
        <p className="main-content__description">Please enter your PIN or NO Nintendo Switch!</p>
        <input className="main-content__pin-input" type="password" maxLength={4} size={4} />
      </main>
    </div>
  );
};

export default Login;
