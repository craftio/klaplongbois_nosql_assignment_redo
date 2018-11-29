class JsonResponseModel {

    constructor(url, method ,statuscode, message, response) {
        this.url = url;
        this.method = method;
        this.statuscode = statuscode;
        this.message = message;
        this.response = response;
    };
}
module.exports = JsonResponseModel;




