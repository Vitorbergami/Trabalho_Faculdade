const form = document.querySelector('.user')

form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form)

    //const url = "https://backend-trab-faculdade.vercel.app/login";
    const url = "http://localhost:3000/login";

    const data = Object.fromEntries(formData)

    const other_params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
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
        }).then((data) => {
            if (data.token) {
                sessionStorage.setItem("token", data.token);
                window.location.replace('index.html');
            } else {
                alert("Usuário ou senha inválidos")
                console.log('entreou aqui')
            }
        }).catch((error) => {
            document.getElementById('loginInvalido').style.display = 'block'
        });
})