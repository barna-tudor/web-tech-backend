class CustomError extends Error {
    constructor(message, name, code) {
        super(message);
        this.name = name;
        this.code = code;
    }
}

module.exports = CustomError;