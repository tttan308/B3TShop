const db = require("../models");
const Category = db.categories;
const Product = db.products;
const cartController = require("./cartController");
const jwt = require("jsonwebtoken");

const categoryController = {
  getAllCategory: async (req, res) => {
    try {
      const categories = await Category.findAll({
        include: [
          {
            model: Category,
            as: "Subcategories",
            attributes: ["CategoryID", "CategoryName"],
          },
        ],
        where: {
          ParentID: null,
        },
      });
      const result = categories.map((category) => {
        const subcategories = category.Subcategories.map((subcategory) => {
          return {
            CategoryID: subcategory.dataValues.CategoryID,
            CategoryName: subcategory.dataValues.CategoryName,
          };
        });

        return {
          CategoryID: category.CategoryID,
          CategoryName: category.CategoryName,
          subcategories: subcategories,
        };
      });

      return result;
    } catch (error) {
      res.status(500).send("Server Error");
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
      res.status(500).send("Server Error");
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const name = req.body.categoryName;

      // Xóa category và subcategories (Xóa subcategories trước)
      const category = await Category.findOne({
        where: {
          CategoryName: name,
        },
      });

      if (!category) {
        return res.status(404).send("Category not found");
      }

      await Category.destroy({
        where: {
          ParentID: category.CategoryID,
        },
      });

      await Category.destroy({
        where: {
          CategoryID: category.CategoryID,
        },
      });

      return res.status(200).send("Delete successfully");
    } catch (error) {
      res.status(500).send("Server Error");
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { CategoryName, subcategories } = req.body;

      // Cập nhật category
      const category = await Category.findOne({
        where: {
          CategoryName: CategoryName,
        },
      });

      if (!category) {
        return res.status(404).send("Category not found");
      }

      await Category.update(
        {
          CategoryName: CategoryName,
        },
        {
          where: {
            CategoryID: category.CategoryID,
          },
        }
      );

      // Cập nhật subcategories
      if (subcategories) {
        const subcategoriesInDB = await Category.findAll({
          where: {
            ParentID: category.CategoryID,
          },
        });

        for (let i = 0; i < subcategories.length; i++) {
          if (subcategoriesInDB[i]) {
            await Category.update(
              {
                CategoryName: subcategories[i],
              },
              {
                where: {
                  CategoryID: subcategoriesInDB[i].CategoryID,
                },
              }
            );
          } else {
            await Category.create({
              CategoryName: subcategories[i],
              ParentID: category.CategoryID,
            });
          }
        }

        if (subcategoriesInDB.length > subcategories.length) {
          for (
            let i = subcategories.length;
            i < subcategoriesInDB.length;
            i++
          ) {
            await Category.destroy({
              where: {
                CategoryID: subcategoriesInDB[i].CategoryID,
              },
            });
          }
        }
      }

      return res.status(200).send("Update successfully");
    } catch (error) {
      res.status(500).send("Server Error");
    }
  },

  getCategoryByName: async (req, res) => {
    try {
      const name = req.query.categoryName;

      const category = await Category.findOne({
        where: {
          CategoryName: name,
        },
      });

      if (!category) {
        return res.status(404).send("Category not found");
      }

      const result = {
        CategoryName: category.dataValues.CategoryName,
      };

      const subcategories = await Category.findAll({
        where: {
          ParentID: category.CategoryID,
        },
      });

      result.subcategories = subcategories.map((subcategory) => {
        return subcategory.dataValues.CategoryName;
      });

      return res.status(200).send(result);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  },

  getCategoryById: async (req, res) => {
    try {
      console.log("hehe");
      const token = req.cookies.accessToken;
      const username = token ? jwt.decode(token).username : null;
      const categories = await categoryController.getAllCategory(req, res);
      const shoppingCart = await cartController.getCartItemsDetail(req, res);

      const id = req.params.id;
      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).send("Category not found");
      }

      // Tìm tất cả các sản phẩm có category là id hoặc thuộc subcategory mà có parent là id
      const subcategories = await Category.findAll({
        where: {
          ParentID: id,
        },
      });

      const subcategoriesID = subcategories.map((subcategory) => {
        return subcategory.CategoryID;
      });

      const products = await Product.findAll({
        where: {
          CategoryID: [id, ...subcategoriesID],
        },
      });

      const result = {
        CategoryID: category.CategoryID,
        CategoryName: category.CategoryName,
        products: products.map((product) => {
          return {
            ProductID: product.ProductID,
            ProductName: product.ProductName,
            Price: product.Price,
            Discount: product.Discount,
            ImageURL: product.ImageURL,
          };
        }),
      };

      // Phân trang, mỗi trang 12 sản phẩm
      const page = req.query.page || 1;
      const sort = req.query.sort || "default";
      const filter = req.query.filter || "default";


      if (sort === "asc") {
        result.products.sort((a, b) => {
          return a.Price - b.Price;
        });
      }

      if (sort === "desc") {
        result.products.sort((a, b) => {
          return b.Price - a.Price;
        });
      }

      if (filter === "below500") {
        result.products = result.products.filter((product) => {
          return product.Price < 500000;
        });
      } else if (filter === "500to1000") {
        result.products = result.products.filter((product) => {
          return product.Price >= 500000 && product.Price < 1000000;
        });
      }
      else if (filter === "1000to5000") {
        result.products = result.products.filter((product) => {
          return product.Price >= 1000000 && product.Price < 5000000;
        });
      } else if (filter === "5000to10000") {
        result.products = result.products.filter((product) => {
          return product.Price >= 5000000 && product.Price < 10000000;
        });
      } else if (filter === "above10000") {
        result.products = result.products.filter((product) => {
          return product.Price >= 10000000;
        });
      }

      const limit = 12;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const total = result.products.length;
      
      result.products = result.products.slice(startIndex, endIndex);
      const totalPages = Math.ceil(total / limit) || 1;
      result.totalPages = totalPages;
      result.currentPage = page;
      result.sort = sort;
      result.filter = filter;

      console.log(result);
      res.render("product", {
        isLoggedIn: !!token,
        username: username,
        categories: categories,
        page: result,
        shoppingCart: shoppingCart,
      });
    } catch (error) {
      res.status(500).send("Server Error");
    }
  },

  get4ProductOfEachRootCategory: async (req, res) => {
    try {
      // Lấy danh sách các category gốc
      const categories = await Category.findAll({
        where: {
          ParentID: null,
        },
      });

      const result = [];

      // Lấy 4 sản phẩm của mỗi category gốc
      const promises = categories.map(async (category) => {
        // Với mỗi category gốc, hãy tìm các subcategory của nó, sau đó gom chung lại các sub và lấy 4 sản phẩm
        const subcategories = await Category.findAll({
          where: {
            ParentID: category.CategoryID,
          },
        });

        const subcategoriesID = subcategories.map((subcategory) => {
          return subcategory.CategoryID;
        });

        // Lấy 4 sản phẩm mới nhất của các subcategory
        const products = await Product.findAll({
          where: {
            CategoryID: subcategoriesID,
          },
          limit: 4,
        });

        result.push({
          CategoryID: category.CategoryID,
          CategoryName: category.CategoryName,
          products: products.map((product) => {
            return {
              ProductID: product.ProductID,
              ProductName: product.ProductName,
              Price: product.Price,
              Discount: product.Discount,
              ImageURL: product.ImageURL,
            };
          }),
        });
      });

      await Promise.all(promises);

      return result;
    } catch (error) {
      res.status(500).send("Server Error");
    }
  },
};

module.exports = categoryController;
