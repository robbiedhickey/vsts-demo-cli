const { flags } = require('@oclif/command');
const { cli } = require('cli-ux');
const Table = require('cli-table');
const ora = require('ora');
const vsts = require('vso-node-api');
const VstsBaseCommand = require('../../vsts-base-command');

class InitCommand extends VstsBaseCommand {
  async run() {
    const url = await this.getUrl();
    const token = await this.getToken();

    const authHandler = vsts.getPersonalAccessTokenHandler(token);
    const connection = new vsts.WebApi(url, authHandler);

    let spinner = ora().start('Initializing connection to VSTS');
    await connection.connect();
    spinner.succeed();

    const otherApi = await connection.getCoreApi();

    spinner = ora().start('Fetching accessible projects');
    const projects = await otherApi.getProjects();
    spinner.succeed();
    this.renderTable(['Project Names'], projects.map(p => ({ name: p.name })));
  }

  async getUrl() {
    let url = this.flags.url;

    if (!url) {
      url = await cli.prompt(
        'What is the url of the VSTS instance? (i.e. https://myvsts.visualstudio.com)'
      );
    }

    return url;
  }

  async getToken() {
    let token = this.flags.token;

    if (!token) {
      token = await cli.prompt('What is your personal access token?');
    }

    return token;
  }

  renderTable(columns, rows) {
    const table = new Table({ head: columns });
    rows.forEach(row => {
      table.push(Object.values(row));
    });
    this.log(table.toString());
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
