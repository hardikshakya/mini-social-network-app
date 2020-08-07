const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const l10n = require("jm-ez-l10n");

l10n.setTranslationsFile("en", "./language/translation.en.json");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(l10n.enableL10NExpress);
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ limit: "1gb", extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "1gb" }));
app.use(cors());
app.use("/api", require("../routes"));

module.exports = app;
