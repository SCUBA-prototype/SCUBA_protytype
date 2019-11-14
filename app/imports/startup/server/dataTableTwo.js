import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { DataTableTwo } from "../../api/data/dataTableTwo.js";

/** Initialize the database with a default data document. */
function addData(data) {
  console.log("Adding data");
  DataTableTwo.insert(data);
}

/** Initialize the collection if empty. */
if (DataTableTwo.find().count() === 0) {
  if (Meteor.settings.defaultDataTableTwo) {
    console.log("Creating default data table two.");
    Meteor.settings.defaultDataTableTwo.map(data => addData(data));
  }
}

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish("DataTableTwo", function publish() {
  if (this.userId) {
    return DataTableTwo.find();
  }
  return this.ready();
});
