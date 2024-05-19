const express = require('express');
const { addData, updateData, getCount,getAllData } = require('../controller/dataController');
const router = express.Router();

router.post('/add', addData);
router.post('/update', updateData);
router.get('/count', getCount);
router.get('/data', getAllData);
module.exports = router;

