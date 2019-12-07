// helper functions

// first users is set to empty array
const users = [];

// all users have an id, name, and room
const addUser = ({ id, name, room }) => {
  // if user adds a name "Wes B"
  // name should return "wesb"

  // names and rooms should be trimmed and lowercase
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // set the users room and the users name === to what they typed in
  const existingUser = users.find(
    user => user.room === room && user.name === name
  );

  // if a name exists, return error
  if (existingUser) {
    return { error: "Username is taken" };
  }

  // a user = id, name, and room
  // push the user into users
  // return user
  const user = { id, name, room };
  users.push(user);
  return { user };
};

// to remove a user, get the index using findIndex
// return the id that matches the id of the user

const removeUser = id => {
  const index = users.findIndex(user => user.id === id);

  // if the index is not = to -1
  // remove it
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// if user id === to id
// user exists
// return user
const getUser = id => users.find(user => user.id === id);

// if user.room === to room
// return rooms
const getUsersInRoom = room => users.filter(user => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };

// now we can properly manage all the users in all specific sockets
