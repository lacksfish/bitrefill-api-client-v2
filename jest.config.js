export default {
    testEnvironment: 'node',
    testMatch: ['<rootDir>/test/**/*.test.js'],
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.js', // Adjust the path to your source files
    ],
    //   coverageDirectory: 'coverage',
  }