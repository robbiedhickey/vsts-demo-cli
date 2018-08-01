const { Command } = require('@oclif/command');

// VstsBaseCommand.hidden = true;

module.exports = class extends Command {
  async init() {
    // initialize flags on the so we don't have to do so in run()
    const { flags } = this.parse(this.constructor);
    this.flags = flags;

    // check to see if user is already setup?
  }
};
