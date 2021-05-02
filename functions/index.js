const functions = require("firebase-functions");

const fetch = require("node-fetch");

const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

// exports.sendPushNotification = functions.firestore
//   .document("publicgroups/{docId}")
//   .onWrite((change, context) => {
//     /* ... */
//   });

exports.sendPushNotification = functions.firestore
  .document("publicgroups/{docId}")
  .onUpdate((change, context) => {
    console.log("change after", change.after.data());
    // console.log("change before", change.before.data());
    const noti = change.after.data();
    let messages = [];

    return (
      admin
        .firestore()
        .collection("users")
        .get()
        .then((data) => {
          data.forEach((doc) => {
            const expoToken = doc.data().expoPushToken;
            const userId = doc.data().id;
            console.log("expoPushToken", expoToken);
            if (expoToken && noti.userID !== userId) {
              messages.push({
                to: expoToken,
                title: `#${noti.groupName}`,
                body: noti.lastmessage,
              });
            }
          });
          return Promise.all(messages);
        })
        // eslint-disable-next-line promise/always-return
        .then((messages) => {
          fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(messages),
          });
        })
        .catch((reason) => {
          console.log(reason);
        })
    );

    // admin
    //   .firestore()
    //   .collection("users")
    //   .get()
    //   .then((data) => {
    //     // return data;
    //     data.forEach((doc) => {
    //       console.log("userrrssss", doc.data().expoPushToken);
    //       return doc.data();
    //     });
    //   });
    // console.log("users", users);

    // // Get an object representing the document
    // // e.g. {'name': 'Marie', 'age': 66}
    // const newValue = change.after.data();
    // // ...or the previous value before this update
    // const previousValue = change.before.data();

    // // access a particular field as you would any JS property
    // const name = newValue.name;

    // // perform desired operations ...
  });
// exports.createUser = functions.firestore
//   .document("users/{userId}")
//   .onCreate((snap, context) => {
//     // Get an object representing the document
//     // e.g. {'name': 'Marie', 'age': 66}
//     const newValue = snap.data();

//     // access a particular field as you would any JS property
//     const name = newValue.name;

//     // perform desired operations ...
//   });
