import tkinter as tk
from tkinter import messagebox
import sqlite3
from datetime import datetime

def abrir():
    win = tk.Toplevel()
    win.title("Movimentação de Estoque")
    win.geometry("400x350")
    tk.Label(win, text="ID do Produto:").pack()
    entry_id = tk.Entry(win)
    entry_id.pack()
    tk.Label(win, text="Tipo (entrada/saida):").pack()
    entry_tipo = tk.Entry(win)
    entry_tipo.pack()
    tk.Label(win, text="Quantidade:").pack()
    entry_qty = tk.Entry(win)
    entry_qty.pack()
    def movimentar():
        pid = entry_id.get()
        tipo = entry_tipo.get().lower()
        qtd = int(entry_qty.get())
        conn = sqlite3.connect('sistema.db')
        c = conn.cursor()
        if tipo not in ("entrada", "saida"):
            messagebox.showerror("Erro", "Tipo deve ser 'entrada' ou 'saida'")
            return
        if tipo == "saida":
            c.execute("SELECT quantidade FROM produtos WHERE id=?", (pid,))
            atual = c.fetchone()
            if not atual or atual[0] < qtd:
                messagebox.showerror("Erro", "Quantidade insuficiente!")
                return
            c.execute("UPDATE produtos SET quantidade = quantidade - ? WHERE id=?", (qtd, pid))
        else:
            c.execute("UPDATE produtos SET quantidade = quantidade + ? WHERE id=?", (qtd, pid))
        c.execute("INSERT INTO movimentacoes (produto_id, tipo, quantidade, data) VALUES (?, ?, ?, ?)",
                  (pid, tipo, qtd, datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
        conn.commit()
        conn.close()
        messagebox.showinfo("Movimentação", "Movimentação registrada!")
        entry_id.delete(0, tk.END)
        entry_tipo.delete(0, tk.END)
        entry_qty.delete(0, tk.END)
    tk.Button(win, text="Registrar Movimentação", command=movimentar).pack(pady=10)