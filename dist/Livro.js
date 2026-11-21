"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
const ItemAcervo_1 = require("./ItemAcervo");
const erros_1 = require("./erros");
class Livro extends ItemAcervo_1.ItemAcervo {
    _autor;
    _reservadoPor = null;
    constructor(titulo, anoPublicacao, _autor) {
        super(titulo, anoPublicacao);
        this._autor = _autor;
    }
    get autor() {
        return this._autor;
    }
    get estaReservado() {
        return this._reservadoPor !== null;
    }
    reservar(nomeUsuario) {
        if (this._reservadoPor !== null) {
            throw new erros_1.ReservaInvalidaError(`"${this.titulo}" já está reservado por ${this._reservadoPor}.`);
        }
        this._reservadoPor = nomeUsuario;
    }
    cancelarReserva() {
        if (this._reservadoPor === null) {
            throw new erros_1.ReservaInvalidaError(`"${this.titulo}" não possui reserva.`);
        }
        this._reservadoPor = null;
    }
    calcularMulta(diasAtraso) {
        return diasAtraso * 0.5;
    }
}
exports.Livro = Livro;
