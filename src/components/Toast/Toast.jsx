import { TOAST_TYPES } from "../../constants/toastTypes";
import "./Toast.css";

const Toast = ({ type, message, onClose }) => {
  if (!message) {
    return null;
  }

  let className;
  switch (type) {
    case TOAST_TYPES.SUCCESS:
      className = "success";
      break;
    case TOAST_TYPES.WARNING:
      className = "warning";
      break;
    case TOAST_TYPES.ERROR:
      className = "error";
      break;
    default:
      break;
  }

  return (
    <div className={`${className}-toast c-toast `}>
      <div className="error-toast-content d-flex">
        <span>{message}</span>
        <button className={`${className}-toast-close`} onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
