"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemAcervo = void 0;
const erros_1 = require("./erros");
const MS_POR_DIA = 1000 * 60 * 60 * 24;
class ItemAcervo {
    _titulo;
    _anoPublicacao;
    static _contadorId = 0;
    id = ++ItemAcervo._contadorId;
    _emprestadoEm = null;
    constructor(_titulo, _anoPublicacao) {
        this._titulo = _titulo;
        this._anoPublicacao = _anoPublicacao;
    }
    get titulo() {
        return this._titulo;
    }
    get anoPublicacao() {
        return this._anoPublicacao;
    }
    get statusDisponibilidade() {
        return this._emprestadoEm === null ? "Disponível" : "Emprestado";
    }
    get diasEmprestado() {
        if (this._emprestadoEm === null) {
            return 0;
        }
        return Math.floor((Date.now() - this._emprestadoEm.getTime()) / MS_POR_DIA);
    }
    emprestar() {
        if (this._emprestadoEm !== null) {
            throw new erros_1.ItemIndisponivelError(`"${this._titulo}" já está emprestado.`);
        }
        this._emprestadoEm = new Date();
    }
    devolver() {
        if (this._emprestadoEm === null) {
            throw new erros_1.ItemIndisponivelError(`"${this._titulo}" não está emprestado.`);
        }
        this._emprestadoEm = null;
    }
}
exports.ItemAcervo = ItemAcervo;
