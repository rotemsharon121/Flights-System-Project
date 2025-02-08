const { getAllAdmins,
    getAdminById,
    addAdmin,
    updateAdmin,
    removeAdmin } = require('../models/adminsModel')

const getAllAdminsController = (req, res) => {
    getAllAdmins()
        .then((allAdmins) => {
            console.log("user get all admins")
            res.json({ message: "show all admins", allAdmins })
        })
        .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't show all admins") })
}

const getAdminByIdController = (req, res) => {
    const id = req.params.id
    getAdminById(id)
        .then((admin) => {
            if (!admin.length) {
                console.log(`ERROR There is no admin with this id- ${id}`);
                res.status(404)
                res.send(`There is no admin with this id- ${id}`)
            } else {
                console.log(`user get admin`, admin)
                res.json({ message: "success", admin: admin })
            }
        })
        .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't get the admin") })
}

const addAdminController = (req, res) => {
    const id = req.params.id
    const admin = req.body
    admin.id = id
    addAdmin(admin)
        .then(async (data) => {
            const newAdmin = await getAdminById(data[0])
            console.log(`user add admin`, newAdmin)
            res.json({ message: "success", newAdmin: newAdmin })
        })
        .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't add the admin") })
}

const updateAdminController = async (req, res) => {
    try {
        const id = req.params.id
        const admin = req.body
        const changes = []
        for (const changekey in admin) {
            const changeValue = admin[changekey]
            changes.push(changekey, changeValue)
        }
        console.log('user try to update admin with id ', id)
        const adminBeforeChanges = await getAdminById(id)
        if (!adminBeforeChanges.length) {
            console.log(`ERROR There is no admin with this id- ${id}`)
            res.status(404)
            return res.json({ NotFound: "There is no admin with this id", id })
        }
        updateAdmin(id, admin)
            .then(async () => {
                const adminAfterChanges = await getAdminById(id)
                console.log('user updated admin ', adminBeforeChanges, ' to ', adminAfterChanges, `changes: ${changes}`)
                res.json({ message: "success", adminBeforeChanges, adminAfterChanges, changes })
            })
            .catch((error) => {
                console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't update the admin")
            })
    } catch (error) {
        console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't update the admin")
    }
}

const removeAdminController = async (req, res) => {
    try {
        const id = req.params.id
        const admin = await getAdminById(id)
        removeAdmin(id)
            .then(data => {
                if (data === 0) {
                    console.log(`user try to deleted admin with id ${id} but it not exist`)
                    res.status(404)
                    return res.json({ message: `admin with id ${id} not exist` })
                }
                console.log(`admin with id ${id} has deleted`, admin)
                res.json({ message: `admin with id ${id} deleted`, admin })
            })
            .catch(error => { console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't delete the admin") })
    } catch (error) {
        console.log(`ERROR ${error}`); res.status(500); res.json("an error occurred, can't delete the admin")
    }
}

module.exports = {
    getAllAdminsController,
    getAdminByIdController,
    addAdminController,
    updateAdminController,
    removeAdminController
}