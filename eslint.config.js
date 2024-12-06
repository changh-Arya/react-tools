/** @type {import('eslint').Linter.Config} */
const config = {
  parser: '@typescript-eslint/parser', // 定义 ESLint 的解析器
  extends: [
    'eslint:recommended', // 使用 ESLint 推荐的规则
    'plugin:react/recommended', // 使用 React 推荐的规则
    'plugin:@typescript-eslint/recommended', // 使用 TypeScript 推荐的规则
    'plugin:prettier/recommended', // 启用 prettier 规则
    ],
//   plugins: ['react', '@typescript-eslint'], // 添加 jest 插件
  plugins: ['react', '@typescript-eslint', 'jest'], // 添加 jest 插件
  settings: {
    react: {
      version: 'detect', // 自动检测 React 版本
    },
    },
  rules: {

  },
  env: {
    browser: true, // 浏览器环境
    es6: true, // ES6 环境
    node: true, // Node.js 环境
    // 'jest': true, // 添加 Jest 环境
  },
  parserOptions: {
    "ecmaVersion": 2022,  // 或者更高的版本
    "sourceType": "module"
  }
};

module.exports = config;
