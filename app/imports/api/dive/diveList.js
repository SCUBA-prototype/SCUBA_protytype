import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simple-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const diveList = new Mongo.Collection('diveList');

/** Create a schema to constrain the structure of documents associated with this collection. */
const diveListSchema = new SimpleSchema({
  diveList: [],
}, { tracker: Tracker });

/** Attach this schema to the collection. */
diveList.attachSchema(diveListSchema);

/** Make the collection and schema available to other code. */
export { diveList, diveListSchema };
