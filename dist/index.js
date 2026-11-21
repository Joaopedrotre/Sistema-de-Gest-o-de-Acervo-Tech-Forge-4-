"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Livro_1 = require("./Livro");
const JogoEletronico_1 = require("./JogoEletronico");
const RepositorioMemoria_1 = require("./RepositorioMemoria");
const erros_1 = require("./erros");
function resumir(item) {
    return { id: item.id, titulo: item.titulo, statusDisponibilidade: item.statusDisponibilidade };
}
function filtrar(itens, filtro) {
    return itens.filter((i) => (filtro.titulo === undefined || i.titulo === filtro.titulo) &&
        (filtro.anoPublicacao === undefined || i.anoPublicacao === filtro.anoPublicacao));
}
function executar(descricao, acao) {
    try {
        acao();
    }
    catch (erro) {
        if (erro instanceof erros_1.ErroAcervo) {
            console.log(`[${erro.name}] ${descricao}: ${erro.message}`);
        }
        else {
            throw erro;
        }
    }
}
const acervo = new RepositorioMemoria_1.RepositorioMemoria();
acervo.adicionar(new Livro_1.Livro("Dom Casmurro", 1899, "Machado de Assis"));
acervo.adicionar(new Livro_1.Livro("O Hobbit", 1937, "J. R. R. Tolkien"));
acervo.adicionar(new JogoEletronico_1.JogoEletronico("Zelda: Breath of the Wild", 2017, "Nintendo Switch"));
console.log("== Acervo ==");
acervo.listar().forEach((item) => console.log(resumir(item)));
console.log("\n== Empréstimos ==");
const livro = acervo.buscarPorId(1);
const jogo = acervo.buscarPorId(3);
livro.emprestar();
console.log(`${livro.titulo}: ${livro.statusDisponibilidade} (${livro.diasEmprestado} dia(s))`);
executar("emprestar novamente", () => livro.emprestar());
livro.devolver();
executar("devolver sem empréstimo", () => livro.devolver());
console.log("\n== Reservas ==");
if (livro instanceof Livro_1.Livro) {
    livro.reservar("Ana");
    console.log(`${livro.titulo} reservado: ${livro.estaReservado}`);
    executar("reservar duas vezes", () => livro.reservar("Bruno"));
    livro.cancelarReserva();
    console.log(`${livro.titulo} reservado: ${livro.estaReservado}`);
}
console.log("\n== Multas (3 dias de atraso) ==");
acervo.listar().forEach((item) => {
    console.log(`${item.titulo}: R$ ${item.calcularMulta(3).toFixed(2)}`);
});
console.log("\n== Busca e exceções do repositório ==");
console.log(filtrar(acervo.listar(), { anoPublicacao: 1937 }).map(resumir));
executar("buscar id inexistente", () => acervo.buscarPorId(99));
executar("remover id inexistente", () => acervo.remover(99));
acervo.remover(jogo.id);
console.log(`Itens restantes: ${acervo.listar().length}`);
