module.exports = class apiError {
    constructor(message, statuscode){
        this.message = message;
        this.statuscode = statuscode;
        this.datetime = new Date().toUTCString();
    }
};