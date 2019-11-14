import { Meteor } from "meteor/meteor";
import { Profiles } from "../../api/profile/profile.js";

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.firstName} ${data.lastName} (${data.owner})`);
  Profiles.insert(data);
}

/** Initialize the collection if empty. */
if (Profiles.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log("Creating default profiles.");
    Meteor.settings.defaultProfiles.map(data => addData(data));
  }
}

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish("Profile", function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profiles.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish("Profiles", function publis() {
  if (this.userId) {
    return Profiles.find();
  }
  return this.ready();
});
