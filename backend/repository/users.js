const usersModel = require('../models/users')

class Users {
  async findOne(query, projection = {}) {
    const user = await usersModel.findOne(query).select(projection)
    return user
  }

  async find(query, projection = {}) {
    const user = await usersModel.find(query).select(projection)
    return user
  }

  async updateOne(query, userData) {
    const result = await usersModel.updateOne(query, userData)
    return result.modifiedCount > 0
  }

  async insertOne(userData) {
    const user = await usersModel.create(userData);
    return user;
  }

  async deleteOne(query) {
    const result = await usersModel.deleteOne(query);
    return result.deletedCount > 0;
  }
}

module.exports = Users