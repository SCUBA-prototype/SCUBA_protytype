import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { Tracker } from "meteor/tracker";

/** Create a Meteor collection. */
const PADI_PGI = new Mongo.Collection("PADI_PGI");

/** Create a schema to constrain the structure of documents associated with this collection. */
const PADI_PGISchema = new SimpleSchema(
    {
        E: { type: Object, blackbox: true },
    },
    { tracker: Tracker }
);

/** Attach this schema to the collection. */
PADI_PGI.attachSchema(PADI_PGISchema);

/** Make the collection and schema available to other code. */
export { PADI_PGI, PADI_PGISchema };
