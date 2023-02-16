const sharp = require("sharp");
const fs = require("fs")
const path = require('path')

// const xtend = require("xtend");
const dir = path.join(__dirname, "../web/public/images/collections")

const process = () => {

	fs.readdir(dir,(err, files) => {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file);

			sharp(`${dir}/${file}`)
				.jpeg({ quality: 50 })
				.toFile(`${dir}/munsiko/${file}`, (err, info) => {
					info ? console.log(info) : console.log(err, file);
			});
    })})



};

process();
