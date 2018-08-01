const VstsBaseCommand = require('../../vsts-base-command');

class ProjectsListCommand extends VstsBaseCommand {
  async run() {
    const connection = await this.loadUserConnection();

    let projects = await this.action(
      'Fetching accessible projects',
      async () => {
        const api = await connection.getCoreApi();
        return await api.getProjects();
      }
    );

    this.renderTable(
      ['ID', 'Project Names'],
      projects.map(p => ({ id: p.id, name: p.name }))
    );
  }
}

ProjectsListCommand.description = `lists all vsts projects the user has access to`;

module.exports = ProjectsListCommand;
