class JsonResponseModel {

    constructor(url, statuscode, message, response) {
        this.url = url;
        this.statuscode = statuscode;
        this.message = message;
        this.response = response;
    };
}
module.exports = JsonResponseModel;




