const form = document.getElementById('artigo')
const token = sessionStorage.getItem("token");


fetch('https://backend-trabalho-faculdade.herokuapp.com/getVideos', {
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
        if (data.videos.length) {
            data.videos.map((video) => {
                document.getElementById("videosGroup").innerHTML += `<div class="col">
                <span class="card" style="width: 18rem; margin-bottom: 15px; margin-right: 15px;">
                    <img src="img/sem_img.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${video.titulo}</h5>
                        <p class="card-text">${video.descricao}</p>
                        <button onclick="editVideo('${video._id}')" class="btn btn-primary">Editar</button>
                        <button onclick="confirmDelVideo('${video._id}')" class="btn btn-danger mb1 bg-red">Excluir</button>
                    </div>
                </span>
            </div>`;
            })
        } else {
            document.getElementById("videosGroup").innerHTML +=
                `<div>
            <h5>Nenhum vídeo cadastrado</h5>
            </div>`;
        }
    }).catch((error) => {
    });

function confirmDelVideo(id) {
    document.getElementById("modal-content").innerHTML += `<div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Atenção</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
            <p>Tem certeza que deseja excluir este vídeo?</p>
            </div>
            <div class="modal-footer">
                <button type="button" id="confirm-button" class="btn btn-primary">Excluir</button>

                    <button type="button" id="cancel-button" class="btn btn-secondary"
                    data-dismiss="modal">Cancelar</button>
            </div>`;

    $('#myModalVideo').modal('show')

    $('#cancel-button').on('click', function () {
        $('#mmyModalVideo').modal('hide');
        document.getElementById("modal-content").replaceChildren();
    });

    $('#confirm-button').on('click', function () {
        delVideo(id)
    });
}
function delVideo(id) {

    const url = `https://backend-trabalho-faculdade.herokuapp.com/deleteVideo/${id}`;

    const other_params = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "authorization": token
        }
    };

    fetch(url, other_params)
        .then((response) => {
            if (response.ok) {
                return response;
            } else {
                throw new Error("Could not reach the API: " + response.statusText);
            }
        }).then(() => {
            location.reload()
        }).catch((error) => {
            console.log('entrou no catch', error)
        });
}

function editVideo(id) {

    var params = new URLSearchParams();
    params.append("id", id);

    var url = "alterar_videos.html?" + params.toString();
    location.href = url;
}