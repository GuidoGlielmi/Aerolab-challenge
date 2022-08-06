import styles from './modal.module.css';

const Modal = ({onConfirm, closeModal, invalidInput, pointsAmount}) => {
  function submitHandler(e) {
    e.preventDefault();
    onConfirm();
  }
  return (
    <div
      className={styles.background}
      id='modal'
      onClick={e => e.target.id === 'modal' && closeModal()}
    >
      <div className={styles.modal}>
        <div>
          <h3>Add points</h3>
          <img
            onClick={closeModal}
            className={styles.closeIcon}
            src='/assets/icons/close-icon.png'
            alt=''
          />
        </div>
        <div>
          <p>Enter an amount</p>
          <form onSubmit={submitHandler}>
            <input ref={pointsAmount} className={invalidInput ? styles.invalidInput : ''} />
            {invalidInput && (
              <p className={invalidInput ? styles.msgError : ''}>
                Only 1000, 5000 or 7500 points allowed
              </p>
            )}
          </form>
          <button className={styles.btn} onClick={onConfirm}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
