module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
  plugins: [
    ['@babel/plugin-transform-runtime',
      {
        "corejs": 3
      }
    ]
  ],
  env: {
    cjs: {
      plugins: [
        [
          '@babel/plugin-transform-modules-commonjs',{
            strict: false
          }
        ]
      ]
    },
    esm: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
          },
        ],
      ],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            useESModules: true,
          },
        ],
      ],
    },
  },
};