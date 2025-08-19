import tkinter as tk
import sqlite3

def abrir():
    win = tk.Toplevel()
    win.title("Relatório de Estoque")
    win.geometry("500x400")
    txt = tk.Text(win)
    txt.pack(fill='both', expand=True)
    conn = sqlite3.connect('sistema.db')
    c = conn.cursor()
    c.execute("SELECT * FROM produtos")
    produtos = c.fetchall()
    txt.insert(tk.END, "ID | Nome | Código | Quantidade\n")
    txt.insert(tk.END, "-"*40 + "\n")
    for p in produtos:
        txt.insert(tk.END, f"{p[0]} | {p[1]} | {p[2]} | {p[3]}\n")
    conn.close()