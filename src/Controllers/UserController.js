const { User } = require('../Models');
const { decodeToken } = require('../Helpers/jwt');

// const index = async (req, res) => {
//   try {
//     const users = await User.findAll();

//     return res.status(201).send(users);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

const create = async (req, res) => {
  try {
    const {
      name, email, password,
    } = req.body;
    const { id } = await User.create({
      name,
      email,
      password,
    });
    return res.status(201).send({
      id,
      name,
      email,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;
    const [, token] = authorization.split(' ');
    const requestUser = decodeToken(token);
    if (requestUser.id !== id) {
      throw new Error('Permission denied, contact the administrator');
    }
    const {
      name, email, createdAt, updatedAt,
    } = await User.findByPk(id);
    return res.status(200).json({
      id, name, email, createdAt, updatedAt,
    });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const {
      name, email, password,
    } = req.body;
    const { id } = req.params;
    const { authorization } = req.headers;
    const [, token] = authorization.split(' ');
    const requestUser = decodeToken(token);
    if (requestUser.id !== id) {
      throw new Error('Permission denied, contact the administrator');
    }
    const updatedUser = await User.update(
      {
        name, email, password,
      },
      { where: { id } },
    );

    if (!updatedUser) {
      throw new Error('User not found');
    }
    return res.status(200).json({ success: 'User updated successfully' });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = {
  create, show, update,
};
