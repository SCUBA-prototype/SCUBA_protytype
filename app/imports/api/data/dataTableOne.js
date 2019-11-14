import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { Tracker } from "meteor/tracker";

/** Create a Meteor collection. */
const DataTableOne = new Mongo.Collection("DataTableOne");

/** Create a schema to constrain the structure of documents associated with this collection. */
const DataTableOneSchema = new SimpleSchema(
  {
    "35": { type: Object, blackbox: true },
    "40": { type: Object, blackbox: true },
    "50": { type: Object, blackbox: true },
    "60": { type: Object, blackbox: true },
    "70": { type: Object, blackbox: true },
    "80": { type: Object, blackbox: true },
    "90": { type: Object, blackbox: true },
    "100": { type: Object, blackbox: true },
    "110": { type: Object, blackbox: true },
    "120": { type: Object, blackbox: true },
    "130": { type: Object, blackbox: true },
    "140": { type: Object, blackbox: true }
  },
  { tracker: Tracker }
);

/** Attach this schema to the collection. */
DataTableOne.attachSchema(DataTableOneSchema);

/** Make the collection and schema available to other code. */
export { DataTableOne, DataTableOneSchema };
