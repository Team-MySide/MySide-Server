<<<<<<< HEAD
const authUtil = {
    successTrue: (status, message, data) => {
        return {
            status: status,
            success: true,
            message: message,
            data: data
        }
    },
    successFalse: (status, message) => {

        return {
            status: status,
            success: false,
            message: message
        }
    }
};

=======
const authUtil = {
    successTrue: (status, message, data) => {
        return {
            status: status,
            success: true,
            message: message,
            data: data
        }
    },
    successFalse: (status, message) => {

        return {
            status: status,
            success: false,
            message: message
        }
    }
};

>>>>>>> 5fe080a8889eb343eca8528bd7e1b1cd7ec9e8d8
module.exports = authUtil;