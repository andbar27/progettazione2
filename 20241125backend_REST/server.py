from flask import Flask, jsonify, request
import psycopg2

# Dettagli Connessione
host = "0.0.0.0"
port = "5432"
dbname = "accademia"
user = "postgres"
password = "postgres"

# Connessione al database
def connect_db(host, port, dbname, user, password):
    connection = None
    try:
        connection = psycopg2.connect(
            host = host,
            port = port,
            dbname = dbname,
            user = user,
            password = password
        )
        print("Connessione avvenuta con successo")
        return connection

    except Exception as e:
        print(f"Errore durante la connessione al db: {e}")
        return None


# Leggi dal db
def read_db(connection, query):
    cursor = None
    try:
        # Crea un cursore
        cursor = connection.cursor()

        print(query)
        # Esegue una query
        cursor.execute(query)

        # Recupera i risultati
        rows = cursor.fetchall()
        return rows
        
    except Exception as e:
        raise e
    
    finally:
        if cursor:
            cursor.close()



def restart_db():
    global connection
    if connection:
        connection.close()
    connection = connect_db(host, port, dbname, user, password)
    


# Main

connection = connect_db(host, port, dbname, user, password)


app = Flask(__name__)





@app.route('/api/persone')
def persone():
    global connection
    try:
        retQuery = read_db(connection, "SELECT * FROM Persona;")
    
    except Exception as e:
        restart_db()
        return jsonify({"erroreLetturaDb": str(e)})
    
    if retQuery:
        return jsonify({"risultatoQuery": retQuery})
    
    return jsonify({"errore": "nessun risultato", "risultatoQuery": retQuery}), 404
    





@app.route('/api/progetti')
def progetti():
    global connection
    try:
        retQuery = read_db(connection, "SELECT * FROM Progetto;")
    
    except Exception as e:
        restart_db()
        return jsonify({"erroreLetturaDb": str(e)})
    
    if retQuery:
        return jsonify({"risultatoQuery": retQuery})
    
    return jsonify({"errore": "nessun risultato", "risultatoQuery": retQuery}), 404
    





@app.route('/api/assenzemalattia')
def assenzemalattia():
    global connection
    try:
        retQuery = read_db(connection, "SELECT * FROM Assenza WHERE tipo = 'Malattia';")
    
    except Exception as e:
        restart_db()
        return jsonify({"erroreLetturaDb": str(e)})
    

    if retQuery:
        return jsonify({"risultatoQuery": retQuery})
    
    return jsonify({"errore": "nessun risultato", "risultatoQuery": retQuery}), 404
    






@app.route('/api/myquery', methods=['POST'])
def myquery():

    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        if request.method == 'POST':
            jsonReq = request.json
            query = str(jsonReq.get('query'))
            print(query)
        else:
            return jsonify({"errore": "Metodo richiesta errato, usa POST"})
    else:
        return jsonify({"errore": "Formato richiesta non valido"}), 400



    global connection
    try:
        retQuery = read_db(connection, query)
    
    except Exception as e:
        restart_db()
        return jsonify({"erroreLetturaDb": str(e)}), 500

    if retQuery:
        return jsonify({"risultatoQuery": retQuery})
    
    return jsonify({"errore": "nessun risultato", "risultatoQuery": retQuery}), 404
        



@app.route('/api/chiudiconnessione')
def chiudiconnessione():
    global connection
    if connection:
        connection.close()
        connection = None
        return jsonify({"msg": "connessione chiusa"})
    
    return jsonify({"msg": "connessione già chiusa"})



@app.route('/api/apriconnessione')
def apriconnessione():
    global connection
    if connection:
        connection.close()
        connection = connect_db(host, port, dbname, user, password)
        return jsonify({"msg": "connessione già presente, riavviata"})

    connection = connect_db(host, port, dbname, user, password)
    return jsonify({"msg": "connessione avviata"})




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)