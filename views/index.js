const express = require("express");
const movielist = [
    {
        id: "evil-dead",
        title: "Evil Dead",
        description: "Five friends head to a remote} .."
    },
    {
        id: "the-shawshank-redemption",
        title: "The Shawshank Redemption",description: "Andy Dufresne is a young and .."
    }

]
express()
    .get('/', movies)
    .listen(420)

function movies(req, res) {
    res.render('list.ejs', {data: movieslist})
}

