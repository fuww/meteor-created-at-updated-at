import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const updatedBySchema = new SimpleSchema({
  updatedBy: {
    type: String,
    autoValue() {
      const {userId} = this;

      if (!userId) {
        this.unset();
        return;
      }

      if (this.isModifier) {
        return {$set: userId};
      }

      return userId;
    },
    optional: true
  }
});

export default updatedBySchema;
