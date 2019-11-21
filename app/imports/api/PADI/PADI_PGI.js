import {Mongo} from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import {Tracker} from "meteor/tracker";

/** Create a Meteor collection. */
const PADI_PGI = new Mongo.Collection("PADI_PGI");

/** Create a schema to constrain the structure of documents associated with this collection. */
const PADI_PGISchema = new SimpleSchema(
    {
            None: {type: Object, blackbox: true},
            A: {type: Object, blackbox: true},
            B: {type: Object, blackbox: true},
            C: {type: Object, blackbox: true},
            D: {type: Object, blackbox: true},
            E: {type: Object, blackbox: true},
            F: {type: Object, blackbox: true},
            G: {type: Object, blackbox: true},
            H: {type: Object, blackbox: true},
            I: {type: Object, blackbox: true},
            J: {type: Object, blackbox: true},
            K: {type: Object, blackbox: true},
            L: {type: Object, blackbox: true},
            M: {type: Object, blackbox: true},
            N: {type: Object, blackbox: true},
            O: {type: Object, blackbox: true},
            P: {type: Object, blackbox: true},
            Q: {type: Object, blackbox: true},
            R: {type: Object, blackbox: true},
            S: {type: Object, blackbox: true},
            T: {type: Object, blackbox: true},
            U: {type: Object, blackbox: true},
            V: {type: Object, blackbox: true},
            W: {type: Object, blackbox: true},
            X: {type: Object, blackbox: true},
            Y: {type: Object, blackbox: true},
            Z: {type: Object, blackbox: true}
    },
    {tracker: Tracker}
);

/** Attach this schema to the collection. */
PADI_PGI.attachSchema(PADI_PGISchema);

/** Make the collection and schema available to other code. */
export {PADI_PGI, PADI_PGISchema};
