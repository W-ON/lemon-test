const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/tests/', '.module.ts'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(t|j)s',
    '!<rootDir>/src/main.ts',
    '!<rootDir>/src/validators/*.(t|j)s',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text-summary'],
  transform: tsjPreset.transform,
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts', '**/*.e2e-spec.ts'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};
