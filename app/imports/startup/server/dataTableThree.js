import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { DataTableThree } from "../../api/data/dataTableThree.js";

/** Initialize the database with a default data document. */
function addData(data) {
  console.log("Adding data");
  DataTableThree.insert(data);
}

/** Initialize the collection if empty. */
if (DataTableThree.find().count() === 0) {
  if (Meteor.settings.defaultDataTableThree) {
    console.log("Creating default data table three.");
    Meteor.settings.defaultDataTableThree.map(data => addData(data));
  }
}

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish("DataTableThree", function publish() {
  if (this.userId) {
    return DataTableThree.find();
  }
  return this.ready();
});
