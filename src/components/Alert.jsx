import React from "react";

const Alert = (props) => {
  return (
    <>
      <div class="c-alert alert d-flex " role="alert">
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        {props.message}
      </div>
    </>
  );
};

export default Alert;
