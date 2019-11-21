import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Dives } from '../../api/dive/dive.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Dives.insert(data);
}

/** Initialize the collection if empty. */
if (Dives.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Dive', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Dives.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('DiveAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Dives.find();
  }
  return this.ready();
});
