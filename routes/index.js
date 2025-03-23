var express = require("express");
var router = express.Router();
var getEntityMetaTree = require("../utilities/getEntityMetaTree.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET home page. */
router.get("/dir", async function (req, res, next) {
  try {
    const items = await getEntityMetaTree();
    console.log(items);
    res.status(200).json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
