let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
var admin = require("firebase-admin");
var serviceAccount = require("./key.json");
  
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chat-application-ff7df.firebaseio.com"
});

io.on("connection", socket => {
  // Log whenever a user connects
  console.log("user connected");
  
  function listAllUsers(nextPageToken) {
    // List batch of users, 1000 at a time.
    admin.auth().listUsers(1000, nextPageToken)
      .then(listUsersResult=> {
        listUsersResult.users.forEach(userRecord => {
          console.log(userRecord);
          socket.on("users", () => {
            io.emit("users", userRecord);
          });
        });
        if (listUsersResult.pageToken) {
          // List next batch of users.
          listAllUsers(listUsersResult.pageToken);
        }
      })
      .catch(function(error) {
        console.log('Error listing users:', error);
      });
  }
  // Start listing users from the beginning, 1000 at a time.
  listAllUsers();
  // Log whenever a client disconnects from our websocket server
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

// Initialize our websocket server on port 3000
http.listen(3000, () => {
  console.log("started on port 3000");
});