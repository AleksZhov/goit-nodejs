const fs = require("fs").promises;
const { get } = require("http");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

/*
 * Раскомментируй и запиши значение
 * const contactsPath = ;
 */

const contactsPath = path.join(__dirname, "db/contacts.json");

// function listContact give you opportunity to take list of contacts from contacts.json
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contactsList = JSON.parse(data);
    return contactsList;
  } catch (error) {
    console.log(error.message);
  }
}
// function getContactById give you opportunity to take ONE contact from contacts.json

async function getContactById(contactId) {
  try {
    const contactsList = await listContacts();
    const idx = contactsList.findIndex((contact) => contact.id === contactId);
    if (idx === -1) {
      throw new Error(`Contact with id ${contactId} doesn't exixt`);
    }

    return contactsList[idx];
  } catch (error) {
    console.log(error.message);
  }
}

// function removeContact give you opportunity to DELETE contact from contacts.json

async function removeContact(contactId) {
  try {
    const contactsList = await listContacts();
    const newContactList = await contactsList.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContactList));
  } catch (error) {
    console.log(error.message);
  }
}
// function addContact give you opportunity to ADD contact to contacts.json file

async function addContact(name, email, phone) {
  try {
    const newContact = { id: uuidv4(), name, email, phone };
    const contactsList = await listContacts();
    contactsList.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
