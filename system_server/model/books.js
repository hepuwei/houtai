const mongoose = require("../utils/database");

const Books = mongoose.model("book", {
    booksAuth: String,
    booksName: String,
    booksStatus: String,
    booksPrice: Number,
    booksLogo: String
})

const booksSave = (booksInfo) => {
    let books = new Books(booksInfo);
    return books.save();
}

const booksFindPage = (page, limit) => {
    page = Number(page);
    limit = Number(limit);
    return Books.find().skip((page - 1) * limit).limit(limit);
}

const booksUpdate = (id, booksInfo) => {
    return Books.update({ _id: id }, { $set: booksInfo })
}

const booksDel = (id) => {
    return Books.remove({ _id: id })
}

module.exports = {
    booksSave,
    booksFindPage,
    booksUpdate,
    booksDel
}