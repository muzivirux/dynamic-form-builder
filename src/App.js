import React, { useState } from "react";
import "./App.css";
import FormBuilder from "./FormBuilder";

function App() {
  const [formData, setFormData] = useState([]);

  const handleFormUpdate = (updatedFormData) => {
    setFormData(updatedFormData);
  };

  return (
    <div className="App">
      <header className="App-header">
        <FormBuilder initialFormData={formData} onUpdate={handleFormUpdate} />

        {/* Use the FormDisplay component */}
      </header>
    </div>
  );
}

export default App;
