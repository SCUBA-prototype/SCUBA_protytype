import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simple-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Dives = new Mongo.Collection('Dives');

/** Create a schema to constrain the structure of documents associated with this collection. */
const DiveSchema = new SimpleSchema({
  depth: String,
  bottomTime: String,
  surfaceIntervalTime: String,
  startingPressureGroup: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Dives.attachSchema(DiveSchema);

/** Make the collection and schema available to other code. */
export { Dives, DiveSchema }; //possible bug, to fix: export const Tasks = new Mongo.Collection('tasks');
