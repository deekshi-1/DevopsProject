const asyncHandler = require('../middleware/asyncHandler');
const service = require('../services/noteService');

const getall = asyncHandler(async (req, res) => {
    try {
        const notes = await service.getall();
        res.status(200).json({ success: true, data: notes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
})

const createNote = asyncHandler(async (req, res) => {
    const { message } = req.body;

    if (!message) {
        res.status(400);
        throw new Error("Message is required");
    }

    const note = await service.createNote(message);

    res.status(201).json({
        success: true,
        data: note
    });
});

const deleteNote = asyncHandler(async (req, res) => {

    const note = await service.deleteNote(req.params.id);

    if (!note) {
        res.status(404);
        throw new Error("Note not found");
    }

    res.status(200).json({
        success: true,
        message: "Note deleted"
    });

});


module.exports = {
    getall,
    createNote,
    deleteNote
};