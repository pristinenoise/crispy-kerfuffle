module.exports = {
  testEnvironment: "node",

  moduleNameMapper: {
    '^@App/(.*)$': '<rootDir>/src/$1',
    '^@Tests/(.*)$': '<rootDir>/tests/$1'
  }
};
