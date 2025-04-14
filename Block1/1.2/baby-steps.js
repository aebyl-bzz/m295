console.log(process.argv)

const args = process.argv.slice(2);
const sum = args.reduce((total, num) => total + Number(num), 0);
console.log(sum);

