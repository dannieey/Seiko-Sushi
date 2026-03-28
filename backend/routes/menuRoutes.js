const express = require('express');
const router = express.Router();
const { getMenu, createMenuItem, deleteMenuItem, updateMenuItem} = require('../controllers/menuController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getMenu)
  .post(protect, admin, createMenuItem);

router.delete('/:id', protect, admin, deleteMenuItem);
router.route('/:id')
    .delete(protect, admin, deleteMenuItem)
    .put(protect, admin, updateMenuItem);
module.exports = router;