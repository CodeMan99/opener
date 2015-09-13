# opener2 #

A clone of [opener](https://www.npmjs.com/package/opener) without the 'child_process' call included.
Single function that returns an object with the platform dependent "open"
command and the args which may be escaped depending on platform.

## Why ##

The original opener called `child_process.execFile` which did not fit my use case.
Other options like [node-open](https://www.npmjs.com/package/open) and [opn](https://www.npmjs.com/package/opn)
still create the process directly, which is awfully opinionated. Some other problems exist such as testing the
library's dependencies instead of the library itself such as ensuring the default program opened or ensuring
the process was actually created.

## Usage ##

Pass the target "file" which you want to pass to your "open" call.

```js
var childProcess = require('child_process'),
    opener = require('opener2'),
    sub = opener('http://google.com');

childProcess.spawn(sub.command, sub.args);
```

Pass the target "file" as argument to a given command.

```js
var childProcess = require('child_process'),
    opener = require('opener2'),
    sub = opener('./file.txt', 'sublime');

childProcess.exec([sub.command].concat(sub.args).join(' '));
```
