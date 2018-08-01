const VstsBaseCommand = require('../vsts-base-command');

class ClearCommand extends VstsBaseCommand {
  async run() {
    this.action('Purging user configuration settings', () =>
      this.purgeUserConfig()
    );
  }
}

ClearCommand.description = `clears the stored user configuration settings`;

module.exports = ClearCommand;
