export default class User {
  constructor({ id, email, password_hash, salt }) {
    this.id = id;
    this.email = email;
    this.password_hash = password_hash;
    this.salt = salt;
  }

  async checkPassword(plainPassword, compareFn) {
    return compareFn(
      plainPassword,
      this.password_hash,
      this.salt
    );
  }
}
