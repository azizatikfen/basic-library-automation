const mongoose = require('mongoose');
const { Schema } = mongoose;
const UsersSchema = new Schema({
    password:   String,
    username:   String,
    name:       String,
    books:      Array,
    teslim:     Array,
    admin:      Boolean,
    no:         String,
})



mongoose.model('Users', UsersSchema,"Users");