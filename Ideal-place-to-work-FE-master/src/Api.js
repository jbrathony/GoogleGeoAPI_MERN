import {ajax} from "rxjs/ajax";
//This returning a promise that will be resolved with the data
export class Api {
    static URL = "https://ideal-place-to-work.herokuapp.com/api/v1";
    static fetch = (url, method = "GET", body, headers) => {
        return ajax({
            url: Api.URL + url,
            method: method,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: body
        }).toPromise()
            .then((res) => res.response);
    }
}

export default Api;

