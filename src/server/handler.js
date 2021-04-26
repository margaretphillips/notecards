const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

class Handler {
    constructor(querymethod = null, data = null) {
        this.querymethod = querymethod;
        this.data = JSON.stringify(data);
    }

    createNote(data) {
        const file = `./data/notes.json`

        let random = Math.random() * (52310 - 23) + 23;
        let note_set = []
        let notes = fs.readFileSync(file);
        let note = {}

        notes = JSON.parse(notes)
        note_set = notes.filter((i) => i.id != data.id)
        note = {
            id: parseInt(random.toFixed()),
            category: parseInt(data.category),
            theme: parseInt(data.theme),
            priority: parseInt(data.priority),
            title: data.title,
            content: data.content
        }

        note_set = [...note_set, note]
        fs.writeFileSync(file, JSON.stringify(note_set))
        return note_set
    }

    updateNote(data) {
        const file = `./data/notes.json`

        let note_set = []
        let notes = fs.readFileSync(file);

        notes = JSON.parse(notes)
        if (data.id != 0) {
            notes = notes.filter((i) => i.id != data.id)
        } else {
            data.id = parseInt(uuidv4())
        }

        note_set = [...notes, data]
        fs.writeFileSync(file, JSON.stringify(note_set))
        return note_set
    }

    deleteNote(id) {
        const file = `./data/notes.json`

        let note_set = []
        let notes = fs.readFileSync(file);
        let note = {}

        notes = JSON.parse(notes)
        note_set = notes.filter((i) => i.id != id)

        fs.writeFileSync(file, JSON.stringify(note_set))
        return note_set
    }

    getFile(method) {
        let file = ''

        if (method) {
            file = `./data/${method}.json`
        }
        return file
    }

    readFile() {
        let file = this.getFile(this.querymethod)
        let data = fs.readFileSync(file);
        return JSON.parse(data)
    }

    writeFile() {
        let file = this.getFile(this.querymethod)
        fs.writeFileSync(file, this.data);
    }

}

module.exports = Handler;
