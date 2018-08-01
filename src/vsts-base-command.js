const { Command } = require('@oclif/command');
const fs = require('fs-extra');
const ora = require('ora');
const path = require('path');
const Table = require('cli-table');
const vsts = require('vso-node-api');

const USER_CONFIG_FILE = 'user-config.json';

/**
 * Base command to handle common vsts and cli patterns
 *
 * @class VstsBaseCommand
 * @extends {Command}
 */
class VstsBaseCommand extends Command {
  async init() {
    const { flags } = this.parse(this.constructor);
    this.flags = flags;
  }

  /**
   * Wraps an asynchronous function with error handling and progress display.
   *
   * Shows a loading spinner with the specified message and gracefully handles errors and program termination.
   *
   * @param {string} message - the message to display beside the spinner
   * @param {Function} fn - the asynchronous function to execute
   * @memberof VstsBaseCommand
   * @returns {any} the result of the asynchronous function that is being wrapped
   */
  async action(message, fn) {
    const spinner = ora().start(message);
    try {
      let result = await fn();
      spinner.succeed();
      return result;
    } catch (error) {
      spinner.fail();
      this.error(error);
    }
  }

  /**
   * Saves user settings to an accessible directory for later retrieval
   *
   * @param {Object} config - the config object
   * @param {string} config.url - the url of the vsts instance
   * @param {string} config.accessToken - the personal access token of the vsts user
   * @memberof VstsBaseCommand
   */
  async saveUserConfig(config) {
    await fs.outputJson(path.join(this.config.configDir, USER_CONFIG_FILE), {
      url: config.url,
      accessToken: config.accessToken
    });
  }

  /**
   * Returns an initialized vsts connection.
   *
   * Will try to load from stored user settings unless configuration object is passed
   *
   * @param {Object} config - the config object
   * @param {string} config.url - the url of the vsts instance
   * @param {string} config.accessToken - the personal access token of the vsts user
   * @memberof VstsBaseCommand
   * @returns {vsts.WebApi} - an initialized connection of the WebApi instance
   */
  async loadUserConnection(config) {
    if (!config) {
      try {
        config = await fs.readJSON(
          path.join(this.config.configDir, USER_CONFIG_FILE)
        );
      } catch (error) {
        this.error(
          'You are currently unauthenticated. Please run `vsts-demo-cli init` to setup your credentials.'
        );
      }
    }

    const authHandler = vsts.getPersonalAccessTokenHandler(config.accessToken);
    const connection = new vsts.WebApi(config.url, authHandler);

    await this.action('Initializing connection to VSTS', () =>
      connection.connect()
    );

    return connection;
  }

  /**
   * Accepts a column and row definitions and renders an ascii table to the console.
   *
   * @param {Array<string>} columns
   * @param {Array<object>} rows
   * @memberof VstsBaseCommand
   */
  renderTable(columns, rows) {
    const table = new Table({ head: columns });
    rows.forEach(row => {
      table.push(Object.values(row));
    });
    this.log(table.toString());
  }
}

module.exports = VstsBaseCommand;
