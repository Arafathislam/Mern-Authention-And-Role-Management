

const { cloneDeep, has } = require('lodash/fp');

const createNewData = (obj) => ({
    get model() {
        return cloneDeep(obj);
    },
});



function validator(model, obj) {
    let keys = Object.keys(model)
    let inKeys = Object.keys(obj)
    let data = createNewData(obj).model
    let flag = true
    let message = "Success"
    try {

        for (let key in inKeys) {
            let attr = inKeys[key]
            if (!model[attr]) {
                return {
                    error: true,
                    message: "Invalid Information",
                    data: null
                }
                // break

            }
        }
        for (let key in keys) {
            let attr = keys[key]
            // console.log(attr)
            let obj = model[attr]
            if (obj.required) {
                if (!data[attr]) {
                    flag = false
                    message = "Missing Field: " + attr
                    break
                }
            }

            if (!((obj.type == 'list' && Array.isArray(data[attr])) || (obj.type == typeof data[attr]))) {
                flag = false
                message = "Type doesn't match: " + attr
                break
            }

            if (typeof data[attr] == 'string') {
                // console.log(obj.min >= data[attr].length)
                if (obj.min > data[attr].length) {
                    flag = false
                    message = "Too short string: " + attr
                    break
                }
                if (obj.max < data[attr].length) {
                    flag = false
                    message = "Too long string: " + attr
                    break
                }
            }
            if (data[attr] == '' || !data[attr]) {
                data[attr] = obj.default
            }
        }
        if (flag) {
            return {
                error: false,
                message,
                data: data
            }
        } else {
            return {
                error: true,
                message,
                data: data
            }
        }


    } catch (err) {
        console.log(err)
        return {
            error: {
                error: true,
                message: "Internal Server Error"
            },
            data: data
        }
    }

}

module.exports = {
    validator
}


