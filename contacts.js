const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./bd/contacts.json");

const id = () => new Date().getTime();

const getAll = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const updateContacts = async (newData) => {
  const data = await getAll();
  data.push(newData);
  const string = JSON.stringify(data);

  await fs.writeFile(contactsPath, string);
};

const listContacts = async () => {
  return await getAll();
};

const getContactById = async (contactId) => {
  const data = await getAll();
  const dataId = data.filter((x) => x.id === contactId.toString());
  return dataId;
};

const removeContact = async (contactId) => {
  const data = await getAll();
  const newData = data.filter((x) => x.id !== contactId.toString());
  const string = JSON.stringify(newData);

  await fs.writeFile(contactsPath, string);
  return newData;
};

const addContact = async (name, email, phone) => {
  const newContacts = {
    id: id().toString(),
    name,
    email,
    phone,
  };

  await updateContacts(newContacts);
  return getAll();
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
