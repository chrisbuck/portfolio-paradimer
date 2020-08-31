// const person = {
//     name: 'Andrew',
//     age: 26,
//     location: {
//         city: 'Philapelphia',
//         temp: 92
//     }
// }

// const {name: firstName  = 'Anonymous', age} = person;

// console.log(`${firstName} is ${age}`);

// const { city, temp } = person.location;

// if( city && temp ){
//     console.log(`It's ${temp} in ${city}.`);
// }

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// const { name: publisherName = 'Self-published' } = book.publisher;

// console.log(publisherName);

// const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];

// const [street, city, state = 'New York'] = address;

// console.log(`You are in ${city} ${state}.`);

const item = ['Coffee (iced)', '$3.00', '$3.50', '$3.75'];
const [itemName, , mediumPrice] = item;
//grab first and third items using array destructuring
console.log(`A medium ${itemName} costs ${mediumPrice}`);
