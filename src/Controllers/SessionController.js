const bcrypt = require('bcrypt');
const { User } = require('../Models');
const { createToken } = require('../Helpers/jwt');

const checkpassword = async (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

const create = async (req, res) => {
  try {
    const { email, password } = req.body;
    const {
      id, hashedPassword,
    } = await User.findOne({ where: { email } });
    if (!await checkpassword(password, hashedPassword)) {
      throw new Error('email or password invalid');
    }

    const token = createToken({ id, email });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

module.exports = { create };
