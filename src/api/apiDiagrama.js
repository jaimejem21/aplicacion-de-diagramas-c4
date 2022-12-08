import { Api } from "../const/api";
// CLASE DE LIBRERIA DIAGRAMA CAP 4//
export const apiDiagrama = (endpoint, method = "GET", data = null) => {

    if (data) {
        return fetch(Api.url + endpoint, {
            method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .catch((err) => console.log(Api.url + endpoint + ":error " + err));
    }

    return fetch(Api.url + endpoint)
        .then((res) => res.json())
        .catch((err) => console.log(Api.url + endpoint + ":error " + err));
}