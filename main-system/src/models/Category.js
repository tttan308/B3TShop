module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        CategoryID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        CategoryName: { type: DataTypes.STRING },
        ParentID: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null }
    }, {
        timestamps: false,
    });

    Category.hasMany(Category, { as: 'Subcategories', foreignKey: 'ParentID', sourceKey: 'CategoryID' });
    Category.belongsTo(Category, { as: 'Parent', foreignKey: 'ParentID', targetKey: 'CategoryID' });

    return Category;
};
