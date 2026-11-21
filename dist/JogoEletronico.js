"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JogoEletronico = void 0;
const ItemAcervo_1 = require("./ItemAcervo");
class JogoEletronico extends ItemAcervo_1.ItemAcervo {
    _plataforma;
    constructor(titulo, anoPublicacao, _plataforma) {
        super(titulo, anoPublicacao);
        this._plataforma = _plataforma;
    }
    get plataforma() {
        return this._plataforma;
    }
    calcularMulta(diasAtraso) {
        return diasAtraso * 2 + 5;
    }
}
exports.JogoEletronico = JogoEletronico;
