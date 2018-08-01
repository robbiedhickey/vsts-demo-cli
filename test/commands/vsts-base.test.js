const { expect, test } = require('@oclif/test');
const VstsBaseCommand = require('../../src/vsts-base-command');

class Fixture extends VstsBaseCommand {}

describe('vsts base command', () => {
  test
    .command(['help'])
    .stdout()
    .it('excludes base command from help', ctx => {
      expect(ctx.stdout).to.not.contain('vsts-base-command');
    });

  it('initializes flags on derived instances', async () => {
    const fixture = new Fixture([]);
    await fixture.init();
    expect(fixture.flags).to.be.a('object');
  });
});
