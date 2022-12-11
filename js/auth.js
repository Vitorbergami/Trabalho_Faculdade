const token = sessionStorage.getItem("token");

$(function () {
    fetch(`http://localhost:3000/auth`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "authorization": token
        }
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Could not reach the API: " + response.statusText);
            }
        }).then((data) => {
        }).catch((error) => {
            document.getElementById("modal-auth-content").innerHTML += `<div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Atenção</h5>
        </div>
        <div class="modal-body">
        <p>Token de verificação negado ou expirado.</p>
        </div>
        <div class="modal-footer">
            <button type="button" id="confirm-button" class="btn btn-primary">Ok</button>
        </div>`;

            $('#myModal').modal('show')

            $('#confirm-button').on('click', function () {
                sessionStorage.setItem("token", null);
                window.location.replace('login.html');
            });
        });
});