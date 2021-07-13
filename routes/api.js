const fs = require("fs");
const uniqid = require("uniqid");

const main = (app) => {

  app.get("/api/notes", (req, res) => {
    const data = fs.readFileSync("db/db.json", "utf8");
    res.json(JSON.parse(data));
  });

  app.post("/api/notes", (req, res) => {
    const newNote = {
      ...req.body,
      id: uniqid(),
    };
    console.log('nnn', newNote)
    let data = fs.readFileSync("db/db.json", "utf8");

    const dataJSON = JSON.parse(data);

    dataJSON.push(newNote);

    fs.writeFile(
      "db/db.json",
      JSON.stringify(dataJSON),
      (err, text) => {
        if (err) console.error(err)
        console.log("Text", text);
      }
    );
    res.json(data);
  });

  app.delete("/api/notes/:id", (req, res) => {
    let data = fs.readFileSync("db/db.json", "utf8");

    const response = JSON.parse(data);
    const notes = response.filter((note) => {
      return note.id !== req.params.id;
    });
     
    fs.writeFile( "db/db.json", JSON.stringify(notes),(err, text) => {
        if (err) console.error(err)
      });

    res.json(notes);
  });
};

module.exports = main