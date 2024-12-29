import { DataTypes } from 'sequelize';
import sequelize from '../db';

const Product = sequelize.define('products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  image_url: {
    type: DataTypes.STRING
  },
  purchase_link: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.TEXT
  },
  price_before: {
    type: DataTypes.DECIMAL(10, 2)
  },
  price_after: {
    type: DataTypes.DECIMAL(10, 2)
  },
  category: {
    type: DataTypes.STRING
  },
  store_name: {
    type: DataTypes.STRING
  },
  offer_date: {
    type: DataTypes.DATE
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'products',
  timestamps: false
});

export default Product;