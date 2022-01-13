import ohce from "./ohce.js";
import input from 'readline-sync';


const clock = {hour: () => new Date().getHours()};
const userInput = {get: () => input.question("")};
const display = {show: console.log};

const userName = getUserName();

ohce(clock, userInput, display).run(userName);

process.exit(0)

function getUserName() {
    const args = process.argv.slice(2);

    if(args.length === 0) {
        console.log("ohce: missing userName");
        process.exit(1);
    }

    return args[0];
}
