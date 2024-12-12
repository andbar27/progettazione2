import React, {useState} from "react";
import Child from "./Child";

function Parent(){
    const [message, setMessage] = useState('');

    const handleMessage = (childMessage) => {
        setMessage(childMessage);
    };


    return (
        <div>
            {/* la funzione passata riempie message */}
            <h1>Messaggio dal child: {message}</h1>
            {/* 1) passo la funzione handle Message come parametro 
                    al figlio */}
            <Child onMessage={handleMessage} /> 
        </div>
    );
};

export default Parent;
