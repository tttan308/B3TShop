const db = require('../models');
const Category = db.categories;

const categoryController = {
  getAllCategory: async (req, res) => {
    try {
      const categories = await Category.findAll({
        include: [{
          model: Category,
          as: 'Subcategories',
          attributes: ['CategoryID', 'CategoryName'],
        }],
        attributes: ['CategoryID', 'CategoryName'],
        where: {
          ParentID: null
        }
      });

      const result = categories.map((category) => {
        const subcategories = category.Subcategories.map((subcategory) => {
          return {
            CategoryID: subcategory.dataValues.CategoryID,
            CategoryName: subcategory.dataValues.CategoryName,
          }
        });

        return {
          CategoryID: category.CategoryID,
          CategoryName: category.CategoryName,
          subcategories: subcategories,
        }
      });

      return result;

    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Server Error');
    }
  },

  addCategory: async (req, res) => {
    try {
      const { CategoryName, subcategories } = req.body;

      const category = await Category.create({
        CategoryName: CategoryName,
      });

      if (subcategories) {
        for (let i = 0; i < subcategories.length; i++) {
          await Category.create({
            CategoryName: subcategories[i],
            ParentID: category.CategoryID,
          });
        }
      }

      return res.status(200).send(category);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Server Error');
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const name = req.body.categoryName;

      console.log(name);
      
      // Xóa category và subcategories (Xóa subcategories trước)
      const category = await Category.findOne({
        where: {
          CategoryName: name
        }
      });

      if (!category) {
        return res.status(404).send('Category not found');
      }

      await Category.destroy({
        where: {
          ParentID: category.CategoryID
        }
      });

      await Category.destroy({
        where: {
          CategoryID: category.CategoryID
        }
      });

      return res.status(200).send('Delete successfully');
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Server Error');
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { CategoryName, subcategories } = req.body;

      // Cập nhật category
      const category = await Category.findOne({
        where: {
          CategoryName: CategoryName
        }
      });

      if (!category) {
        return res.status(404).send('Category not found');
      }

      await Category.update({
        CategoryName: CategoryName,
      }, {
        where: {
          CategoryID: category.CategoryID
        }
      });

      // Cập nhật subcategories
      if (subcategories) {
        const subcategoriesInDB = await Category.findAll({
          where: {
            ParentID: category.CategoryID
          }
        });

        for (let i = 0; i < subcategories.length; i++) {
          if (subcategoriesInDB[i]) {
            await Category.update({
              CategoryName: subcategories[i],
            }, {
              where: {
                CategoryID: subcategoriesInDB[i].CategoryID
              }
            });
          } else {
            await Category.create({
              CategoryName: subcategories[i],
              ParentID: category.CategoryID,
            });
          }
        }

        if (subcategoriesInDB.length > subcategories.length) {
          for (let i = subcategories.length; i < subcategoriesInDB.length; i++) {
            await Category.destroy({
              where: {
                CategoryID: subcategoriesInDB[i].CategoryID
              }
            });
          }
        }
      }

      return res.status(200).send('Update successfully');
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Server Error');
    }
  },

  getCategoryByName: async (req, res) => {
    try {
      const name = req.query.categoryName;

      const category = await Category.findOne({
        where: {
          CategoryName: name
        }
      });

      if (!category) {
        return res.status(404).send('Category not found');
      }

      const result = {
        CategoryName: category.dataValues.CategoryName,
      }

      const subcategories = await Category.findAll({
        where: {
          ParentID: category.CategoryID
        }
      });

      result.subcategories = subcategories.map((subcategory) => {
        return subcategory.dataValues.CategoryName;
      });

      console.log(result);
      
      return res.status(200).send(result);

    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = categoryController;
