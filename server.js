const express = require('express')
const app = express()
const port = 3030
const bodyParser = require('body-parser')
const multer = require('multer');

app.use(bodyParser.urlencoded({ extended: true }))

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file.mimetype === 'image/jpg'||
        file.mimetype === 'image/jpeg'||
        file.mimetype === 'image/png'){
        cb(null, 'uploads')
    }else{
        cb(new Error('Not Image'));
    }

    },
    filename: function (req, file, cb) {
        let fileName = file.originalname;
        let arr = fileName.split('.');
        let newFileName = arr[0]+'-'+Date.now() + '.'+arr[1];
        cb(null, newFileName);
    }
})

var upload = multer({ storage: storage,limits:{fileSize:1*1024*1024} })
app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
        const file = req.file
        if (!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return next(error)
        }
        res.send('upLoad thành công');
})

//Uploading multiple files
app.post('/uploadmultiple', upload.array('myFiles', 12/* số lượng file tối đa */), (req, res, next) => {
    const files = req.files
    if (!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(files)
})




app.get('/', (req, res) => {
    res.sendFile(__dirname + '/upload.html');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});