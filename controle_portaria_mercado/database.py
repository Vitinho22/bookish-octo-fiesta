import sqlite3

def criar_db():
    conn = sqlite3.connect('sistema.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY,
            usuario TEXT,
            senha TEXT
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY,
            nome TEXT,
            codigo TEXT,
            quantidade INTEGER
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS movimentacoes (
            id INTEGER PRIMARY KEY,
            produto_id INTEGER,
            tipo TEXT,
            quantidade INTEGER,
            data TEXT
        )
    ''')
    # Usuário padrão
    c.execute("INSERT OR IGNORE INTO usuarios (id, usuario, senha) VALUES (1, 'admin', 'admin')")
    conn.commit()
    conn.close()

def check_login(usuario, senha):
    conn = sqlite3.connect('sistema.db')
    c = conn.cursor()
    c.execute("SELECT * FROM usuarios WHERE usuario=? AND senha=?", (usuario, senha))
    result = c.fetchone()
    conn.close()
    return result is not None