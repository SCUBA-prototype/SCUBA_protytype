import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { PADITableOne } from "../../api/PADI/PADITableOne.js";

/** Initialize the database with a default data document. */
function addData(data) {
  console.log("Adding data");
  PADITableOne.insert(data);
}

/** Initialize the collection if empty. */
if (PADITableOne.find().count() === 0) {
  if (Meteor.settings.defaultPADITableOne) {
    console.log("Creating default data table one.");
    Meteor.settings.defaultPADITableOne.map(data => addData(data));
  }
}

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish("PADITableOne", function publish() {
  if (this.userId) {
    return PADITableOne.find();
  }
  return this.ready();
});
