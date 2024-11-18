from flask import Flask, jsonify, request
import psycopg2
import sys

# Dettagli Connessione
host = "localhost"
port = "5432"
dbname = "accademia"
user = "postgres"
password = "postgres"

# Connessione al database
def connect_db(host, port, dbname, user, password):
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
    # Creo un cursore
    cursor = connection.cursor()

    print(query)
    # Esegui una query
    cursor.execute(query)

    # Recupera i risultati
    rows = cursor.fetchall()
    for row in rows:
        print(row)
    
    if cursor is not None:
        cursor.close()


def query_multiline() -> str:
    query = ""

    while ";" not in query:
        query += input() + " "
    
    return query


# Menu prompt
def menu(queries_in = []) -> str:
    queries = queries_in[:]
    queries.append("SELECT * FROM Persona;")
    queries.append("SELECT * FROM Progetto;")
    queries.append("SELECT * FROM Assenza WHERE tipo = 'Malattia'")
    queries.append("Query personalizzata")
    queries.append("Chiudi")
    
    print("\nLista query")
    for i in range(0,len(queries)):
        print(i+1,") ", queries[i])
    
    try:
        sel = int(input("Seleziona query: "))
    except Exception:
        print("Inserisci un numero!")
        return ""
    
    if not (sel >= 1 and sel <= len(queries)):
        print("Inserisci numero valido!")
        return ""

    if sel == len(queries) - 1:
        print("Query personalizzata: ")
        return query_multiline()
    
    return queries[sel-1]




# Main
flag = True

connection = connect_db(host, port, dbname, user, password)

if connection == None:
    flag = False

while flag:
    query = menu(["SELECT * FROM WP","SELECT * FROM AttivitaProgetto"])
    
    if query == "Chiudi":
        connection.close()
        flag = False
        continue
    
    if query == "":
        continue


    try:
        read_db(connection, query)

    except Exception as e:
        print(f"\nErrore: {e}")
        print("Riavvio DB")

        connection.close()

        connection = connect_db(host, port, dbname, user, password)
        if connection == None:
            flag = False





#api = Flask(__name__)

