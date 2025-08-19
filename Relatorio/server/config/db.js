// server/config/db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/meusistema', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB conectado!'))
  .catch(err => console.log(err));

module.exports = mongoose;

// server/models/User.js
const mongoose = require('../config/db');
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});

module.exports = mongoose.model('User', UserSchema);

// server/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.json({ message: 'Usuário registrado com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Usuário não encontrado' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Senha inválida' });
        const token = jwt.sign({ id: user._id }, 'secreto', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;

// server/server.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
app.use(express.json());
app.use('/auth', authRoutes);

app.listen(5000, () => console.log('Servidor rodando na porta 5000'));