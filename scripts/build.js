const runTasks = require('./run-task');

let tasks = [
  'copy',
  'sass',
  'ts',
  'jest',
  'webpack'
];

runTasks(tasks);
