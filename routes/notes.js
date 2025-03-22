var express = require("express");
var router = express.Router();
var marked = require("marked");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

/* GET notes listing. */
router.get("/", async (req, res, next) => {
  try {
    const filePath = path.join(__dirname, "../markdown/basics.md");
    const file = await fs.promises.readFile(filePath, "utf8");
    const { data: meta, content: markdownContent } = matter(file);
    const htmlContent = marked.parse(markdownContent);
    res.render("notes", { title: meta.title || "Notes", meta, content: htmlContent });
  } catch (err) {
    next(err); // Pass to Express error handler
  }
});

/* GET notes id. */
router.get("/note/:id", function (req, res, next) {
  res.render("note", { title: "Express" });
});

module.exports = router;
