import styles from './modal.module.css';

const Modal = ({onConfirm, closeModal, invalidInput, pointsAmount}) => {
  function submitHandler(e) {
    e.preventDefault();
    onConfirm();
  }
  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3 className={styles.title}>Add points</h3>
          <img
            onClick={closeModal}
            className={styles.closeIcon}
            src='/assets/icons/close-icon.png'
            alt=''
          />
        </div>
        <div className={styles.modalContent}>
          <p className={styles.content}>Enter an amount</p>
          <form onSubmit={submitHandler} className='marginMedium columnContainer'>
            <input
              ref={pointsAmount}
              className={invalidInput ? styles.invalidInput : ''}
              type='text'
            />
            {invalidInput && (
              <p style={{color: 'rgb(180, 0, 0)'}} className='marginSmall'>
                Only 1000, 5000 or 7500 points allowed
              </p>
            )}
          </form>
          <div className={styles.btnContainer}>
            <button className={styles.btn} onClick={onConfirm}>
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
