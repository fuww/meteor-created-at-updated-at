/* eslint-disable max-nested-callbacks */

import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {createdAtUpdatedAtSchema} from
  'meteor/fashionunited:created-at-updated-at';
import {Random} from 'meteor/random';
import {
  describe,
  it
} from 'meteor/practicalmeteor:mocha';
import {expect} from 'meteor/practicalmeteor:chai';

function allow() {
  return true;
}

const collection = new Meteor.Collection('created_at_updated_at_schema_tests');
collection.attachSchema(new SimpleSchema([{
  name: {
    type: String,
    optional: true
  }
}, createdAtUpdatedAtSchema]));

if (Meteor.isServer) {
  collection.remove({});
  Meteor.publish('created_at_updated_at_schema_tests', () =>
    collection.find()
  );

  collection.allow({
    insert: allow,
    update: allow,
    remove: allow
  });
} else {
  Meteor.subscribe('created_at_updated_at_schema_tests');
}

function getName() {
  return Random.id();
}

describe('createdAtUpdatedAtSchema', () => {
  describe('createdAt', () => {
    it('should be set during insert', (done) => {
      collection.insert({name: getName()}, (error, id) => {
        if (error) {
          return done(error);
        }
        const doc = collection.findOne(id);

        expect(doc.createdAt).to.be.a('date');
        done();
      });
    });

    if (Meteor.isServer) {
      it('should be set during upsert when the document does not exist', () => {
        const name = getName();
        collection.upsert({name: getName()}, {$set: {name}});
        const doc = collection.findOne({name});

        expect(doc.createdAt).to.be.a('date');
      });

      it('should not be changed during upsert when the document exists', () => {
        const originalName = getName();
        const name = getName();
        collection.insert({name: originalName});
        const originalDoc = collection.findOne({name: originalName});
        collection.upsert({name: originalName}, {$set: {name}});
        const doc = collection.findOne({name});

        expect(doc.createdAt).to.eql(originalDoc.createdAt);
      });
    }

    it('should not be changed during update', (done) => {
      collection.insert({name: getName()}, (error, id) => {
        if (error) {
          return done(error);
        }

        const originalDoc = collection.findOne(id);
        collection.update(id, {$set: {name: getName()}}, (error) => {
          if (error) {
            return done(error);
          }

          const doc = collection.findOne(id);

          expect(doc.createdAt).to.eql(originalDoc.createdAt);
          done();
        });
      });
    });

    it('should not be overridden during update', (done) => {
      collection.insert({name: getName()}, (error, id) => {
        if (error) {
          return done(error);
        }

        const originalDoc = collection.findOne(id);
        collection.update(id, {$set: {
          name: getName(),
          createdAt: new Date()
        }}, (error) => {
          if (error) {
            return done(error);
          }

          const doc = collection.findOne(id);

          expect(doc.createdAt).to.eql(originalDoc.createdAt);
          done();
        });
      });
    });
  });

  describe('updatedAt', () => {
    it('should be set to the same as createdAt during insert', (done) => {
      collection.insert({name: getName()}, (error, id) => {
        if (error) {
          return done(error);
        }

        const doc = collection.findOne(id);

        expect(doc.updatedAt).to.be.a('date');
        expect(doc.updatedAt).to.eql(doc.createdAt);
        done();
      });
    });

    if (Meteor.isServer) {
      it('should be set to the same as createdAt ' +
          'during when the document does not exist', () => {
        const name = getName();
        collection.upsert({name: getName()}, {$set: {name}});
        const doc = collection.findOne({name});

        expect(doc.updatedAt).to.be.a('date');
        expect(doc.updatedAt.getTime())
          .to.be.closeTo(doc.createdAt.getTime(), 10);
      });

      it('should be changed during upsert when the document exists', () => {
        const originalName = getName();
        const name = getName();
        collection.insert({name: originalName});
        const originalDoc = collection.findOne({name: originalName});
        collection.upsert({name: originalName}, {$set: {name}});
        const doc = collection.findOne({name});

        expect(doc.updatedAt).to.be.above(originalDoc.updatedAt);
      });
    }

    it('should be changed during update', (done) => {
      collection.insert({name: getName()}, (error, id) => {
        if (error) {
          return done(error);
        }

        const originalDoc = collection.findOne(id);
        collection.update(id, {$set: {name: getName()}}, (error) => {
          if (error) {
            return done(error);
          }

          const doc = collection.findOne(id);

          expect(doc.updatedAt).to.be.above(originalDoc.updatedAt);
          done();
        });
      });
    });

    it('should not be overridden during update', (done) => {
      collection.insert({name: getName()}, (error, id) => {
        if (error) {
          return done(error);
        }

        const originalDoc = collection.findOne(id);
        collection.update(id, {$set: {
          name: getName(),
          updatedAt: new Date('2000-01-01')
        }}, (error) => {
          if (error) {
            return done(error);
          }

          const doc = collection.findOne(id);

          expect(doc.updatedAt).to.be.above(originalDoc.updatedAt);
          done();
        });
      });
    });
  });
});
