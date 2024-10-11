const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "wallpapaer-app",
    api_key: "154969314495714",
    api_secret: "7N8DDGzpHhKXRPVEbbKshk8RaHQ"
});


module.exports = cloudinary;