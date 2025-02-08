const { knex } = require('../connections/knexConnection')

const getAllAdmins = () => {
    const admins = knex.select('*').from('adminstrators')
    return admins
}

const getAdminById = (id) => {
    const admin = knex.select('*').from('adminstrators').where('id', id)
    return admin
}

const addAdmin = (admin) => {
    const newAdmin = knex('adminstrators').insert(admin)
    return newAdmin
}

const updateAdmin = (id, admin) => {
    const updatedAdmin = knex(`adminstrators`).where('id', "=", id).update(admin)
    return updatedAdmin
}

const removeAdmin = (id) => {
    return knex(`adminstrators`).where('id', id).del()
}

module.exports = {
    getAllAdmins,
    getAdminById,
    addAdmin,
    updateAdmin,
    removeAdmin
}