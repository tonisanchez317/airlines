/* global DATABASE_NAME, db */

(() => {
  const admin = db.getSiblingDB('admin');

  if (!admin.getUser('airline-user')) {
    admin.createUser({
      user: 'airline-user',
      pwd: '123456',
      roles: [
        {
          role: 'dbOwner',
          db: DATABASE_NAME,
        },
      ],
    });
  }
})();
