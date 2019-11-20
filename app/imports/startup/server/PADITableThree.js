import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { PADITableThree } from "../../api/PADI/PADITableThree.js";

/** Initialize the database with a default data document. */
function addData(data) {
  console.log("Adding data");
  PADITableThree.insert(data);
}

/** Initialize the collection if empty. */
if (PADITableThree.find().count() === 0) {
  if (Meteor.settings.defaultPADITableThree) {
    console.log("Creating default data table three.");
    Meteor.settings.defaultPADITableThree.map(data => addData(data));
  }
}

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish("PADITableThree", function publish() {
  if (this.userId) {
    return PADITableThree.find();
  }
  return this.ready();
});
