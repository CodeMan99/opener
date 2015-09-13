var test = require('tape'),
    opener = require('../opener.js');

test('win32', function(t) {
  setPlatform('win32');

  t.deepEqual(
    opener('http://google.com'),
    {
      command: 'cmd',
      args: ['/c', 'start', '""', 'http://google.com']
    },
    'open google with default browser'
  );

  t.deepEqual(
    opener('http://google.com/?q=hello&page=2'),
    {
      command: 'cmd',
      args: ['/c', 'start', '""', 'http://google.com/?q=hello^&page=2']
    },
    'open google query with default browser'
  );

  t.deepEqual(
    opener('http://google.com', 'firefox'),
    {
      command: 'cmd',
      args: ['/c', 'start', '""', 'firefox', 'http://google.com']
    },
    'open google with firefox'
  );

  t.end();
});

test('darwin', function(t) {
  setPlatform('darwin');

  t.deepEqual(
    opener('http://google.com'),
    {
      command: 'open',
      args: ['http://google.com']
    },
    'open google'
  );

  t.deepEqual(
    opener('http://google.com', 'firefox'),
    {
      command: 'firefox',
      args: ['http://google.com']
    },
    'open google with firefox'
  );

  t.end();
});

test('linux', function(t) {
  setPlatform('linux');

  t.deepEqual(
    opener('http://google.com'),
    {
      command: 'xdg-open',
      args: ['http://google.com']
    },
    'open google'
  );

  t.deepEqual(
    opener('http://google.com', 'firefox'),
    {
      command: 'firefox',
      args: ['http://google.com']
    },
    'open google with firefox'
  );

  t.end();
});

function setPlatform(value) {
  Object.defineProperty(process, 'platform', {value: value});
}
