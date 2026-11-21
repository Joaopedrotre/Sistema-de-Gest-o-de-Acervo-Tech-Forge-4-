"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioMemoria = void 0;
const erros_1 = require("./erros");
class RepositorioMemoria {
    _itens = [];
    adicionar(item) {
        this._itens.push(item);
    }
    buscarPorId(id) {
        const item = this._itens.find((i) => i.id === id);
        if (item === undefined) {
            throw new erros_1.ItemNaoEncontradoError(`Item com id ${id} não encontrado.`);
        }
        return item;
    }
    remover(id) {
        const indice = this._itens.findIndex((i) => i.id === id);
        if (indice === -1) {
            throw new erros_1.ItemNaoEncontradoError(`Item com id ${id} não encontrado.`);
        }
        this._itens.splice(indice, 1);
    }
    listar() {
        return [...this._itens];
    }
}
exports.RepositorioMemoria = RepositorioMemoria;
