module.exports = function (view) {
   return {
        viewObj: view,
        set: (view) => {
            viewModel.viewObj = view
        },
        get: () => {
            let data = viewModel.viewObj
            return data
        },
    
        create: (data) => ({
            get view() {
                let keys = Object.keys(view)
                let obj = {}
                keys.forEach(arg => {
                    obj[arg] = data[arg]
                })
                return obj
            }
        }),
    
    }

}

