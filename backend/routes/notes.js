const express = require("express");
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//Route 1
//Get all the notes using: GET "/api/notes/fetchallnotes" (login required)
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json([notes]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Something went wrong");
  }
});

//Route 2
//Add new notes using:POST "/api/notes/addnote" (login required)
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "The length of the title should be alteast 3.").isLength({
      min: 3,
    }),
    body(
      "description",
      "The length of the description should be at least 6."
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //destructuring
      const { title, description, tag } = req.body;

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json([savedNote]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Something went wrong");
    }
  }
);

//Route 3
//Update an existing note using:PUT "/api/notes/updatenote" (login required)
router.put(
    "/updatenote/:id",
    fetchuser,
    async (req, res) => {
        const {title, description, tag} = req.body;

        //create a newNote Object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //Find the note to be updated and update it 
        // const note = Note.findByIdAndUpdate()
        let note = await Note.findById(req.params.id);
        if(!note)
        {
          return res.status(404).send("Not found");
        }
        if(note.user.toString() !== req.user.id)
        {
          return res.status(401).send("Unauthorized");
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({note});
    })
module.exports = router;
