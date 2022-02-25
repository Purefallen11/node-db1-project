const db = require('../../data/db-config')


const getAll = async () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts').where({id : id}).first()
}

const create = async ({name, budget}) => {
  let [id] = await db('accounts').insert({ name, budget });
  return {
    name,
    budget,
    id: id
  }
}

const updateById = async (id,{name, budget}) => {
  await db('accounts').where({ id: id }).update({ name, budget })
  return {
    name,
    budget,
    id
  }
}

const deleteById = async (id) => {
  const account = await getById(id)
  await db('accounts').where({ id: id }).delete()
  return account
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
