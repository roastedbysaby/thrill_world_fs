import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

export const User = mongoose.model('User', userSchema);


// export const userSchema = new Schema({
//     id: {

//     },
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         lowercase: true,
//         match: [/^[a-zA-Z0-9]+(?:[.-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*\.(?=.{2,63}$)[a-zA-Z0-9](?:-[a-zA-Z0-9]+)*$/.test(email.trim())]
//     }
// })