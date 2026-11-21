import { ItemAcervo } from "./ItemAcervo";
import { Livro } from "./Livro";
import { JogoEletronico } from "./JogoEletronico";
import { RepositorioMemoria } from "./RepositorioMemoria";
import { ErroAcervo } from "./erros";

type ResumoItem = Readonly<Pick<ItemAcervo, "id" | "titulo" | "statusDisponibilidade">>;
type FiltroItem = Partial<Pick<ItemAcervo, "titulo" | "anoPublicacao">>;

function resumir(item: ItemAcervo): ResumoItem {
  return { id: item.id, titulo: item.titulo, statusDisponibilidade: item.statusDisponibilidade };
}

function filtrar(itens: readonly ItemAcervo[], filtro: FiltroItem): ItemAcervo[] {
  return itens.filter(
    (i) =>
      (filtro.titulo === undefined || i.titulo === filtro.titulo) &&
      (filtro.anoPublicacao === undefined || i.anoPublicacao === filtro.anoPublicacao)
  );
}

function executar(descricao: string, acao: () => void): void {
  try {
    acao();
  } catch (erro) {
    if (erro instanceof ErroAcervo) {
      console.log(`[${erro.name}] ${descricao}: ${erro.message}`);
    } else {
      throw erro;
    }
  }
}

const acervo = new RepositorioMemoria<ItemAcervo>();
acervo.adicionar(new Livro("Dom Casmurro", 1899, "Machado de Assis"));
acervo.adicionar(new Livro("O Hobbit", 1937, "J. R. R. Tolkien"));
acervo.adicionar(new JogoEletronico("Zelda: Breath of the Wild", 2017, "Nintendo Switch"));

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
if (livro instanceof Livro) {
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
