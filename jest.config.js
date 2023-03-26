export default {
	testEnvironment: 'node',
	preset: 'ts-jest/presets/default-esm',
	transform: {
		'^.+\\.m?[tj]s?$': ['ts-jest', { useESM: true }]
	},
	roots: ['<rootDir>/src'],
	maxConcurrency: 1,
	moduleNameMapper: {
		'@domain/(.*)': '<rootDir>/src/domain/$1',
		'@application/(.*)': '<rootDir>/src/application/$1',
		'@infrastructure/(.*)': '<rootDir>/src/infrastructure/$1'
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(m)?ts$',
	coverageDirectory: 'coverage',
	collectCoverageFrom: ['src/**/*.ts', 'src/**/*.mts', '!src/**/*.d.ts', '!src/**/*.d.mts']
}
