class JsonResponseModel {
    statuscode = "";
    message = "";
    response = {};

    constructor(statuscode, message, response) {
        this.statuscode = statuscode;
        this.message = message;
        this.response = response;
    };
}

module.exports = JsonResponseModel;
