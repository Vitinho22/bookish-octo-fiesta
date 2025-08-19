import tkinter as tk
from tkinter import messagebox
import sqlite3

def abrir():
    win = tk.Toplevel()
    win.title("Cadastro de Produtos")
    win.geometry("400x300")
    tk.Label(win, text="Nome do Produto:").pack()
    entry_nome = tk.Entry(win)
    entry_nome.pack()
    tk.Label(win, text="Código:").pack()
    entry_cod = tk.Entry(win)
    entry_cod.pack()
    tk.Label(win, text="Quantidade:").pack()
    entry_qty = tk.Entry(win)
    entry_qty.pack()
    def salvar():
        nome = entry_nome.get()
        codigo = entry_cod.get()
        qtd = entry_qty.get()
        conn = sqlite3.connect('sistema.db')
        c = conn.cursor()
        c.execute("INSERT INTO produtos (nome, codigo, quantidade) VALUES (?, ?, ?)", (nome, codigo, qtd))
        conn.commit()
        conn.close()
        messagebox.showinfo("Salvo", "Produto cadastrado!")
        entry_nome.delete(0, tk.END)
        entry_cod.delete(0, tk.END)
        entry_qty.delete(0, tk.END)
    tk.Button(win, text="Salvar Produto", command=salvar).pack(pady=10)