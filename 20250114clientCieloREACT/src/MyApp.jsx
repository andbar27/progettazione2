import React, { useState } from "react";

function MyApp() {
    const [readQuery, setReadQuery] = useState("");
    const [writeQuery, setWriteQuery] = useState("");
    const [resultMsg, setResultMsg] = useState("");
    const [resultNRows, setResultNRows] = useState("");
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);

    const styles = {
      backgroundTop: {
          padding: "20px",
          marginBottom: "20px",
          backgroundImage: "url('/ala.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
      },
      backgroundRest: {
          //backgroundImage: "url('/patternbiancoblu.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          padding: "20px",
          color: "black",
          
      }
  };

    // Funzione per inviare la query 
    const handleQuery = async (route, query) => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/${route}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            });
            
            const data = await response.json();
            console.log("data: ", data);
            
            const msg = data.Msg;
            const esito = data.Esito;
            var numRows = "-1";
            if (route == "readquery" && esito == "000") {
                numRows = data.queryResult.numRows;
                setColumns(data.queryResult.columns || []);
                setRows(data.queryResult.rows || []);
            } 
            
            setResultMsg(msg || "None");
            setResultNRows(numRows || "None");
        } catch (error) {
            setResultMsg("Errore nella richiesta: " + error.message);
        }
    };



    // Funzione per comunicare con il fake server
    const getJson = async (route) => {
      try {
          const response = await fetch(`http://127.0.0.1:8080/${route}`, {
              // method: "GET",
              // headers: {
              //     "Content-Type": "application/json",
              // },
              //body: JSON.stringify({ query }),
          });
          
          const data = await response.json();
          console.log("data: ", data);
          
          const msg = data.Msg;
          const esito = data.Esito;
          var numRows = "-1";
          if((route == "aeroporti")||(route == "elencovoli")||(route == "compagnie"))
            route = "readquery";
          if (route == "readquery" && esito == "000") {
              numRows = data.queryResult.numRows;
              setColumns(data.queryResult.columns || []);
              setRows(data.queryResult.rows || []);
          } 
          
          setResultMsg(msg || "None");
          setResultNRows(numRows || "None");
      } catch (error) {
          setResultMsg("Errore nella richiesta: " + error.message);
      }
  };

    const voli =  `SELECT lap.citta as Partenza, 
                          ap.partenza as Aeroporto_Partenza,
                          laa.citta as Arrivo, 
                          ap.arrivo as Aeroporto_Arrivo,
                          v.durataminuti as Durata_Minuti, 
                          v.comp as Compagnia_Aerea 
                  FROM  ArrPart ap, 
                        LuogoAeroporto lap, 
                        LuogoAeroporto laa, 
                        Volo v
                  WHERE ap.arrivo = laa.aeroporto 
                    AND ap.partenza = lap.aeroporto 
                    AND v.codice = ap.codice 
                    AND v.comp = ap.comp`;

    const compagnie = `select * from Compagnia`;
    const aeroporti = ` select * 
                        from Aeroporto, LuogoAeroporto
                        where codice=aeroporto`;


    return (
        <div style={{  }}>
          <div style={styles.backgroundTop}>
            <h1>Client Flask Cielo DB</h1>
            <div style={{ padding: "20px", marginBottom: "3px" }}>
                <button onClick={() => getJson("elencovoli")} style={{ marginLeft: "5px", backgroundColor: "yellow", color: "blue" }}>
                        Elenco Voli
                </button>
                <button onClick={() => getJson("aeroporti")} style={{ marginLeft: "5px", backgroundColor: "Blue", color: "white" }}>
                        Aeroporti
                </button>
            
                <button onClick={() => getJson("compagnie")} style={{ marginLeft: "5px",  backgroundColor: "blue", color: "white"}}>
                        Compagnie Aeree
                </button>
            </div>
          </div>
          <div  style={styles.backgroundRest}>
            <div style={{ marginBottom: "20px" }}>
                <label>
                    Query di Lettura:
                    <input
                        type="text"
                        value={readQuery}
                        onChange={(e) => setReadQuery(e.target.value)}
                        style={{ marginLeft: "10px", width: "300px" }}
                    />
                </label>
                <button onClick={() => handleQuery("readquery", readQuery)} style={{ marginLeft: "10px" }}>
                    Invia
                </button>
            </div>
            <div style={{ marginBottom: "20px" }}>
                <label>
                    Query di Scrittura:
                    <input
                        type="text"
                        value={writeQuery}
                        onChange={(e) => setWriteQuery(e.target.value)}
                        style={{ marginLeft: "10px", width: "300px" }}
                    />
                </label>
                
                <button onClick={() => handleQuery("writequery", writeQuery)} style={{ marginLeft: "10px" }}>
                    Invia
                </button>
            </div>
            
            <div>
                <h2>Responso:</h2>
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
            {columns.length > 0 && (
                <div>
                    <h2>Tabella Risultati:</h2>
                    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
                        <thead>
                            <tr>
                                {columns.map((col, index) => (
                                    <th key={index} style={{ border: "1px solid black", padding: "8px", background: "#ddd" }}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} style={{ border: "1px solid black", padding: "8px" }}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
      </div>
    );
}

export default MyApp;
