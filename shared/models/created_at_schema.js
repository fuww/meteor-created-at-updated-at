import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const createdAtSchema = new SimpleSchema({
  createdAt: {
    type: Date,
    optional: true,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      }

      // otherwise unset it
      this.unset();
    }
  }
});

export default createdAtSchema;
