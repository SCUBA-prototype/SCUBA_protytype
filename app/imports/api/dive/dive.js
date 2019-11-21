import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Dives = new Mongo.Collection('Dives');

/** Create a schema to constrain the structure of documents associated with this collection. */
const DiveSchema = new SimpleSchema({
  name: { type: String, defaultValue: '' },
  createdAt: Date,
  totalBottomTime: String,
  depth: {type: Number, defaultValue: 0},
  bottomTime: {type: Number, defaultValue: 0},
  surfaceIntervalTime: {type: Number, defaultValue: 0},
  startingPressureGroup: {type: String, defaultValue:'A',},
  pressureGroupAfterDive: {type: String, defaultValue:'A'},
  blackbox: true,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Dives.attachSchema(DiveSchema);

/** Make the collection and schema available to other code. */
export { Dives, DiveSchema };
