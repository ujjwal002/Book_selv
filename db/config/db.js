const mongoose = require("mongoose");

exports.connect = async () => {
  try {
    console.log("getting connected");
    await mongoose.connect(
      "mongodb+srv://root:root@cluster1.otmxfzd.mongodb.net/upwork_learn?retryWrites=true&w=majority&appName=Cluster1"
    );

    console.log("connected succesfully");
  } catch (error) {
    console.log("error connecting database");
  }
};
