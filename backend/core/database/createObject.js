const { cloneDeep } = require("lodash/fp");

module.exports = {
  createObject: (obj) => ({
    get model() {
      return cloneDeep(obj);
    },
  }),
};
