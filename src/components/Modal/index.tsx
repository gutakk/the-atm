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

export enum modalButtonType {
  close = 'close',
  confirm = 'confirm',
}

type ModalProps = {
  isOpen: Boolean;
  modalType: modalType;
  description: string;
  withdrewNotes?: string;
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
    <div className={`modal modal-${props.modalType}`} style={{ display: isOpen ? 'block' : 'none' }} data-test-id="modal">
      <div className="modal__backdrop" onClick={onClose}>
        <div className="modal__content-container" onClick={(e) => e.stopPropagation()}>
          <FontAwesomeIcon className="modal__icon" icon={modalIconMapper[props.modalType]} />
          <h3 className="modal__description">{props.description}</h3>
          {props.withdrewNotes && <p className="modal__description--withdrew-notes">{props.withdrewNotes}</p>}
          <div className="modal__button-container">
            <button className={`button modal__button-${modalButtonType.close}`} data-test-id="modalCloseButton" onClick={onClose}>Close</button>
            {props.modalType === modalType.warning && 
              <button className={`button modal__button-${modalButtonType.confirm}`} data-test-id="modalConfirmButton" onClick={props.onConfirm}>Confirm</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
