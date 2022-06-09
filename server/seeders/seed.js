const db = require("../config/connection");
const { User, Location } = require("../models");
const userSeeds = require("./userSeeds.json");
const locationSeeds = require("./locationSeeds.json");

db.once("open", async () => {
  try {
    await Location.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < locationSeeds.length; i++) {
      const { _id, locationAuthor } = await Location.create(locationSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: locationAuthor },
        {
          $addToSet: {
            locations: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
