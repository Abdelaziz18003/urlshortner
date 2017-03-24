function shorten(counter) {

    let alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let shortUrl = [];
    let quotient = Math.floor(counter / alphabet.length);

    while (quotient > 1) {
        shortUrl.push(alphabet[quotient]);
        counter = counter - (quotient * alphabet.length);
        quotient = Math.floor(counter / alphabet.length);
    }

    shortUrl.push(alphabet[counter % alphabet.length]);
    shortUrl = shortUrl.join('');

    return shortUrl;
}

module.exports = shorten;