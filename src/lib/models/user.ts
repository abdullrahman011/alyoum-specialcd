import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import bcrypt from 'bcryptjs';

class User extends Model {
  async comparePassword(candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.getDataValue('password'));
  }

  static async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  role: {
    type: DataTypes.ENUM('admin', 'editor'),
    defaultValue: 'editor'
  }
}, {
  sequelize,
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

export default User;