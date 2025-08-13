module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, references: { model: 'users', key: 'id' } },
    name: { type: DataTypes.STRING(50), allowNull: false },
    limit: { type: DataTypes.DECIMAL(10, 0) },
    created_at: { type: DataTypes.DATE }
  }, {
    tableName: 'categories',
    timestamps: false
  });

  Category.associate = (models) => {
    Category.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Category.hasMany(models.Expense, { foreignKey: 'category_id', as: 'expenses' });
  };

  return Category;
};
