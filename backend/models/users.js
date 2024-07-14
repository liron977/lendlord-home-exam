const mongoose = require('mongoose')

const collectionName = 'users'
const schemaName = 'users'
const SchemaTypes = mongoose.Schema

const schema = new mongoose.Schema(
  {
    _id: { type: SchemaTypes.ObjectId, auto: true },
    firstName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    dateStarted: { type: Date, required: true },
    salary: { type: Number, required: true },
    role: { type: String, required: true },
    managerId: { type: SchemaTypes.ObjectId, required: false }
  },
  { strict: false, autoCreate: true, timestamps: true }
)

const model = mongoose.model(schemaName, schema, collectionName)

module.exports = model
module.exports.schema = schema
