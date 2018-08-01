const { flags } = require('@oclif/command');
const { cli } = require('cli-ux');
const VstsBaseCommand = require('../vsts-base-command');

class InitCommand extends VstsBaseCommand {
  async run() {
    const url = await this.getUrl();
    const token = await this.getToken();

    // test to see if we can connect
    await this.loadUserConnection({ url, accessToken: token });

    await this.action('Saving user configuration settings', () =>
      this.saveUserConfig({ url, accessToken: token })
    );
  }

  async getUrl() {
    let url = this.flags.url;

    if (!url) {
      url = await cli.prompt(
        'What is the https url of your VSTS instance (i.e. https://myvsts.visualstudio.com)'
      );
    }

    const isValid = this.validUrl(url);
    if (isValid) return url;
    if (this.flags.url) this.exit(-1);

    // if we are in interactive mode, try again
    return this.getUrl();
  }

  validUrl(url) {
    if (!url.startsWith('https://')) {
      this.warn('You must provide an https url.');
      return false;
    }

    if (!url.includes('visualstudio.com')) {
      this.warn(
        'This utility only works with MS hosted *.visualstudio.com VSTS instances.'
      );
      return false;
    }

    return true;
  }

  async getToken() {
    let token = this.flags.token;

    if (!token) {
      token = await cli.prompt('What is your personal access token');
    }

    return token;
  }
}

InitCommand.description = `initializes cli against a vsts instance
Persists VSTS configuration and user data to make future uses of the utility seamless.
`;

InitCommand.flags = {
  url: flags.string({
    char: 'u',
    description:
      'url of the vsts instance (i.e. https://myvsts.visualstudio.com)'
  }),
  token: flags.string({
    char: 't',
    description: 'personal access token for your vsts instance'
  })
};

module.exports = InitCommand;
