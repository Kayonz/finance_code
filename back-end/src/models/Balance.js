module.exports = (sequelize, DataTypes) => {
  const Balance = sequelize.define('Balance', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
    value: { type: DataTypes.DECIMAL, allowNull: false }
  }, {
    tableName: 'balance',
    timestamps: false
  });

  Balance.associate = (models) => {
    Balance.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return Balance;
};
