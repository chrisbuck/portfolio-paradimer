import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
//import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDXd6Ffh0-KJ46TZsD7h37kmftdT4K6Oew",
    authDomain: "paradimer-995e1.firebaseapp.com",
    databaseURL: "https://paradimer-995e1.firebaseio.com",
    projectId: "paradimer-995e1",
    storageBucket: "paradimer-995e1.appspot.com",
    messagingSenderId: "508498890010",
    appId: "1:508498890010:web:4cf37ab4bc4397a3f670a3",
    measurementId: "G-FRSPMDJR4P"
  };

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider,  database as default };

// database.ref('notes').set(notes);

//database.ref().remove();
// database.ref('expenses').push({
//     description: 'Water bill',
//     note: '',
//     amount: 4100,
//     createdAt: 18498239832
// });
// database.ref('expenses').push({
//     description: 'Cable bill',
//     note: '',
//     amount: 11000,
//     createdAt: 1849823982343
// });
// database.ref('expenses').push({
//     description: 'Rent',
//     note: '',
//     amount: 109500,
//     createdAt: 1849823344345
// });

//Retrieve (forEach)
// database.ref('expenses')
//     .once('value')
//     .then((snapshot) => {
//         const expenses = [];

//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         });

//         console.log(expenses);

//     });

database.ref('expenses').on('value', (snapshot)=> {
    const expenses = [];

            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
    
            console.log(expenses);
});

//child_removed
// database.ref('expenses').on('child_removed', (snapshot)=> {
//     console.log(snapshot.key, snapshot.val());
// });

// //child_changed
// database.ref('expenses').on('child_changed', (snapshot)=> {
//     console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_added', (snapshot)=> {
//     console.log(snapshot.key, snapshot.val());
// });
// ref is equivalent of collection or table
// set can take any datatype
// set completely overwrites
// firebase.database().ref().set({
//     name: 'Chris Buck',
//     age: 40,
//     isSingle: true,
//     job: {
//         title: 'Developer',
//         company: 'Culver'
//     },
//     location: {
//         city: 'Boston',
//         country: 'United States'
//     }
// }).then(()=>{

// }).catch((e) => {});

//database.ref().set('This is my data');

// database.ref()
//     .once('value')  // get the data a single time
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     }).catch((e) => {
//         console.log('There was an error', e);
//     });

// If we want database to update us when it changes, use database on
// database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val());
// });
// const onValueChange = database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val());
// });
// database.ref().off();
// database.ref().on('value', (snapshot) => {
//     const val = snapshot.val();
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}.`);
// });



// database.ref('age').set(41);
// database.ref('location/city').set('Epping');

// attributes
    // height
    // weight
// database.ref('attributes').set({
//     height: 76,
//     weight: 200
// });

// Remove method
// database.ref().remove().then(() => {
//     console.log('data was removed');
// }).catch((e) => {
//     console.log('did not remove data', e);
// });

//Can also use set to remove
// database.ref('isSingle').set(null);