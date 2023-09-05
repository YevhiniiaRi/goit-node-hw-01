
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const contacts = require("./db/contacts");

function invokeAction(argv) {
  switch (argv.action) {
    case "list":
      contacts.listContacts().then((allContacts) => {
        console.log("Список контактів:");
        console.log(allContacts);
      });
      break;

    case "get":
      contacts.getContactById(argv.id).then((contact) => {
        if (contact) {
          console.log(`Контакт з ID ${argv.id}:`);
          console.log(contact);
        } else {
          console.log(`Контакт з ID ${argv.id} не знайдений.`);
        }
      });
      break;

    case "add":
      contacts
        .addContact(argv.name, argv.email, argv.phone)
        .then((newContact) => {
          console.log("Новий контакт:");
          console.log(newContact);
        });
      break;

    case "remove":
      contacts.removeContact(argv.id).then((removedContact) => {
        if (removedContact) {
          console.log(`Видалений контакт з ID ${argv.id}:`);
          console.log(removedContact);
        } else {
          console.log(`Контакт з ID ${argv.id} не знайдений.`);
        }
      });
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
