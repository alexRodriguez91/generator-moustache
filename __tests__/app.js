'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-moustache:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ fileUpper: 'Program' });
  });

  it('creates files', () => {
    assert.file(['src/example.program.provider.ts']);
  });
});
