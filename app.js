let fs = require('fs');
var stringify = require('csv-stringify');
const phone_numbers = JSON.parse(fs.readFileSync('phone_numbers.json', 'utf8'));
const tomato = JSON.parse(fs.readFileSync('tomato.json', 'utf8'));
let results = [];

for (let item of phone_numbers) {
    let match = getServiceBodyMatch(item['name'])
    if (match !== null) {
        match['helpline'] = item['helpline']
        results.push(match)
    } else {
        results.push(item)
    }
}
stringify(results, (err, output) => {
    fs.writeFile('results.csv', output, 'utf8', err => {
        if (err) {
            console.log(err);
        }
    })
});

function getServiceBodyMatch(name) {
    for (let item of tomato) {
        if (item['name'] === name) {
            return item
        }
    }

    return null
}