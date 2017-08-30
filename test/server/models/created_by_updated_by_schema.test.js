/* eslint-disable max-nested-callbacks */

import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {createdByUpdatedBySchema} from
  'meteor/fuww:created-at-updated-at';
import {Random} from 'meteor/random';
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'meteor/practicalmeteor:mocha';
import {expect} from 'meteor/practicalmeteor:chai';
import {sinon} from 'meteor/practicalmeteor:sinon';

const collection = new Meteor.Collection('created_by_updated_by_schema_tests');
collection.attachSchema(new SimpleSchema([{
  name: {
    type: String,
    optional: true
  }
}, createdByUpdatedBySchema]));

function getName() {
  return Random.id();
}

describe('createdByUpdatedBySchema', () => {
  let sandbox;
  let userId;
  let userIdStub;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    userId = Random.id();
    userIdStub = sandbox.stub(Meteor, 'userId');
    userIdStub.returns(userId);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('createdBy', () => {
    it('should be set during insert', () => {
      const _id = collection.insert({name: getName()});

      const doc = collection.findOne(_id);

      expect(doc.createdBy).to.equal(userId);
    });

    it('should be set during upsert when the document does not exist', () => {
      const name = getName();
      collection.upsert({name: getName()}, {$set: {name}});
      const doc = collection.findOne({name});

      expect(doc.createdBy).to.equal(userId);
    });

    it('should not be changed during upsert when the document exists', () => {
      const originalName = getName();
      const name = getName();
      collection.insert({name: originalName});
      userIdStub.returns(Random.id());
      collection.upsert({name: originalName}, {$set: {name}});
      const doc = collection.findOne({name});

      expect(doc.createdBy).to.eql(userId);
    });

    it('should not be changed during update', () => {
      const _id = collection.insert({name: getName()});

      userIdStub.returns(Random.id());
      collection.update(_id, {$set: {name: getName()}});

      const doc = collection.findOne(_id);

      expect(doc.createdBy).to.eql(userId);
    });

    it('should not be overridden during update', () => {
      const _id = collection.insert({name: getName()});

      collection.update(_id, {$set: {
        name: getName(),
        createdBy: 'trudy'
      }});

      const doc = collection.findOne(_id);

      expect(doc.createdBy).to.eql(userId);
    });
  });

  describe('updatedBy', () => {
    it('should be set during insert', () => {
      const _id = collection.insert({name: getName()});

      const doc = collection.findOne(_id);

      expect(doc.updatedBy).to.equal(userId);
    });

    it('should be set during upsert when the document does not exist', () => {
      const name = getName();
      collection.upsert({name: getName()}, {$set: {name}});
      const doc = collection.findOne({name});

      expect(doc.updatedBy).to.equal(userId);
    });

    it('should be changed during upsert when the document exists', () => {
      const originalName = getName();
      const name = getName();
      const _id = collection.insert({name: originalName});
      const userId = Random.id();
      userIdStub.returns(userId);
      collection.upsert({_id}, {$set: {name}});
      const doc = collection.findOne(_id);

      expect(doc.updatedBy).to.equal(userId);
    });

    it('should be changed during update', () => {
      const _id = collection.insert({name: getName()});

      const userId = Random.id();
      userIdStub.returns(userId);
      collection.update(_id, {$set: {name: getName()}});

      const doc = collection.findOne(_id);

      expect(doc.updatedBy).to.equal(userId);
    });

    it('should be changed during update when there is no user', () => {
      const _id = collection.insert({name: getName()});

      userIdStub.returns(null);
      collection.update(_id, {$set: {name: getName()}});

      const doc = collection.findOne(_id);

      expect(doc.updatedBy).to.not.exist;
    });

    it('should not be overridden during update', () => {
      const _id = collection.insert({name: getName()});

      collection.update(_id, {$set: {
        name: getName(),
        updatedBy: 'trudy'
      }});

      const doc = collection.findOne(_id);

      expect(doc.updatedBy).to.equal(userId);
    });
  });
});
