const { expect, test } = require('@oclif/test');

describe('help command', () => {
  test
    .stdout()
    .command(['help'])
    .it('displays init command', ctx => {
      expect(ctx.stdout).to.contain('init');
    });
});
