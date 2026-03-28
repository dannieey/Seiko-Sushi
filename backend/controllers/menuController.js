const MenuItem = require('../models/MenuItem');

exports.getMenu = async (req, res) => {
  try {
    const menu = await MenuItem.find({});
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    const item = await MenuItem.create({
      name,
      description,
      price,
      category,
      image
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: 'Invalid item data' });
  }
};


exports.deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (item) {
      await item.deleteOne();
      res.json({ message: 'Item removed' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.updateMenuItem = async (req, res) => {
    try {
        const item = await MenuItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!item) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        res.json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
