const { createObject } = require("./createObject");
const createView = require("./view");
const { elements } = require("./dbElement");
const _ = require("lodash");

function error(message) {
  return {
    error: true,
    message: message,
    data: {},
  };
}

function find() {
  return {
    async findById() {
      // let result = {}
      let result = await app.listeners(dbCall)[0](
          this.collection,
          "getById",
          this.key,
          {}
        ),
        View = null;
      if (result) {
        if (_.isEmpty(this.view)) {
          return { error: false, data: result };
        }

        View = createView(this.view);

        return {
          error: false,
          data: View.create(result).view,
        };
      } else {
        return {
          error: true,
          data: {},
        };
      }
    },
    async findByKey() {
      let result = await app.listeners(dbCall)[0](
        this.collection,
        "getByKey",
        this.key,
        {},
        this.view,
        this.skip,
        this.limit,
        this.sort
      );

      if (result.length == 0) {
        return {
          error: true,
          data: [],
        };
      } else {
        return {
          error: false,
          data: result,
        };
      }
    },
    async findOne() {
      // here typo is corrected
      let result = await app.listeners(dbCall)[0](
        this.collection,
        "getByKey",
        this.key,
        {},
        this.view
      );
      if (result.length == 0) {
        return {
          error: true,
          data: {},
        };
      } else {
        return {
          error: false,
          data: result[0],
        };
      }
    },
    async findMany() {
      let result = await app.listeners(dbCall)[0](
        this.collection,
        "getByKey",
        this.key,
        {},
        this.view,
        this.skip,
        this.limit,
        this.sort
      );
      if (result.length == 0) {
        return {
          error: true,
          data: [],
        };
      } else {
        return {
          error: false,
          data: result,
        };
      }
    },
  };
}

module.exports = function () {
  return {
    db: {
      collection(collection) {
        return {
          async insert(data, viewC) {
            try {
              let view = {};
              if (viewC) {
                view = viewC;
              }
              // console.log("database middleware", data, collection)
              let newObj = createObject(data).model;
              newObj = { ...newObj, ...elements };
              await app.emit(dbCall, collection, "create", "", newObj);

              if (_.isEmpty(view)) {
                return { error: false, data: newObj };
              }

              let View = createView(view);
              return { error: false, data: View.create(newObj).view };
            } catch (err) {
              console.log(err);
              return error("Database Insert Failed");
            }
          },

          /**
                     * database update middleware
                     * @function
                     @param string
                     @param object
                     @return {error, success}
                    */

          async update(key, data, viewC) {
            try {
              let view = {};
              if (viewC) {
                view = viewC;
              }
              let newObj = createObject(data).model;
              // console.log(collection, "update")
              let findOne = find().findById.bind({ collection, key, view });
              return await app
                .listeners(dbCall)[0](collection, "update", key, newObj)
                .then(async () => {
                  let result = await findOne();
                  return {
                    error: false,
                    data: result,
                  };
                })
                .catch((err) => {
                  console.log(err);
                  return {
                    error: false,
                    data: {},
                  };
                });
            } catch (err) {
              console.log(err);
              return error("Database Update Failed");
            }
          },
          async delete(key) {
            try {
              console.log(collection, "delete", key);
              await app.emit(dbCall, collection, "remove", key, {});
              return {
                error: false,
                data: {
                  success: true,
                },
              };
            } catch (err) {
              console.log(err);
              return error("Database Delete Failed");
            }
          },
          async remove(key) {
            try {
              let date = new Date();
              let newObj = {
                updated: true,
                delete: true,
                status: false,
                active: false,
                deleteDate: date,
              };
              await app.emit(dbCall, collection, "update", key, newObj);
              return {
                error: false,
                data: {
                  success: true,
                },
              };
            } catch (err) {
              console.log(err);
              return error("Database Remove Failed");
            }
          },
          
          async find(key, viewC, skip, limit, sort) {
           
            try {
              let view = {};
              if (viewC) {
                view = viewC;
              }
              let qurey = {
                collection: collection,
                key: key,
                view: view,
                skip: skip,
                limit: limit,
                sort: sort,
              };
              let findGeneric = null;
              if (typeof key == "string") {
                findGeneric = find().findById.bind({ collection, key, view });
              } else if (typeof key == "object") {
                findGeneric = find().findByKey.bind(qurey);
              }
              return findGeneric();
              // console.log(collection, "find")
            } catch (err) {
              console.log(err);
              return error("Database Find Failed");
            }
          },

          async findOne(key, viewC) {
            try {
              let view = {};
              if (viewC) {
                view = viewC;
              }
              let findONE = null;

              if (typeof key == "string") {
                findONE = find().findById.bind({ collection, key, view });
              } else if (typeof key == "object") {
                findONE = find().findOne.bind({ collection, key, view });
              }
              return await findONE();
            } catch (err) {
              console.log(err);
              return error("Database Find Failed");
            }
          },













          async findMany() {
            let query = { collection: collection };
            argLen = arguments.length;
            if (argLen < 2 || argLen > 5) {
              // query = { collection: collection, key: key, view: view, skip: 0, limit: 0, sort: { _id: 1 } }
              return error("Inavalid Input");
            } else if (argLen == 2) {
              query = {
                collection: collection,
                key: arguments[0],
                view: arguments[1],
                skip: 0,
                limit: 0,
                sort: { _id: 1 },
              };
            } else if (argLen == 3) {
              query = {
                collection: collection,
                key: arguments[0],
                view: arguments[1],
                skip: arguments[2],
                limit: 0,
                sort: { _id: 1 },
              };
            } else if (argLen == 4) {
              query = {
                collection: collection,
                key: arguments[0],
                view: arguments[1],
                skip: arguments[2],
                limit: arguments[3],
                sort: { _id: 1 },
              };
            } else if (argLen == 5) {
              query = {
                collection: collection,
                key: arguments[0],
                view: arguments[1],
                skip: arguments[2],
                limit: arguments[3],
                sort: arguments[4],
              };
            }

            let findMany = find().findMany.bind(query);
            return await findMany();
          },







        };
      },
    },
  };
};
