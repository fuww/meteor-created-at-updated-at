import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import createdAtSchema from './created_at_schema';
import updatedAtSchema from './updated_at_schema';

const createdAtUpdatedAtSchema = new SimpleSchema([
  createdAtSchema,
  updatedAtSchema
]);

export default createdAtUpdatedAtSchema;
