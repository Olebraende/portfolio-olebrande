import { useEffect } from 'react';
import styles from '../../styles/modules/Toast.module.css';

const Toast = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={styles.toast}>
      <i className="bx bx-check-circle"></i>
      <span>{message}</span>
    </div>
  );
};

export default Toast;