import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { DataTableOne } from "../../api/data/dataTableOne.js";

/** Initialize the database with a default data document. */
function addData(data) {
  console.log("Adding data");
  DataTableOne.insert(data);
}

/** Initialize the collection if empty. */
if (DataTableOne.find().count() === 0) {
  if (Meteor.settings.defaultDataTableOne) {
    console.log("Creating default data table one.");
    Meteor.settings.defaultDataTableOne.map(data => addData(data));
  }
}

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish("DataTableOne", function publish() {
  if (this.userId) {
    return DataTableOne.find();
  }
  return this.ready();
});
