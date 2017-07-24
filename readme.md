# URL Shortener Microservice

## User stories:

- I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
- When I visit that shortened URL, it will redirect me to my original link.
- If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

### Example creation usage:

```https://u2s.herokuapp.com/add/<b>https://abdelaziz18003.github.io/tic-tac-toe/</b>```


### Example creation output
```{"longUrl": "https://abdelaziz18003.github.io/tic-tac-toe/", "shortUrl": "https://u2s.herokuapp.com/l"}```

### Usage:
<code>https://u2s.herokuapp.com/l</code>

### Will redirect to:
```https://abdelaziz18003.github.io/tic-tac-toe/```
