module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define("Profile", {
    // The players gamer tag 
    // (they will need to be able to edit this in case they switch consoles)
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Which console the user is currently wanting to play on
    // They can leave blank if no preference
    console: {
      type: DataTypes.STRING
    },
    // Call of Duty rank
    cod_rank: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "not ranked"
    },
    // Rocket League rank
    rl_rank: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "not ranked"
    },
    // Fortnite rank
    fortnite_rank: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "not ranked"
    },
    // Where the player decides what game they currently want to play
    // (Ex: Player could be in the COD room, Rocket League room, or Fortnite room)
    room: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "waiting"
    },
    // If the user is logged in to our site or not
    loggedin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
  return Profile;
};
