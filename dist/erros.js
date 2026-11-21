"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaInvalidaError = exports.ItemNaoEncontradoError = exports.ItemIndisponivelError = exports.ErroAcervo = void 0;
class ErroAcervo extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = new.target.name;
    }
}
exports.ErroAcervo = ErroAcervo;
class ItemIndisponivelError extends ErroAcervo {
}
exports.ItemIndisponivelError = ItemIndisponivelError;
class ItemNaoEncontradoError extends ErroAcervo {
}
exports.ItemNaoEncontradoError = ItemNaoEncontradoError;
class ReservaInvalidaError extends ErroAcervo {
}
exports.ReservaInvalidaError = ReservaInvalidaError;
