var fs = require("fs");
var path = require("path");
var matter = require("gray-matter");

// Trying to create a directory map of meta data contained within markdown files to build out navigation.
async function getEntityMetaTree(dir = "../markdown", content = false) {
  const directory = path.resolve(__dirname, dir);

  async function walkSync(dir) {
    let currentObject = {};
    let children = [];
    const currentDir = path.resolve(__dirname, dir);
    if (!fs.existsSync(currentDir)) {
      console.warn(`Directory not found: ${currentDir}`);
      return {};
    }

    // get all files in the directory
    const files = fs.readdirSync(currentDir);
    for (const filename of files) {
      const filePath = path.join(currentDir, filename);
      const stat = fs.statSync(filePath);
      // check if a file is a directory
      if (stat.isDirectory()) {
        // if a directory recursively map the directory tree and push the the child array
        children.push(await walkSync(filePath));
      } else if (path.extname(filename) === ".md") {
        const file = await fs.promises.readFile(filePath, "utf8");
        const { data: meta } = matter(file);
        if (filename === "index.md") {
          currentObject = {
            ...meta,
            path: currentDir,
          };
        } else {
          children.push({
            ...meta,
            path: filePath,
          });
        }
      }
    }

    if (children.length > 0) {
      currentObject.children = children;
    }

    if (!currentObject.title) {
      currentObject.title = path.basename(currentDir);
    }

    return currentObject;
  }

  // reads the markdown directory
  const subjects = fs.readdirSync(directory);

  // recursively maps the file structure
  const data = await Promise.all(
    subjects.map(async (subject) => {
      const subjectDir = path.join(dir, subject);
      return await walkSync(subjectDir);
    })
  );

  return data;
}

module.exports = getEntityMetaTree;
