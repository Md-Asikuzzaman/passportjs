import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { prisma } from '../db/db.js';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },

    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email
          },
        });

        if (!user) {
          return done(null, false, { msg: 'Incorrect username' });
        }

        if (user.password !== password) {
          return done(null, false, { msg: 'Incorrect password' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize user into the session (store user id in session)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session (retrieve user from database by id)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    done(null, user);
  } catch (error) {
    done(error);
  }
});
