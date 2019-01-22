const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
    name:               String,
    user:               Object,
    timeleft:           Date,
    author:             String,
    printedyear:        String,
    publishinghouse:    String,
    no:                 String,
})



mongoose.model('Books', BookSchema,"Books");