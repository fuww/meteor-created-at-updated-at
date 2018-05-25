import {SimpleSchema} from 'meteor/aldeed:simple-schema';

function getCreatedAt() {
  return this.siblingField('createdAt').value;
}

const updatedAtSchema = new SimpleSchema({
  updatedAt: {
    type: Date,
    optional: true,
    autoValue() {
      if (this.isInsert) {
        return getCreatedAt.call(this) || new Date();
      } else if (this.isUpsert) {
        return {
          $set: new Date(),
          $setOnInsert: getCreatedAt.call(this) || new Date()
        };
      }

      return new Date();
    }
  }
});

export default updatedAtSchema;
