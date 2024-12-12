import React, {useState} from 'react'

function UserProfile() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    const handleNameChange = (e) => {
        setNome(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    return(
        <div>
            <h2>Profilo Utente</h2>
            <label>
                Nome: 
                <input type="text" value={nome} onChange={handleNameChange} />
            </label>
            <label>
                Email: 
                <input type="text" value={email} onChange={handleEmailChange} />
            </label>
            <h3>Dati Inseriti</h3>
            <p>Nome: {nome}</p>
            <p>Email: {email}</p>
        </div>
    );
    
};

export default UserProfile;