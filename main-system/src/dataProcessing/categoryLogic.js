const Category = require("../models/Category");

module.exports = {
  // Get all categories
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.json(categories);
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  },

  // Get category by id
  getCategoryById: async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.json(category);
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  },

  // Create new category
  createCategory: async (req, res) => {
    try {
      const newCategory = await Category.create(req.body);
      res.json(newCategory);
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  },

  // Update category by id
  updateCategory: async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);
      if (category) {
        const updatedCategory = await category.update(req.body);
        res.json(updatedCategory);
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  },

  // Delete category by id
  deleteCategory: async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);
      if (category) {
        await category.destroy();
        res.json({ message: "Category deleted" });
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  },

  getLevel1Category: async () => {
    const level1Categories = await Category.findAll({
      where: {
        ParentID: null,
      },
    });
    return level1Categories;
  },

  getLevel2Category: async (level1CategoryID) => {
    const level2Categories = await Category.findAll({
      where: {
        ParentID: level1CategoryID,
      },
    });
    return level2Categories;
  },

  getHierachyCategories: async () => {
    const level1Categories = await Category.findAll({
      where: {
        ParentID: null,
      },
      include: [
        {
          model: Category,
          as: "Level2Categories",
        },
      ],
    });
    return level1Categories;
  },
};
