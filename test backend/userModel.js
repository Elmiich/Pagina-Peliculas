const database = require('./database');

async function createUser(username, hashedPassword) {
  const connection = database.getConnection();
  await connection.execute('INSERT INTO usuarios (username, hashedPassword) VALUES (?, ?)', [username, hashedPassword]);
  console.log('Usuario registrado con éxito');
}

async function findUserByUsername(username) {
  const connection = database.getConnection();
  const [rows] = await connection.execute('SELECT hashedPassword FROM usuarios WHERE username = ?', [username]);
  return rows.length > 0 ? rows[0].hashedPassword : null;
}

module.exports = {
  createUser,
  findUserByUsername,
};
