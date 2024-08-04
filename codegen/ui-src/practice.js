//funtion to explain difference between promise and observable
// Promise is a one time event, it can be resolved or rejected
// Observable is a stream of events, it can be resolved or rejected
// Promise is eager, it starts to execute immediately
// Observable is lazy, it waits for subscription to start execution
// Promise is not cancelable
// Observable is cancelable
// Promise is not chainable
// Observable is chainable
// Promise is not lazy
// Observable is lazy
// Promise is not retryable
// Observable is retryable
// Promise is not repeatable
// Observable is repeatable
// Promise is not pausable
// Observable is pausable

//create three promises and explain promise.allSettled, promise.all, promise.any, promise.race
//promise.allSettled
// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('promise1 resolved');
//     }, 1000);
// });
// const promise2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject('promise2 rejected');
//     }, 2000);
// });
// const promise3 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('promise3 resolved');
//     }, 3000);
// });
// // Promise.allSettled([promise1, promise2, promise3]).then((result) => {
// //     console.log(result);
// // });
// //promise.all
// const promise4 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve
//         ('promise4 resolved');
//         // reject
//         // ('promise4 resolved');
//     }
//     , 1000);
// }
// );
// const promise5 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve
//         ('promise5 resolved');
//     }
//     , 2000);
// }
// );
// const promise6 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve
//         ('promise6 resolved');
//     }
//     , 3000);
// }
// );
// // Promise.all([promise4, promise5, promise6]).then((result) => {
// //     console.log("promise.all ",result);
// // });
// //catch errors from promise.all
// Promise.all([promise4, promise5, promise6]).then((result) => {
//     console.log("promise.all ",result);
// }).catch((error) => {
//     console.log("promise.all error ",error);
// });


// //promise.any
// const promise7 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve
//         ('promise7 resolved');
//     }
//     , 1000);
// }
// );
// const promise8 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject
//         ('promise8 rejected');
//     }
//     , 2000);
// }
// );
// const promise9 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve
//         ('promise9 resolved');
//     }
//     , 3000);
// }
// );
// Promise.any([promise7, promise8, promise9]).then((result) => {
//     console.log(result
//     );
// }
// );
// //promise.r
// const promise10 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve
//         ('promise10 resolved');
//     }
//     , 1000);
// }
// );
// const promise11 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject
//         ('promise11 rejected');
//     }
//     , 2000);
// }
// );
// const promise12 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve
//         ('promise12 resolved');
//     }
//     , 3000);
// }
// );
// //promise.race for promise10, promise11, promise12
// Promise.race([promise10, promise11, promise12]).then((result) => {
//     console.log(result
//     );
// });


//write a funtion to flatten an array of arrays of objects
//flatten array of arrays of objects
const arr = [
    [
        [{
            name: 'name1'
        }],[{
            name: 'name1'
        }],
        {
            name: 'name1'
        }
    ],
    [
        {
            name: 'name2'
        }
    ],
    [
        {
            name: 'name3'
        }
    ]
];

const flattenArray = (arr) => {
    return arr.reduce((acc, val) => acc.concat(val), []);
};
console.log(flattenArray(arr));

//write a funtion to flatten an array of arrays of objects without using reduce
//flatten array of arrays of objects without using reduce
const arr1 = [
    [
        {
            name: 'name1'
        }
    ],
    [
        {
            name: 'name2'
        }
    ],
    [
        {
            name: 'name3'
        }
    ]
];
const flattenArrayWithoutReduce = (arr) => {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        result = result.concat(arr[i]);
    }
    return result;
};
console.log(flattenArrayWithoutReduce(arr));

//Flatten object withour reduce
const obj = {
    a: {
        b: {
            c: {
                d: 1
            }
        }
    }
};
const flattenObject = (obj) => {
    let result = {};
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            const temp = flattenObject(obj[key]);
            for (let key1 in temp) {
                result[key + '.' + key1] = temp[key1];
            }
        } else {
            result[key] = obj[key];
        }
    }
    return result;
};