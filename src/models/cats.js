module.exports = (sequelize, DataTypes) => {
  const schema = {
    name: DataTypes.STRING,
    continent: DataTypes.STRING,
    country: DataTypes.STRING,
    averageLifeSpan: DataTypes.INTEGER,

  };

  const Cat = sequelize.define('Cat', schema);
  return Cat;
};
