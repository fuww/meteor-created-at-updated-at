/* eslint-env es6:false */
/* eslint-disable prefer-arrow-callback */

Package.describe({
  summary: 'Package for adding createdAt and updatedAt to schema',
  version: '0.0.5',
  name: 'fuww:created-at-updated-at',
  git: 'https://github.com/fuww/meteor-created-at-updated-at.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.use([
    'ecmascript@0.4.0',
    'aldeed:simple-schema@1.5.3'
  ]);

  api.mainModule('shared/main.js');

  api.export([
    'createdAtSchema',
    'createdAtUpdatedAtSchema',
    'createdBySchema',
    'createdByUpdatedBySchema',
    'updatedAtSchema',
    'updatedBySchema'
  ]);
});

Package.onTest(function(api) {
  api.use([
    'ecmascript',
    'meteor',
    'practicalmeteor:mocha',
    'practicalmeteor:chai',
    'practicalmeteor:sinon',
    'random',
    'aldeed:simple-schema',
    'fuww:created-at-updated-at'
  ]);

  api.mainModule('test/client/main.js', 'client');
  api.mainModule('test/server/main.js', 'server');
});
