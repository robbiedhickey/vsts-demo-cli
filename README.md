vsts-demo-cli
========

A cross-platform cli to illustrate interacting with VSTS.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<!-- toc -->
* [Description](#description)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Description

This package consists of a basic framework powered by `oclif` that enables a modular way to build multi-command CLIs. The feature set is currently minimal, but it will allow a user to initialize a connection to a TFS instance that they own or have access to, persist the credentials, and subsequently use the credentials in a later session to list the projects they have access to. This utility is also cross platform. 

From a technical standpoint, the project illustrates some basic usage of `oclif` test framework, and includes configuration for linting and measuring test coverage. If you can't live without a static type system, `oclif` also comes bundled with type declarations and embraces TypeScript in their documentation. 


# Usage
<!-- usage -->
```sh-session
$ npm install -g @robbiedhickey/vsts-demo-cli
$ vsts-demo-cli COMMAND
running command...
$ vsts-demo-cli (-v|--version|version)
@robbiedhickey/vsts-demo-cli/0.0.2 darwin-x64 node-v8.9.0
$ vsts-demo-cli --help [COMMAND]
USAGE
  $ vsts-demo-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`vsts-demo-cli help [COMMAND]`](#vsts-demo-cli-help-command)
* [`vsts-demo-cli init`](#vsts-demo-cli-init)

## `vsts-demo-cli help [COMMAND]`

display help for vsts-demo-cli

```
USAGE
  $ vsts-demo-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.0.5/src/commands/help.ts)_

## `vsts-demo-cli init`

initializes cli against a vsts instance

```
USAGE
  $ vsts-demo-cli init

OPTIONS
  -t, --token=token  personal access token for your vsts instance
  -u, --url=url      url of the vsts instance (i.e. https://myvsts.visualstudio.com)

DESCRIPTION
  Persists VSTS configuration and user data to make future uses of the utility seamless.
```

_See code: [src/commands/init/index.js](https://github.com/robbiedhickey/vsts-demo-cli/blob/v0.0.2/src/commands/init/index.js)_
<!-- commandsstop -->
