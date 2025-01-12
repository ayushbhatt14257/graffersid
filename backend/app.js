const express = require("express");
const app = express();
const cors = require('cors');

const path = require("path");



require('dotenv').config();
require("./db/conn");

const companyRoutes = require("./routes/companyRoutes")

app.use(cors());
app.use(express.json());
app.use(companyRoutes);


let PORT = process.env.PORT || 8000;

const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, '/frontend/build')));
app.get('*', (req, res) =>
    res.sendFile(path.join(_dirname, '/frontend/build/index.html'))
);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("frontend/build"));
}

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

