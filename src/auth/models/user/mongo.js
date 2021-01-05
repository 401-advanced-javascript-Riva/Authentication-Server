'use strict';
const mongoose = require('mongoose');

class Collections {
     /** Constructor accepts a schema and model name as args when creating an instance,
      * and this is used in the methods to operate on the mongoose schema
     * @param modelName is string name of collection the model is for
     * @param schema is the mongoose Schema object
     */
    constructor(modelName,schema) {
        this.model = mongoose.model(modelName, schema);
    }

  async create(object) {
    let newEntry = new this.model(object);
    return await newEntry.save();
  };

  async read(id) {
    const oneEntry = await this.model.find({_id: id});
    return oneEntry[0];
  };

  async readAll() {
    const allEntries = await this.model.find({});
    return allEntries;
  };

  async update(id, body) {
    const entry =  await this.model.findByIdAndUpdate(id, body, {
        new: true
    });
    if(entry === null) {
        return null;
    };
    await entry.save();
    return entry
  };

  async delete(id) {
    const entry =  await this.model.findByIdAndDelete(id);
    if ( entry === null) {
        return null;
    };
  };
};
module.exports = Collections;