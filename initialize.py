import sqlite3

conn = sqlite3.connect('database.db')
print "Opened database successfully"

conn.execute('CREATE TABLE original (sentences TEXT)')
conn.execute('CREATE TABLE translations(sentences TEXT, original_id NUMBER)')
print "Table created successfully"
conn.close()