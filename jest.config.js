export default  {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }] ,
  },
  testMatch: ['**/tests/**/*.test.ts'],
  transformIgnorePatterns: ['/node_modules/'],
};