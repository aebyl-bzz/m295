function double(num, callback) {
    const result = num * 2;
    callback(result);
}

double(5, function(result) {
    console.log('Das Ergebnis ist:', result);
});