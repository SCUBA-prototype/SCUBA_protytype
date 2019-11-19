import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Dives } from '../../api/dive/dive.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} `);
  Dives.insert(data);
}


/** Initialize the collection if empty. */
if (Dives.find().count() === 0) {
  if (Meteor.settings.defaultDives) {
    console.log('Creating default data.');
    Meteor.settings.defaultDives.map((data) => addData(data));
  } else console.log(`default dives not intitialized`)
}


/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Dives', function publish() {
    return Dives.find({depth: {
      $lt: 150
      }}, {limit: 1});
  return this.ready();
});

Meteor.publish('DivesByName', function publish(name) {
  return Dives.find({depth: {
      $lt: 150
    }, name});
  return this.ready();
});
