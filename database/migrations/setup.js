/* global DATABASE_PWD DATABASE_USER, MIGRATIONS_FOLDER, db */

const getMigrations = files => files
  .map(file => {
    if (file.baseName.match(/migration/)) {
      return file.baseName;
    }

    return null;
  })
  .filter(file => file)
  .sort();

const runMigrations = migrations => {
  migrations.forEach(migration => {
    // eslint-disable-next-line
    print(migration);
    // eslint-disable-next-line
    load(`./${migration}`);
  });
};

const useRoot = () => {
  const admin = db.getSiblingDB('admin');
  admin.auth(DATABASE_USER, DATABASE_PWD);
};

const run = () => {
  // eslint-disable-next-line
  cd(MIGRATIONS_FOLDER);
  // eslint-disable-next-line
  const files = listFiles() || [];

  // eslint-disable-next-line
  print('Authenticating user...');
  useRoot();

  // eslint-disable-next-line
  print('Running migrations:...');
  const migrations = getMigrations(files);
  runMigrations(migrations);

  // eslint-disable-next-line
  print('Done!\n');
};

try {
  run();
} catch (e) {
  // eslint-disable-next-line
  print(`Error: ${e.message}`);
}
