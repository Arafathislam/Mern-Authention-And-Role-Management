module.exports = function (module, method) {

    return async function(req, res, next){
        // try{
            // console.log("module name", module, method)
            
            console.log("checking user- permission", req.user)
            let key = {
                user_id: req.user._id.toString()

            }
            if(!req.user.role || !req.user.role_id){
                res.status(403).send({message: "User has no defined role"})
            
                return
            }

            let role = {}
            role  = await app.listeners(dbCall)[0]( "UserRoles", 'getByKey', key, role)
            let permission = {}
            key = {role_id: req.user.role_id }
            permission  = await app.listeners(dbCall)[0]( 'RoleRoutePermission', 'getByKey', key, permission)
        
            permission = permission[0]
            console.log("checking role", permission.routeList)

            let moduleList = new Set(permission.routeList)
            // console.log(moduleList)
            let isValid = moduleList.has(module)
            // console.log("is valid module", isValid, "method is ", permission[module].method[method])
            if(!isValid ){

                res.status(403).send({message: "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource."})
                return
            }

            if(!permission[module].method[method]){
                res.status(403).send({message: "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource."})
                return
            }else next()
        // }catch(e){
        //     console.log(e)
        //     res.status(500).send({message: "Internal Server Error Module Permission"})
        // }



    }
        
    
}