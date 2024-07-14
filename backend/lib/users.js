const UsersRepo = require('../repository/users')


class Users {
  async initialize() {
    this.repo = new UsersRepo()
  }

  async findUser(query, projection = {}) {
    const user = await this.repo.findOne(query)
    return user
  }

  async getAllUsers(query = {}) {
    const users = await this.repo.find(query)
    return users
  }

  async updateUser(query, userData) { 
    const isModified = await this.repo.updateOne(query, userData)
    return isModified
  }

  async deleteUser(query) { 
    const isDeleted = await this.repo.deleteOne(query)
    return isDeleted
  }

  async addUser(userData) {
    const user = await this.repo.insertOne(userData)
    return user
  }

  async addUser(userData) {
    const user = await this.repo.insertOne(userData)
    return user
  }
}


module.exports = Users