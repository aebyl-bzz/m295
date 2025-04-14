const fs = require('node:fs');

function leseDateiInhalt(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

LesedateiInhalt('besipiel.txt')
    .then((data) => {
        console.log('Länge des Inhalts', data.length);
    })
    .catch((error) => {
        console.error('Fehler beim Lesen der Datei:', error);
    });