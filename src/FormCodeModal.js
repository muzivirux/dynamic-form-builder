import React from "react";

const FormCodeModal = ({ isOpen, onClose, formCode }) => {
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Generated Form Code</h2>
        <pre>{formCode}</pre>
        <a
          id="downloadLink"
          href={`data:text/plain;charset=utf-8,${encodeURIComponent(formCode)}`}
          download="generated_form.html"
        >
          Download
        </a>
      </div>
    </div>
  );
};

export default FormCodeModal;
