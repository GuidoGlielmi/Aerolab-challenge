import styles from './modal.module.css';

const Modal = ({ content, title, onConfirm, closeModal, children }) => {
	return (
		<div className={styles.background}>
			<div className={styles.modal}>
				<div className={styles.modalHeader}>
					<h3 className={styles.title}>{title}</h3>
					<img onClick={closeModal} className={styles.closeIcon} src='/assets/icons/close-icon.png' alt='' />
				</div>
				<div className={styles.modalContent}>
					<p className={styles.content}>{content}</p>
					<div className='marginMedium columnContainer'>{children}</div>
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
