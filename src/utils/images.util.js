const formidable = require("formidable");

const storeImage = async(req) => {
    const form = new formidable.IncomingForm();

    form
    .parse(req, async(err, fields, files) => {
        const file = files.profile;
        const ext = file.mimetype.split("/")[1];
        
        const dirFile = path.join(__dirname, `../../public/img/photos/${fileName}.${ext}`);
        fs.copyFileSync(file.filepath, dirFile);

    });

}

module.exports = {
    storeImage,
}