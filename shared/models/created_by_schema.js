import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const createdBySchema = new SimpleSchema({
  createdBy: {
    type: String,
    optional: true,
    autoValue() {
      const {userId} = this;

      if (userId) {
        if (this.isUpsert) {
          return {$setOnInsert: userId};
        }

        if (this.isInsert) {
          return userId;
        }
      }

      this.unset();
    },
    optional: true
  }
});

export default createdBySchema;
