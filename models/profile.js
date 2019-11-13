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
    match: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "none"
    },
    // Which console the user is currently wanting to play on
    console: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "noConsole"
    },
    // Call of Duty rank (based on our custom ranks)
    cod_rank: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "notRanked"
    },
    // Rocket League rank 
    rl_rank: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "notRanked"
    },
    // Fortnite rank (based on league)
    fortnite_rank: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "notRanked"
    },
    // Where the player decides what game they currently want to play
    // (Ex: Player could be in the COD room, Rocket League room, or Fortnite room)
    room: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "waiting"
    }
  });
  return Profile;
};
