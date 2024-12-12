import React, { useState } from "react";
function SimpleForm() {
    const [name, setName] = useState('inserisci nome');

    const handleChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // nota apici `: altgr + '
        alert(`Nome: ${name}`);
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange}></input>
            <button>Sub</button>
        </form>
    );

};

export default SimpleForm;