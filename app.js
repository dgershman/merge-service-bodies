let fs = require('fs');
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

console.log(JSON.stringify(results))

function getServiceBodyMatch(name) {
    for (let item of tomato) {
        if (item['name'] === name) {
            return item
        }
    }

    return null
}