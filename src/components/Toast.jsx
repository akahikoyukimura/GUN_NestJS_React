import React, { useState, useEffect } from "react";

function Toast({ type, message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
    }
  }, [message]);

  if (!visible) {
    return null;
  }

  return (
    <div className="error-toast c-toast">
      <div className="error-toast-content d-flex ">
        <span>{message}</span>

        <button className="error-toast-close" onClick={() => setVisible(false)}>
          ×
        </button>
      </div>
    </div>
  );
}

export default Toast;
