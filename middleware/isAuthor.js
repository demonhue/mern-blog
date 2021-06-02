//its gonna send along a token
function isAuthor(req, res, next) {
    //console.log("isAuthor", req.user.name, req.body.author);
    //console.log('>>>>>>>>>>>>>>>>', req);
    if (req.user.name != req.body.author) return res.status(403).json({ msg: "The user is not the author!" });
    next();
}

module.exports = isAuthor;