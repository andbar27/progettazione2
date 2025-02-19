from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
import sys

import configparser

# Legge il file di configurazione
config = configparser.ConfigParser()
config.read("database.ini")

# Estrai i parametri dal file
db_params = config["postgresql"]

# Tento connessione
try:
    db = psycopg2.connect(
        host=db_params["host"],
        port=db_params["port"],
        database=db_params["database"],
        user=db_params["user"],
        password=db_params["password"]
    )
    
    print("Connessione avvenuta con successo!")

except Exception as e:
    print("Errore connessione: ", e)
    sys.exit()
# 


# Lancio Flask
api = Flask(__name__)
CORS(api)



cur = db.cursor()
if cur is None:
    print("Errore connessione al DB")
    sys.exit()


# Views
def execReadQuery(jsonReq):
    cur = db.cursor()
    if cur is None:
        print("Errore connessione al DB")
        return {"Esito": "003", "Msg": "Errore connessione db", 
                            "queryResult": None}, -1

    query = jsonReq.get('query')
    print(jsonReq.get('query'))

    iNumRows = -1
    try: 
        cur.execute(query)
        iNumRows = cur.rowcount
    except Exception as e:
        if db is not None:
            db.reset()
        return {"Esito": "001", "Msg": f"Query non valida {e}", 
                            "queryResult": None}, -1
    

    sResult = dict()
    sResult["numRows"] = str(iNumRows)
    sResult["columns"] = []
    sResult["rows"] = []


    if iNumRows == -1:
        cur.close()
        return {"Esito": "001", "Msg": "Query non valida", 
                            "queryResult": None}, -1
        #return sResult, -1
    
    column_names = [description[0] for description in cur.description]
    sResult["columns"] = column_names
    
    for row in cur.fetchall():
        sResult["rows"].append(row)

    cur.close()
    return {"Esito": "000", "Msg": "Query eseguita con successo", 
                            "queryResult": sResult}, 0


def execWriteQuery(jsonReq):
    global db
    cur = db.cursor()
    if cur is None:
        return None, -3
    query = jsonReq.get('query')
    print(jsonReq.get('query'))
    try:
        err = cur.execute(query)
    except psycopg2.errors.UniqueViolation as e:
        db.reset()
        return e, -2
    except Exception as error:
        db.reset()
        return error, -1
    finally:
        cur.close()

    return err, 0




@api.route('/readquery', methods=['POST'])
def readQuery():
    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        jsonReq = request.json
        res, err = execReadQuery(jsonReq)
        
        if err == -1:
            return jsonify(res), 400
        else:
            print(res)
            return jsonify(res), 200
        
    else:
        return jsonify({"Esito": "002", "Msg": "Formato richiesta errato", "queryResult": None}), 400
        
        
@api.route('/writequery', methods=['POST'])
def writeQuery():
    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        jsonReq = request.json
        val, err = execWriteQuery(jsonReq)

        if err == -1:
            return jsonify({"Esito": "001", "Msg": f"Query non valida: {val}", 
                            "queryResult": None}), 400
        
        elif err == -2:
            return jsonify({"Esito": "002", "Msg": f"Duplicate key value: {val}", 
                            "queryResult": None}), 400
        elif err == -3:
            return jsonify({"Esito": "003", "Msg": f"Errore connessione db: {val}", 
                            "queryResult": None}), 400
        else:
            return jsonify({"Esito": "000", "Msg": "Query eseguita con successo", 
                            "queryResult": val}), 200

# /Views

api.run(host="127.0.0.1", port=8080)