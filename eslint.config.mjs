export default [
  {
    ignores: [
      'build',
      'eslint.config.js',
      'coverage'
    ]
  },
  {
    'rules': {
      'semi': 'error',
      'quotes': [
        'error',
        'single'
      ],
      'comma-spacing': [
        'error',
        {
          'after': true
        }
      ],
      'comma-dangle': [
        'error',
        'never'
      ],
      'max-len': [
        'error',
        {
          'code': 140
        }
      ],
      'object-curly-spacing': [
        'error',
        'always'
      ],
      'no-console': [
        'error',
        {
          'allow': [
            'warn',
            'error'
          ]
        }
      ]
    }
  }
];
