from flask import Flask, jsonify, request
from flask_cors import CORS
import sys

import dbclient as db



api = Flask(__name__)
CORS(api)


cur = db.connect()
if cur is None:
    print("Errore connessione al DB")
    sys.exit()


# Views
def execReadQuery(jsonReq, cur):
    query = jsonReq.get('query')
    print(jsonReq.get('query'))
    iNumRows = db.read_in_db(cur, query)
    sResult = dict()
    sResult["numRows"] = str(iNumRows)
    sResult["columns"] = []
    sResult["rows"] = []

    if iNumRows == -1:
        return sResult, -1
    
    column_names = [description[0] for description in cur.description]
    sResult["columns"] = column_names
    

    for i in range(iNumRows):
        sResult["rows"].append(list(db.read_next_row(cur)[1]))

    return sResult, 0


def execWriteQuery(jsonReq, cur):
    query = jsonReq.get('query')
    print(jsonReq.get('query'))
    err = db.write_in_db(cur, query)

    return err




@api.route('/readquery', methods=['POST'])
def readQuery():
    global cur 
    if cur is None:
        print("Errore connessione al DB")
        return jsonify({"Esito": "003", "Msg": "Errore connessione al DB"}), 400
        sys.exit()

        
    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        jsonReq = request.json
        res, err = execReadQuery(jsonReq, cur)
        
        if err == -1:
            return jsonify({"Esito": "001", "Msg": "Query non valida"}), 400
        
        else:
            print(res)
            return jsonify({"Esito": "000", "Msg": "Query eseguita con successo", 
                            "queryResult": res}), 200
        
    else:
        return jsonify({"Esito": "002", "Msg": "Formato richiesta errato"}), 400
        
        
@api.route('/writequery', methods=['POST'])
def writeQuery():
    global cur
    if cur is None:
        print("Errore connessione al DB")
        return jsonify({"Esito": "003", "Msg": "Errore connessione al DB"}), 400
        sys.exit()

    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        jsonReq = request.json
        err = execWriteQuery(jsonReq, cur)

        if err == -1:
            return jsonify({"Esito": "001", "Msg": "Query non valida"}), 400
        
        elif err == -2:
            return jsonify({"Esito": "002", "Msg": "Duplicate key value"}), 400
        
        else:
            return jsonify({"Esito": "000", "Msg": "Query eseguita con successo", 
                            "queryResult": "query committata"}), 200

# /Views

api.run(host="127.0.0.1", port=8080)