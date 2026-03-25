import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';
import unicorn from 'eslint-plugin-unicorn';
import reactHooks from 'eslint-plugin-react-hooks';
import eslintConfigPrettier from 'eslint-config-prettier';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nextVitals from 'eslint-config-next/core-web-vitals';
import { defineConfig, globalIgnores } from 'eslint/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(
  globalIgnores(['.next/**', 'node_modules/**', 'dist/**', 'next.config.mjs', '.stylelintrc.js']),
  nextVitals,
  // ベース設定群
  eslint.configs.recommended,
  tseslint.configs.recommended,

  // グローバルな設定とルール
  {
    languageOptions: {
      parserOptions: {
        projectService: true, // ESLint 9+ / TS ESLint 8+ の推奨設定
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      'unused-imports': unusedImports,
      unicorn: unicorn,
      'react-hooks': reactHooks,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json'],
        },
      },
    },
    rules: {
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/naming-convention': [
        'warn',
        { format: ['PascalCase'], selector: 'class' },
        { format: ['PascalCase'], selector: 'interface' },
        { format: ['PascalCase'], selector: 'typeAlias' },
      ],
      '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: false }],
      '@typescript-eslint/no-floating-promises': ['error', { ignoreIIFE: true, ignoreVoid: false }],
      '@typescript-eslint/no-inferrable-types': [
        'error',
        { ignoreParameters: true, ignoreProperties: false },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/promise-function-async': [
        'error',
        {
          checkArrowFunctions: false,
          checkFunctionDeclarations: true,
          checkFunctionExpressions: false,
          checkMethodDeclarations: false,
        },
      ],
      '@typescript-eslint/restrict-plus-operands': 'error',
      'dot-notation': 'error',
      eqeqeq: 'error',
      'import/no-default-export': 'error',
      'import/no-unused-modules': [
        'error',
        {
          ignoreExports: ['**/page.tsx', '**/layout.tsx'],
          unusedExports: true,
        },
      ],
      'import/order': ['error', { alphabetize: { caseInsensitive: true, order: 'asc' } }],
      'no-restricted-imports': ['error', { patterns: ['./', '../', '..'] }],
      'react-hooks/rules-of-hooks': 'error',
      'react/jsx-boolean-value': 'error',
      'react/jsx-curly-brace-presence': 'error',
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'unicorn/filename-case': 'off',
      'unused-imports/no-unused-imports': 'error',
    },
  },

  // -------------------------
  // 旧 "overrides" に該当する部分
  // -------------------------
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.js'],
    rules: {
      'unicorn/filename-case': [
        'warn',
        {
          case: 'camelCase',
          ignore: ['_.*\\.ts', 'next-env.d.ts', 'styled-components.d.ts'],
        },
      ],
    },
  },
  {
    files: ['**/*.tsx'],
    rules: {
      'unicorn/filename-case': [
        'warn',
        {
          case: 'pascalCase',
          ignore: ['_.*\\.tsx', 'use.*\\.tsx', '\\[.*\\]\\.tsx'],
        },
      ],
    },
  },
  {
    files: ['**/page.tsx', '**/error.tsx', '**/layout.tsx'],
    rules: {
      'import/no-default-export': 'off',
      'import/prefer-default-export': 'error',
      'unicorn/filename-case': ['error', { case: 'camelCase' }],
    },
  },
  {
    files: ['**/not-found.tsx'],
    rules: {
      'import/no-unused-modules': 'off',
      'import/no-default-export': 'off',
      'import/prefer-default-export': 'error',
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
    },
  },
  {
    files: ['**/app/api/**/route.ts', '**/middleware.ts', '**/instrumentation.ts'],
    rules: {
      'import/no-unused-modules': 'off',
    },
  },

  // prettierは必ず最後に配置する（既存のフォーマットルールを上書きするため）
  eslintConfigPrettier,
);
