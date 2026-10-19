function victoryZoe(params) {
    // console.log("Visctory is awake, While Zoe is not")
}

victoryZoe();

// Sring interpolation
//  const x = 5;
//  const y = 3;
//  console.log("x:", x)
//  console.log(`${x} is greater than ${y}`)
//  console.log(x + " " + "is greater than" + " " + y);

// const fname = "Victory";
// const lname = "Zoe";
// console.log(fname + " is shorter than " + lname)
// console.log(`Result of ${x} and ${y} is: `, x + y)

// If Statements
const x = 5;
const y = 5;
// if (x > y) {
//     console.log("It is greater");
// } else if (x === y) {
//     console.log("They are equal")
// } else {
//     console.log("It is not");
// }

// For Loop
// const nums = [1, 2, 3, 4, 5, 6];
// let total = 0;

// for (let i = 0; i < nums.length; i++) {
//     total += nums[i];
// }
// console.log(total);

// const nums = [1, 2, 3, 4, 5, 6];
// let total = 0;
// for (const num of nums) {
//     total += num;
// }
// console.log(total);


// let y = 0;
// y++;
// while (y < 5) {
//     console.log("It is smaller");
//     break;
// }

// Traditional functions
function calculate(a, b) {
    return a + b;
}

console.log(calculate(5, 5));

// Arrow functions
const calculate = (a, b) => a + b;
console.log(calculate(5, 8))

let sentence = "Victory"
let sentence2 = "  Vi  "
// sentence2.trim()
// console.log("Length: ", sentence.length)
// console.log("Length: ", sentence2.length)



// function showAppropriateWeatherInfo(weather) {
//     switch (weather) {
//         case "rainny":
//             console.log("Don't forget to use your umbrella");
//             break;
//         case "sunny":
//             console.log("Wear your shades");
//             break;
//         default:
//             console.log("Go about your day");
//             break;
//     }
// }

// showAppropriateWeatherInfo("Thunderstorm with hail");