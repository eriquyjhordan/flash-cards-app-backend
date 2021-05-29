const axios = require('axios');
const { Word } = require('../Models');
require('dotenv').config();

const index = async (req, res) => {
  try {
    const words = await Word.findAll();

    return res.status(201).send(words);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { appId, appKey } = process.env;
    const { name } = req.params;

    const response = await axios.get(`https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${name}`,
      {
        headers: {
          app_id: appId,
          app_key: appKey,
        },
      });

    await Word.create({ name });
    return res.status(201).json(response.data.results[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const word = await Word.findByPk(id);
    return res.status(200).json(word);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = {
  index, create, show,
};
