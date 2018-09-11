const brain = require('brain.js');

const network = new brain.NeuralNetwork();

network.train([
    { input: [255, 255, 0, 1], output: [1] },
    { input: [255, 0, 0, 1], output: [0] },
    { input: [255, 255, 255, 1], output: [0] },
    { input: [0, 0, 255, 1], output: [0] },
    { input: [0, 0, 0, 1], output: [0] },
    { input: [255, 255, 0, 1], output: [0] },
    { input: [0, 255, 0, 1], output: [0] },
    { input: [255, 255, 10, 1], output: [1] },
    { input: [255, 255, 20, 1], output: [1] },
    { input: [255, 255, 30, 1], output: [1] },
    { input: [255, 255, 40, 1], output: [1] },
    { input: [255, 255, 50, 1], output: [1] },
]);


const output = network.run([23, 23, 0, 1]);

function diet(prob) {
    if (prob <= 0.5) {
        return `Not yellow at all!`;
    } else if (0.5 < prob <= 0.7) {
        return `Yep, could be yellow`;
    } else {
        return `Wow! Super yellow!`;
    }
};

console.log(diet(output));