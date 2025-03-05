module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/js/**/*.test.js'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
};