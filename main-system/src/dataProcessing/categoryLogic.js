const Category = require("../models/Category");

module.exports = {
  // Get all categories
  getAllCategories: async () => {
    const categories = await Category.findAll();
    return categories;
  },

  // Get category by id
  getCategoryById: async (id) => {
    const category = await Category.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return category;
  },

  // Create new category
  createCategory: async (category) => {
    const newCategory = await Category.create(category);
    return newCategory;
  },

  // Update category by id
  updateCategory: async (categoryId, category) => {
    const updatedCategory = await Category.update(category, {
      where: { CategoryID: categoryId },
    });
    return updatedCategory;
  },

  // Delete category by id
  deleteCategory: async (categoryId) => {
    const deletedCategory = await Category.findAndDelete(categoryId);
    return deletedCategory;
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
