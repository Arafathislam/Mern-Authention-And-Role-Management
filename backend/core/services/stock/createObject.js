const { createObject } = require('../../database/createObject')

module.exports = {
    createObject: createObject,



    /**
     * Response Funciton for services
     * @function 
     * @returns {object} 
     */
    
    response() {
        let responseObj = {
            error: false,
            message: message,
            httpStatus: 0,
            data: null

        }
        let argCnt = arguments.length

        if (argCnt < 2 || argCnt > 4) {
            responseObj.error = true
            responseObj.message = "Wrong Input"
            responseObj.httpStatus = 500
        } else if (arguments.length == 2) {
            responseObj.error = arguments[0]
            responseObj.message = arguments[1]

        }
        else if (argCnt == 3) {
            responseObj.error = arguments[0]
            responseObj.message = arguments[1]
            responseObj.data = arguments[2]
        }
        else if (argCnt == 4) {
            responseObj.error = arguments[0]
            responseObj.message = arguments[1]
            responseObj.data = arguments[2]
            responseObj.httpStatus = arguments[3]
        }

        return responseObj
    }

}