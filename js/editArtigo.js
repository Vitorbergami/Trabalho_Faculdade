const form = document.getElementById('artigo')
const token = sessionStorage.getItem("token");

let params = new URLSearchParams(window.location.search);
const id = params.get("id");


$(function () {
    fetch(`http://localhost:3000/getAnexo/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Could not reach the API: " + response.statusText);
            }
        }).then((data) => {
            console.log('data: ', data)
            if (data.anexo) {
                document.getElementById("artigo").innerHTML += `<div class="form-group">
                <label for="anexo">Link</label>
                <input type="text" name="anexo" class="form-control" id="anexo" value="${data.anexo.anexo}"
                    placeholder="Digite o link" required="required">
            </div>
            <div class="form-group">
                <label for="titulo">Título</label>
                <input type="text" name="titulo" class="form-control" id="titulo"
                value="${data.anexo.titulo}" placeholder="Digite o título" required="required">
            </div>
            <div class="form-group">
                <label for="descricao">Descrição</label>
                <textarea id="descricao" name="descricao" rows="3" class="form-control"
                value="${data.anexo.descricao}"  placeholder="Descrição"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Salvar</button>`;
            } else {
                document.getElementById("artigo").innerHTML += `<div class="form-group">
                <label for="anexo">Link</label>
                <input type="text" name="anexo" class="form-control" id="anexo" value=""
                    placeholder="Digite o link" required="required">
            </div>
            <div class="form-group">
                <label for="titulo">Título</label>
                <input type="text" name="titulo" class="form-control" id="titulo"
                    value="" placeholder="Digite o título" required="required">
            </div>
            <div class="form-group">
                <label for="descricao">Descrição</label>
                <textarea id="descricao" name="descricao" rows="3" class="form-control"
                    placeholder="Descrição"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Salvar</button>`;
            }
        }).catch((error) => {
        });
});

form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form)

    //const url = "https://backend-trab-faculdade.vercel.app/login";
    const url = `http://localhost:3000/editAnexo/${id}`;

    const data = Object.fromEntries(formData)

    const other_params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "authorization": token
        },
        body: JSON.stringify(data),
    };

    fetch(url, other_params)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Could not reach the API: " + response.statusText);
            }
        }).then(() => {
            document.getElementById("modal-content").innerHTML += `<div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Artigo editado com sucesso</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
        <p>Voltando para visualização dos artigos.</p>
        </div>
        <div class="modal-footer">
            <button type="button" id="confirm-button" class="btn btn-primary"
                data-dismiss="modal">Ok</button>
        </div>`;

            $('#myModal').modal('show')

            $('#confirm-button').on('click', function () {
                window.location.replace('artigos.html');
            });
        }).catch((error) => {
            document.getElementById("modal-content").innerHTML += `<div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Atenção</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
        <p>Provavelmente o artigo em questão já foi cadastrado anteriormente. Caso não tenha sido contate o Administrador</p>
        </div>
        <div class="modal-footer">
            <button type="button" id="confirm-button" class="btn btn-primary"
                data-dismiss="modal">Ok</button>
        </div>`;

            $('#myModal').modal('show')

            $('#confirm-button').on('click', function () {
                window.location.replace('artigos.html');
            });
        });
})