const query = require('../config/database');

// Add data
const addData = async (req, res) => {
  try {
    const result = await query('INSERT INTO userdata (content, count) VALUES ("", 0)');
    res.send({ id: result.insertId });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update data
const updateData = async (req, res) => {
  const { id, content } = req.body;
  try {
    await query('UPDATE userdata SET content = ?, count = count + 1 WHERE id = ?', [content, id]);
    res.send({ message: 'Data updated' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get data by ID
const getDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const rows = await query('SELECT * FROM userdata WHERE id = ?', [id]);
    if (rows.length === 0) {
      res.status(404).send({ message: 'Data not found' });
    } else {
      res.send(rows[0]);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get all data
const getAllData = async (req, res) => {
  try {
    const rows = await query('SELECT * FROM userdata');
    res.send(rows);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


// Get count of add/update operations d
const getCount = async (req, res) => {
  try {
    const rows = await query('SELECT SUM(count) as count FROM userdata');
    res.send({ count: rows[0].count });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};



module.exports = { addData, updateData, getDataById, getAllData, getCount };
