/**
 * reverse.js
 * https://github.com/davidkevork/reverse
 *
 * Reverse engineering JavaScript and CSS sources from sourcemaps
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Copyright (c) David Kevork <david@davidkevork.me> (https://davidkevork.me)
 * Licensed under the MIT license
 */
'use strict';

const fs = require('fs');
const path = require('path');
const execFile = require('child_process').execFile;

const tape = require('tape');

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

tape('cli should output version number', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '-V'], null, (err, stdout) => {
    test.equals(stdout.trim(), pkg.version, 'Version is the same as in package.json');
  });

});

tape('cli should output help by default', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin], null, (err, stdout) => {
    test.ok(stdout.trim().indexOf('shuji [options] <file|directory>') !== -1, 'Help appeared');
  });

});

tape('cli should output help when requested', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '--help'], null, (err, stdout) => {
    test.ok(stdout.trim().indexOf('shuji [options] <file|directory>') !== -1, 'Help appeared');
  });

});

tape('cli should create folder for output', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '-o', 'tmp', 'tests/fixtures'], null, (err, stdout) => {
    test.ok(fs.existsSync('tmp'), 'Temporary folder exists');
  });

});
