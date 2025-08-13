import UserModel from '../models/User.js';
import User from '../entities/User.js';

export default class UserRepository {
  async findByEmail(email) {
    const userRecord = await UserModel.findOne({ where: { email } });
    if (!userRecord) return null;
    return new User(userRecord.toJSON());
  }

  async findById(id) {
    const userRecord = await UserModel.findByPk(id);
    if (!userRecord) return null;
    return new User(userRecord.toJSON());
  }
}
