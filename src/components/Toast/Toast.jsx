import "./Toast.css";

const Toast = ({ type, message, onClose }) => {
  if (!message) {
    return null;
  }

  return (
    <div className={`error-toast c-toast ${type}`}>
      <div className="error-toast-content d-flex">
        <span>{message}</span>

        <button className="error-toast-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
