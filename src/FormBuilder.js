import React, { useState } from "react";
import "./FormBuilder.css";
import FormCodeModal from "./FormCodeModal"; // Import the FormCodeModal component

const FormBuilder = () => {
  const [formFields, setFormFields] = useState([]);
  const [generatedCode, setGeneratedCode] = useState("");

  const addField = (type) => {
    const newField = {
      type,
      label: "",
      required: false,
    };
    setFormFields((prevFields) => [...prevFields, newField]);
  };

  const removeField = (index) => {
    const updatedFields = formFields.filter((_, i) => i !== index);
    setFormFields(updatedFields);
  };

  const handleFieldChange = (index, fieldProp, value) => {
    const updatedFields = [...formFields];
    updatedFields[index][fieldProp] = value;
    setFormFields(updatedFields);
  };

  const generateFormCode = () => {
    const fieldsCode = formFields
      .map((field, index) => {
        if (field.type === "text") {
          return `<div key="${index}">
  <label>${field.label}</label>
  <input type="text" ${field.required ? "required" : ""} />
</div>`;
        } else if (field.type === "select") {
          return `<div key="${index}">
  <label>${field.label}</label>
  <select ${field.required ? "required" : ""}>
    <option value="">Select an option</option>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
  </select>
</div>`;
        } else if (field.type === "checkbox") {
          return `<div key="${index}">
  <label>
    <input type="checkbox" />
    ${field.label}
  </label>
</div>`;
        }
        return "";
      })
      .join("\n");

    const formCode = `
    <html>
    <head>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Poppins", sans-serif;
      }

      body {
        font-family: "Poppins", sans-serif;
        padding: 20px;
        align-items: center;
        background-color: #e8e8e8;
      }
      h1 {
        text-align: center;
        font-weight: 400;
        margin-top: 7rem;
      }

      form {
        max-width: 600px;
        margin: 4rem auto;
        position: relative;
      }

      label {
        display: block;
        margin-top: 10px;
      }

      /* This form fuel and consumption */
      .sections {
        margin-top: 3rem;
      }

      .RSD {
        display: flex;
        justify-content: space-around;
        gap: 1rem;
      }

      /* end of This form fuel and consumption */

      label {
        display: block;
        margin-top: 10px;
      }
      input[type="range"] {
        width: 60%;
      }
      #totalrunningtimeValue {
        font-size: 4rem;
      }

      select,
      input[type="text"],
      input[type="time"],
      input[type="number"],
      textarea {
        width: 100%;
        padding: 12px;
        border: none;
        border-radius: 4px;
        box-shadow: 2px 2px 7px 0 rgba(0, 0, 0, 0.2);
        outline: none;
        color: #1a1a1a;
        background-color: #f8c807;
        margin-top: 1rem;
      }
      .ohpcfHeading {
        font-size: 1.2rem;
      }
      #phone {
        width: 100%;
        padding: 10px;
        margin-top: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
      }

      button[type="submit"] {
        margin-top: 1rem;
        background-color: #1a1a1a;
        color: #f8c807;
        border: none;
        padding: 10px;
        cursor: pointer;
        width: 100%;
        font-size: 16px;
        transition: color 0.3s;
      }
      input[type="submit"]:hover {
        color: #e88228;
      }

      /* dropdown */

      .options li {
        height: 50px;
        padding: 0 13px;
        font-size: 21px;
      }
      .options li:hover,
      li.selected {
        border-radius: 5px;
        background: #f2f2f2;
      }

      .location {
        display: flex;

        width: 100%;
      }
      .location button {
        width: 50rem;
        margin: 1rem 0 1rem 0;
        background-color: red;
        border: none;
        border-radius: 1rem;
        cursor: pointer;
        color: #fff;
      }
      .location input {
        margin: 1rem 3rem 1rem 0;
      }

      /* footer */
      .footer {
        align-items: center;
        text-align: center;
        margin: 4rem 0 2rem 0;
        color: #1a1a1a;
      }
      .footer a {
        text-decoration: none;
        color: #1a1a1a;
        transition: color 0.2s;
      }

      .footer a:hover {
        color: #e88228;
      }
      /* end of footer */

      /* spinner */
      .spinner-container {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        justify-content: center;
        align-items: center;
      }

      .spinner {
        display: inline-block;
        width: 50px;
        height: 50px;
        border: 3px solid #ffffff;
        border-top-color: #007bff;
        border-radius: 50%;
        animation: spinner-rotation 1s linear infinite;
      }

      @keyframes spinner-rotation {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }

      /* end of spinner */

      /* modal block pop up */
      .modal {
        display: none;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.7);
      }

      .modal-content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 40vw;
        position: relative;
        height: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
      }

      .close:hover,
      .close:focus {
        color: red;
        text-decoration: none;
        cursor: pointer;
      }

      #closeBtn {
        background-color: #4caf50;
        position: absolute;
        bottom: 1rem;
        color: #fefefe;
        width: 10rem;
        height: 3rem;
        border: none;
        border-radius: 1rem;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 1s;
      }
      #closeBtn:hover {
        background-color: red;
      }
      #modal-message {
        font-size: 2rem;
        text-align: center;
        margin-top: 4rem;
      }
      /* end of modal block pop up */

      /* new css style */
      ::placeholder {
        font-size: 0.6rem;
      }
      #logoImg {
        margin: 2rem;

        position: absolute;
        right: 33vw;
        top: 1vh;
        width: 150px;
        z-index: 100;
        animation: logo-appear 1s ease-in-out forwards;
      }
      @keyframes logo-appear {
        0% {
          top: -100px;
          opacity: 0;
        }
        100% {
          top: 0;
          opacity: 1;
        }
      }

      #line {
        width: 28%;
        height: 2px;
        background-color: black;
        margin: 10px auto;
      }

      .label {
        margin-top: 2rem;
      }

      #wapdatotalend,
      #wapdapeakoffpeaktotalused,
      #wapdaoffpeakused,
      #wapdatotal,
      #gen1durationtotal,
      #gen1unit,
      #gen1dieseltotal,
      #gen1unittotal,
      #gen3usedtotal,
      #gen3dieseltotal,
      #gen3unitstotal,
      #wapdapeakused {
        /* background-color: #189ab4; */
        font-weight: 700;
        opacity: 0.7;
      }

      /* responsive */

      @media (max-width: 1440px) {
        #logoImg {
          right: 26vw;
          transition: all 0.6s;
        }
        #line {
          width: 40%;
          transition: all 0.6s;
        }
      }

      @media (max-width: 1138px) {
        #logoImg {
          right: 20vw;
          transition: all 0.6s;
        }
        #line {
          width: 50%;
          transition: all 0.6s;
        }
        .footer {
          font-size: 70%;
          transition: all 0.6s;
        }
      }
      @media (max-width: 900px) {
        #logoImg {
          right: 10vw;
          transition: all 0.6s;
        }
        #line {
          width: 70%;
          transition: all 0.6s;
        }
      }

      @media (max-width: 600px) {
        #logoImg {
          right: 6vw;
          transition: all 0.6s;
        }
        #line {
          width: 90%;
          transition: all 0.6s;
        }
        body::before {
          display: none;
        }
        spline-viewer {
          display: none;
        }
      }
      @media (max-width: 375px) {
        #logoImg {
          width: 10rem;
          right: 0;
          transition: all 0.6s;
        }
        html {
          font-size: 65%;
        }
        #locationBtn {
          font-size: 1rem;
        }
      }
    </style>
    </head>
    <body>
      <form>
        ${fieldsCode}
        <button type="submit">Submit</button>
      </form>
    </body>
    </html>`;
    setGeneratedCode(formCode);
  };

  return (
    <div className="form-builder">
      <div className="form-builder-fields">
        <h2 className="formBuilder">Form Builder</h2>
        <button onClick={() => addField("text")}>Add Text Field</button>
        <button onClick={() => addField("select")}>Add Select Field</button>
        <button onClick={() => addField("checkbox")}>Add Checkbox Field</button>
        <div>
          <button onClick={generateFormCode}>Generate Form Code</button>
        </div>
      </div>
      <div className="form-preview">
        <h2 className="form-preview-heading">Form Preview</h2>
        <form>
          {formFields.map((field, index) => (
            <div key={index} className="form-field-preview">
              <label>Field Label:</label>
              <input
                type="text"
                placeholder="Field Label"
                value={field.label}
                onChange={(e) =>
                  handleFieldChange(index, "label", e.target.value)
                }
              />
              <label>
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={() =>
                    handleFieldChange(index, "required", !field.required)
                  }
                />
                Required
              </label>
              {field.type === "text" && (
                <input type="text" placeholder="Field Input" />
              )}
              {field.type === "select" && (
                <select>
                  <option value="">Select an option</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              )}
              {field.type === "checkbox" && <input type="checkbox" />}
              <button onClick={() => removeField(index)}>Remove</button>
            </div>
          ))}
        </form>
      </div>
      <div className="form-code">
        <h2>Generated Form Code</h2>
        <pre>{generatedCode}</pre>
      </div>
    </div>
  );
};

export default FormBuilder;
