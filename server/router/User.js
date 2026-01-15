import express from 'express'
import User from '../models/User.js'

const router = express.Router()

router.post('/createUser', (req, res) => {
    const { username, email, age } = req.body

    User.create({ username, email, age })
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err))
})
router.get("/", async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get("/getUser/:id", async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});


router.put('/updateUser/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, age } = req.body;

        const user = await User.findByIdAndUpdate(
            id,
            { username, email, age },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/deleteUser/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deleteUser = await User.findByIdAndDelete(
            id
        );
        if (!deleteUser) {
            res.json({ message: "user not found" })
        }
       
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router
