exports.validationCheck = (errors, isThrowable) => {
    if (!errors.isEmpty()) {
        console.log('validation error');
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        return error;
    }
    return null;
};
