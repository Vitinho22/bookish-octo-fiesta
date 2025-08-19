import tkinter as tk
from tkinter import messagebox
import database
import produtos
import estoque
import relatorios

class Application(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Sistema de Portaria e Mercado")
        self.geometry("600x400")
        self.show_login()

    def show_login(self):
        self.login_frame = tk.Frame(self)
        self.login_frame.pack(pady=80)
        tk.Label(self.login_frame, text="Usuário:").grid(row=0, column=0)
        self.entry_user = tk.Entry(self.login_frame)
        self.entry_user.grid(row=0, column=1)
        tk.Label(self.login_frame, text="Senha:").grid(row=1, column=0)
        self.entry_pass = tk.Entry(self.login_frame, show="*")
        self.entry_pass.grid(row=1, column=1)
        tk.Button(self.login_frame, text="Entrar", command=self.login).grid(row=2, column=0, columnspan=2, pady=10)

    def login(self):
        user = self.entry_user.get()
        pw = self.entry_pass.get()
        if database.check_login(user, pw):
            self.login_frame.destroy()
            self.show_menu()
        else:
            messagebox.showerror("Erro", "Usuário ou senha inválidos!")

    def show_menu(self):
        menu = tk.Menu(self)
        self.config(menu=menu)
        menu.add_command(label="Produtos", command=produtos.abrir)
        menu.add_command(label="Estoque", command=estoque.abrir)
        menu.add_command(label="Relatórios", command=relatorios.abrir)
        menu.add_command(label="Sair", command=self.destroy)
        tk.Label(self, text="Bem-vindo ao sistema!", font=('Arial', 16)).pack(pady=150)

if __name__ == "__main__":
    database.criar_db()
    app = Application()
    app.mainloop()