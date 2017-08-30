import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import createdBySchema from './created_by_schema';
import updatedBySchema from './updated_by_schema';

const createdByUpdatedBySchema = new SimpleSchema([
  createdBySchema,
  updatedBySchema
]);

export default createdByUpdatedBySchema;
