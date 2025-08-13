module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
    category_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'categories', key: 'id' } },
    description: { type: DataTypes.STRING(300) },
    value: { type: DataTypes.DECIMAL, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false }
  }, {
    tableName: 'expenses',
    timestamps: false
  });

  Expense.associate = (models) => {
    Expense.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Expense.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
  };

  return Expense;
};
