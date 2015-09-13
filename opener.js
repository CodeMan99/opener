#!/usr/bin/env node

var childProcess = require('child_process');

module.exports = getOpenCommand;

if (require.main === module) {
  main(process.argv.slice(2));
}

function main(args) {
  var sub = args.length === 1 ? getOpenCommand(args[0]) : getOpenCommand(args.slice(1), args[0]);

  childProcess.spawn(sub.command, sub.args, {
    detached: true,
    stdio: 'ignore'
  });
}

function getOpenCommand(args, override) {
  var command;

  if (typeof args === 'string') {
    args = [args];
  }

  switch (process.platform) {
  case 'win32':
    command = 'cmd';
    if (override) {
      args.unshift(override);
    }
    args = ['/c', 'start', '""'].concat(args.map(escapeWin32Args));
    break;
  case 'darwin':
    command = override || 'open';
    break;
  default:
    command = override || 'xdg-open';
    break;
  }

  return {command: command, args: args};
}

function escapeWin32Args(value) {
  return value.replace(/&/g, '^&');
}
