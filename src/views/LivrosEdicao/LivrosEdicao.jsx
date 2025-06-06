import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LivrosService } from "../../api/LivrosService";
import Header from "../../components/Header/Header";
import SubmenuLivros from "../../components/SubmenuLivros/SubmenuLivros";
import "./index.scss";

const LivrosEdicao = () => {
  let { livroId } = useParams();

  const [livro, setLivro] = useState({});

  async function getLivro() {
    const { data } = await LivrosService.getLivro(livroId);
    setLivro(data);
  }

  async function editLivro() {
    const body = {
      title: livro.title,
      total_pages: Number(livro.total_pages),
      isbn_code: livro.isbn_code,
      publisher: livro.publisher,
    };
    if (
      livro.id != undefined &&
      livro.id != "" &&
      livro.title != undefined &&
      livro.title != "" &&
      livro.total_pages != undefined &&
      livro.total_pages != "" &&
      livro.isbn_code != undefined &&
      livro.isbn_code != "" &&
      livro.publisher != undefined &&
      livro.publisher != ""
    ) {
      await LivrosService.updateLivro(Number(livro.id), body)
        .then(({ data }) => {
          alert(JSON.stringify(data));
        })
        .catch(({ response: { data, status } }) => {
          alert(`${status} - ${data}`);
        });
    }
  }

  useEffect(() => {
    getLivro();
  }, []);

  return (
    <>
      <Header />
      <SubmenuLivros />
      <div className="livrosCadastro">
        <h1>Edição de Livros</h1>
        <div>
          <form id="formulario">
            <div className="form-group">
              <label>Id</label>
              <input
                type="text"
                disabled
                required
                onChange={(event) => {
                  setLivro({ ...livro, id: event.target.value });
                }}
                value={livro.id || ""}
              ></input>
            </div>
            <div className="form-group">
              <label>Titulo</label>
              <input
                type="text"
                required
                onChange={(event) => {
                  setLivro({ ...livro, title: event.target.value });
                }}
                value={livro.title || ""}
              ></input>
            </div>
            <div className="form-group">
              <label>Número de Páginas</label>
              <input
                type="text"
                required
                onChange={(event) => {
                  setLivro({ ...livro, total_pages: event.target.value });
                }}
                value={livro.total_pages || ""}
              ></input>
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                required
                onChange={(event) => {
                  setLivro({ ...livro, isbn_code: event.target.value });
                }}
                value={livro.isbn_code || ""}
              ></input>
            </div>
            <div className="form-group">
              <label>Editora</label>
              <input
                type="text"
                required
                onChange={(event) => {
                  setLivro({ ...livro, publisher: event.target.value });
                }}
                value={livro.publisher || ""}
              ></input>
            </div>
            <div className="form-group">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  editLivro();
                }}
              >
                Atualizar Livro
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LivrosEdicao;
