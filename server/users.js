// helper functions

const users = [];

const addUser = ({ id, name, room }) => {
  // if user adds a name "Wes B"
  // name should return "wesb"

  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    user => user.room === room && user.name === name
  );

  if (existingUser) {
    return { error: "Username is taken" };
  }

  const user = { id, name, room };
  users.push(user);
  return { user };
};

const removeUser = id => {
  const index = users.findIndex(user => user.id === id);

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
