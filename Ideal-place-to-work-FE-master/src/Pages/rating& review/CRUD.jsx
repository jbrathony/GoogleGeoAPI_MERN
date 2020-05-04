import Api from "../../Api";

export default class CRUD {
    headers = {};

    get(id) {
        return Api.fetch(
            "/reviewForPlace/" + id,
            "GET"
        ).then(response => response.json());
    }

    post(data, id) {
        return Api.fetch("/reviews/" + id, "POST", JSON.stringify(data), {"Authorization": "Bearer " + localStorage.getItem("access_token")}
        ).then(response => response.json());
    }

    put(id, data) {
        return Api.fetch(
            "/reviews/" + id,
            "PATCH",
            JSON.stringify(data),
            {"Authorization": "Bearer " + localStorage.getItem("access_token")},
        ).then(response => response.json());
    }

    delete(id, placeId) {
        return Api.fetch(
            "/reviews/" + id + "/" + placeId,
            "DELETE",
            null, {"Authorization": "Bearer " + localStorage.getItem("access_token")}
        ).then(response => response.json());
    }

}
