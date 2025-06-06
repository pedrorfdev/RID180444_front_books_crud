import { useState } from "react";
import { LivrosService } from "../../api/LivrosService";
import Header from "../../components/Header/Header";
import SubmenuLivros from "../../components/SubmenuLivros/SubmenuLivros";
import "./index.scss";

const LivrosCadastro = () => {
  const [livro, setLivro] = useState({
    titulo: "",
    num_paginas: 0,
    isbn: "",
    editora: "",
  });

  async function createLivro() {
    const body = {
      title: livro.titulo,
      total_pages: Number(livro.num_paginas),
      isbn_code: livro.isbn,
      publisher: livro.editora,
    };
    if (
      livro.titulo != undefined &&
      livro.titulo != "" &&
      livro.num_paginas != undefined &&
      livro.num_paginas != "" &&
      livro.isbn != undefined &&
      livro.isbn != "" &&
      livro.editora != undefined &&
      livro.editora != ""
    ) {
      await LivrosService.createLivro(body)
        .then((response) => {
          alert(JSON.stringify(response.data));
          document.getElementById("formulario").reset();
        })
        .catch(({ response: { data, status } }) => {
          alert(`${status} - ${data}`);
        });
    }
  }

  return (
    <>
      <Header />
      <SubmenuLivros />
      <div className="livrosCadastro">
        <h1>Cadastro de Livros</h1>
        <div>
          <form id="formulario">
            <div className="form-group">
              <label>Titulo</label>
              <input
                type="text"
                id="titulo"
                required
                onChange={(event) => {
                  setLivro({ ...livro, titulo: event.target.value });
                }}
              ></input>
            </div>
            <div className="form-group">
              <label>Número de Páginas</label>
              <input
                type="text"
                id="num"
                required
                onChange={(event) => {
                  setLivro({ ...livro, num_paginas: event.target.value });
                }}
              ></input>
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                id="isbn"
                required
                onChange={(event) => {
                  setLivro({ ...livro, isbn: event.target.value });
                }}
              ></input>
            </div>
            <div className="form-group">
              <label>Editora</label>
              <input
                type="text"
                id="editora"
                required
                onChange={(event) => {
                  setLivro({ ...livro, editora: event.target.value });
                }}
              ></input>
            </div>
            <div className="form-group">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  createLivro();
                }}
              >
                Cadastrar Livro
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LivrosCadastro;
