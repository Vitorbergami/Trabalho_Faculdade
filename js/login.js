const form = document.querySelector('.user')

form.addEventListener('submit', event => {
    event.preventDefault();
    
    const formData = new FormData(form)

   //const url = "https://backend-trab-faculdade.vercel.app/login";
   const url = "http://localhost:3000/login";

    const data = Object.fromEntries(formData)

    const other_params = {
        method : "POST",
        headers : { 
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
         },
        body : JSON.stringify(data),
        //mode : "cors"
    };

    fetch(url, other_params)
            .then((response) => {
                if (response.ok) {
                    console.log('Foi: ', response)
                    return response.json();
                } else {
                    console.log('Erro: ', response)
                    throw new Error("Could not reach the API: " + response.statusText);
                }
            }).then((data) => {
                console.log('Teste: ', data)
            }).catch((error) => {
                console.log('Erro: ', error)
            });
})