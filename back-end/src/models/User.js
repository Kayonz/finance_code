module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    salt: { type: DataTypes.STRING(50), allowNull: false },
    profile_picture: { type: DataTypes.STRING(255) },
    monthly_budget: { type: DataTypes.DECIMAL }
  }, {
    tableName: 'users',
    timestamps: false
  });

  User.associate = (models) => {
    User.hasMany(models.Category, { foreignKey: 'user_id', as: 'categories' });
    User.hasOne(models.Balance, { foreignKey: 'user_id', as: 'balance' });
    User.hasMany(models.Expense, { foreignKey: 'user_id', as: 'expenses' });
  };

  return User;
};
