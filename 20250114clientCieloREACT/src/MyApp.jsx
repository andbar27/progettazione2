import React, { useState } from "react";

function MyApp() {
    const [readQuery, setReadQuery] = useState("");
    const [writeQuery, setWriteQuery] = useState("");
    const [resultMsg, setResultMsg] = useState("");
    const [resultNRows, setResultNRows] = useState("");

    // Funzione per inviare la query 
    const handleQuery = async (route, query) => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/${route}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ query }),
                });
                const data = await response.json();
                const cols = data.queryResult.columns;
                const rows = data.queryResult.rows;
                
                setResultMsg(data.Msg || "None");
                setResultNRows(data.queryResult.numRows || "None")
            
        } catch (error) {
            setResultMsg("Errore nella richiesta: " + error.message);
        };
    }

    return (
    <div style={{ padding: "20px" }}>
      <h1>Client Flask</h1>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Query per /readquery:
          <input
            type="text"
            value={readQuery}
            onChange={(e) => setReadQuery(e.target.value)}
            style={{ marginLeft: "10px", width: "300px" }}
          />
        </label>
        <button
          onClick={() => handleQuery("readquery", readQuery)}
          style={{ marginLeft: "10px" }}
        >
          Invia
        </button>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Query per /writequery:
          <input
            type="text"
            value={writeQuery}
            onChange={(e) => setWriteQuery(e.target.value)}
            style={{ marginLeft: "10px", width: "300px" }}
          />
        </label>
        <button
          onClick={() => handleQuery("writequery", writeQuery)}
          style={{ marginLeft: "10px" }}
        >
          Invia
        </button>
      </div>
      <div>
        <h2>Risultato:</h2>
        <pre style={{ background: "#f0f0f0", padding: "10px", borderRadius: "5px" }}>
          {resultMsg}
        </pre>
      </div>
      <div>
        <h2>Numero righe:</h2>
        <pre style={{ background: "#f0f0f0", padding: "10px", borderRadius: "5px" }}>
          {resultNRows}
        </pre>
      </div>

    </div>
    );
}

export default MyApp;