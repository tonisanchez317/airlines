/* global DATABASE_NAME, db */

(() => {
  const app = db.getSiblingDB(DATABASE_NAME);
  app.createCollection('airlines');
})();
