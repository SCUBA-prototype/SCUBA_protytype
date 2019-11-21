import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { PADI_PGI } from "../../api/PADI/PADI_PGI.js";

/** Initialize the database with a default data document. */
function addData(data) {
  console.log("Adding data");
  PADI_PGI.insert(data);
}

/** Initialize the collection if empty. */
if (PADI_PGI.find().count() === 0) {
  if (Meteor.settings.defaultPADI_PGI) {
    console.log("Creating default data table PGI.");
    Meteor.settings.defaultPADI_PGI.map(data => addData(data));
  }
}

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish("PADI_PGI", function publish() {
  if (this.userId) {
    return PADI_PGI.find();
  }
  return this.ready();
});
