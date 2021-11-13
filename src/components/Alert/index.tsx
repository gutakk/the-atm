import React from 'react';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type AlertProps = {
  detail: string
};

const Alert = (props: AlertProps): JSX.Element => {
  return (
    <div className="alert" data-test-id="alert">
      <FontAwesomeIcon className="alert__icon" icon={faExclamationCircle} />
      <p className="alert__detail">{props.detail}</p>
    </div>
  );
};

export default Alert;
