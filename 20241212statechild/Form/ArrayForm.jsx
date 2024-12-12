import React, { useState } from 'react';

function  RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value, // Aggiorna solo il campo specifico
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Nome: ${formData.name}, Email: ${formData.email}, Password: ${formData.password}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input
          type="text"
          name="name" // Associa l'input con la proprietà 'name' dell'oggetto formData
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Registrati</button>
    </form>
  );
};

export default RegistrationForm;