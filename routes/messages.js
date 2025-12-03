// A simple array to hold messages, simulating a database
let messages = [
    { id: 1, text: "Welcome to the messaging system!", sender: "System", timestamp: new Date() },
    { id: 2, text: "Do not forget the meeting tomorrow.", sender: "Admin", timestamp: new Date() }
];
let nextId = messages.length + 1;

// --- Database Simulation Functions ---

const db = {
    // READ (All)
    getAll: () => messages,

    // READ (One)
    getById: (id) => messages.find(m => m.id === id),

    // CREATE
    create: (text, sender) => {
        const newMessage = {
            id: nextId++,
            text: text,
            sender: sender || "Anonymous",
            timestamp: new Date()
        };
        messages.push(newMessage);
        return newMessage;
    },

    // UPDATE
    update: (id, newText) => {
        const index = messages.findIndex(m => m.id === id);
        if (index > -1) {
            messages[index].text = newText;
            messages[index].timestamp = new Date(); // Update timestamp on edit
            return messages[index];
        }
        return null; // Not found
    },

    // DELETE
    remove: (id) => {
        const initialLength = messages.length;
        messages = messages.filter(m => m.id !== id);
        return messages.length < initialLength; // Return true if deleted
    }
};

module.exports = db;