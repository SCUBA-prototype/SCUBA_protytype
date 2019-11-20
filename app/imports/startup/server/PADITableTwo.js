import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { PADITableTwo } from "../../api/PADI/PADITableTwo.js";

/** Initialize the database with a default data document. */
function addData(data) {
  console.log("Adding data");
  PADITableTwo.insert(data);
}

/** Initialize the collection if empty. */
if (PADITableTwo.find().count() === 0) {
  if (Meteor.settings.defaultPADITableTwo) {
    console.log("Creating default data table two.");
    Meteor.settings.defaultPADITableTwo.map(data => addData(data));
  }
}

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish("PADITableTwo", function publish() {
  if (this.userId) {
    return PADITableTwo.find();
  }
  return this.ready();
});
