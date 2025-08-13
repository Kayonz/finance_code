import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserRepository from '../repositories/User.js';
import { comparePassword } from '../helpers/password.js';

export default function configurePassport() {
  const userRepository = new UserRepository();

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userRepository.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, rawPassword, done) => {
      try {
        const user = await userRepository.findByEmail(email);
        if (!user) return done(null, false, { message: 'Incorrect e-mail' });

        const isMatch = await comparePassword(
          rawPassword,
          user.password_hash,
          user.salt.toString()
        );
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));
}
