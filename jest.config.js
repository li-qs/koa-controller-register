module.exports = {
    preset: 'ts-jest/presets/default-esm', // 使用 ts-jest ESM 预设
    transform: {
        '^.+\\.ts$': ['ts-jest', { useESM: true }],
    },
    extensionsToTreatAsEsm: ['.ts'],
    testEnvironment: 'node',
};
