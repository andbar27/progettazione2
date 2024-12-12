import React, {useState} from "react";

function Child({onMessage}){
    const sendMessageToParent = () => {
        { /* 2) in onMessage c'è la funzione data come parametro
                dal padre quiundi gli valorizzo l'attributo 
                della funzione */}
        onMessage('Ciao da Child');
    }
    return(
        <div>
            <button onClick={sendMessageToParent}>Invia Messaggio al Parent</button>
        </div>
    );
};

export default Child;