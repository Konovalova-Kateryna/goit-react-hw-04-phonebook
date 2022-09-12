import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { GlobalStyle } from './GlobalStyle';
import { Title } from './Section/SectionTitle.styled';
import { SectionBox } from './Section/SectionTitle.styled';

const LS_KEY = 'Phone-contacts';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LS_KEY)) || [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  const addContact = newContact => {
    console.log(newContact);
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      Notiflix.Notify.failure(`${newContact.name} is alredy in contacts.`);
      return;
    } else if (
      contacts.find(contact => contact.number.toString() === newContact.number)
    ) {
      Notiflix.Notify.failure(`${newContact.number} is alredy in contacts.`);
      return;
    }
    setContacts([newContact, ...contacts]);
    Notiflix.Notify.success(`Contact added`);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
    Notiflix.Notify.warning(`Contact deleted`);
  };
  const filterChange = e => {
    setFilter(e.currentTarget.value);
  };
  const filteredContacts = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.toString().includes(filter)
  );
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <SectionBox>
      <ContactForm createContact={addContact} />
      <Title>Contacts</Title>
      <Filter value={filter} onFilterChange={filterChange} />
      <ContactList options={filteredContacts} onDeleteContact={deleteContact} />

      <GlobalStyle />
    </SectionBox>
  );
};
export default App;
