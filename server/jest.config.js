module.exports = {
  preset: "ts-jest", // Use ts-jest for transforming TypeScript files
  testEnvironment: "node", // You can change this to 'jsdom' if you're testing browser-related code
  moduleNameMapper: {
    // Ensure that imports work when using absolute paths or custom aliases
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Tells Jest to use ts-jest for TypeScript files
  },
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)", // Matches test files in __tests__ folders
    "**/?(*.)+(spec|test).+(ts|tsx|js)", // Matches test files with .test.ts or .spec.ts suffix
  ],
};
