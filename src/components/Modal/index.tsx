import React, { useState } from 'react';
import { faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const modalIconMapper = {
  warning: faExclamationTriangle,
  success: faCheckCircle
}

export enum modalType {
  warning = 'warning',
  success = 'success',
};

type ModalProps = {
  isOpen: Boolean;
  modalType: modalType;
  description: string;
  customOnClose?: () => void;
  onConfirm?: () => void;
};

const Modal = (props: ModalProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(props.isOpen);

  const onClose = (): void => {
    setIsOpen(false);
    if(props.customOnClose) {
      props.customOnClose();
    }
  }

  return (
    <div className={`modal modal-${props.modalType}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal__backdrop" onClick={onClose}>
        <div className="modal__content-container" onClick={(e) => e.stopPropagation()}>
          <FontAwesomeIcon className="modal__icon" icon={modalIconMapper[props.modalType]} />
          <h3 className="modal__description">{props.description}</h3>
          <div className="modal__button-container">
            <button className="button modal__button-close" onClick={onClose}>Close</button>
            {props.modalType === modalType.warning && 
              <button className="button modal__button-continue" onClick={props.onConfirm}>Continue</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
