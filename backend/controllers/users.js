const { ObjectId } = require('mongodb')
const Users = require('../lib/users')
const { USER_ROLES } = require('../constants/users')
const users = new Users()

/**
 * Gets all users
 */
exports.getAllUsers = async ctx => {
  try {
    const allUsers = await users.getAllUsers()
    
    ctx.status = 200
    ctx.body = allUsers  
  } catch (err) {
    ctx.status = err.status || 500
    ctx.message = err.message || 'Internal server error'
  }
}

/**
 * Gets manager and its employees
 */
exports.getManagerAndEmployees  = async ctx => {
  const { id } = ctx.params
  try {
    const objectId = new ObjectId(id)
    const manager = await users.findUser({ _id: objectId })
    const employees = await users.getAllUsers({ managerId: objectId })
    console.log({
      manager,
      employees
    })
    
    ctx.status = 200
    ctx.body = {
      ...manager,
      employees
    };
  } catch (err) {
    ctx.status = err.status || 500
    ctx.message = err.message || 'Internal server error'
  }
}


/**
 * Gets user by id
 */
exports.getUserById = async ctx => {
  const { id } = ctx.params
  try {
    console.log(1)
    const user = await users.findUser({ _id: new ObjectId(id) })
    
    ctx.status = 200
    ctx.body = user  
  } catch (err) {
    ctx.status = err.status || 500
    ctx.message = err.message || 'Internal server error'
  }
}

/**
 * Delete user
 */
exports.deleteUser = async ctx => {
  const { id } = ctx.params
  try {
    const isDeleted = await users.deleteUser({ _id: new ObjectId(id) })
    
    ctx.status = 200
    ctx.body = { isDeleted }  
  } catch (err) {
    ctx.status = err.status || 500
    ctx.message = err.message || 'Internal server error'
  }
}

/**
 * Update user
 */
exports.updateUser = async ctx => {
  const { id } = ctx.params
  const { firstName, lastName, email, dateStarted, salary } = ctx.request.body
  try {
    const isModified = await users.updateUser({ _id: new ObjectId(id) }, { firstName, lastName, email, dateStarted, salary })
    
    ctx.status = 200
    ctx.body = { isModified }
  } catch (err) {
    ctx.status = err.status || 500
    ctx.message = err.message || 'Internal server error'
  }
}


/**
 * Create a user
 */
exports.createUser = async ctx => {
  const { firstName, lastName, email, dateStarted, salary, role, managerId } = ctx.request.body;
  try {
    // TODO: make Date.parse strict to specific format, otherwise throw an error
    const parsedDateStarted = new Date(dateStarted);
    const definedRole = role ? role : USER_ROLES.WORKER;
    const newUser = { firstName, lastName, email, dateStarted: parsedDateStarted.toISOString(), salary, role: definedRole };
    if (definedRole === USER_ROLES.DRIVER || definedRole === USER_ROLES.WORKER) {
      if (managerId) {
        const manager = await users.findUser({ _id: new ObjectId(managerId), role: USER_ROLES.MANAGER });
        if (!manager) {
          throw new Error('manager does not exist');
        }
        newUser.managerId = managerId;
      } else {
        throw new Error('managerId parameter not supplied');
      }
    }
    const user = await users.addUser(newUser);

    ctx.status = 200
    ctx.body = user
  } catch (err) {
    ctx.status = err.status || 500
    ctx.message = err.message || 'Internal server error'
  }
}

async function initialize() {
  await users.initialize();
}


initialize()