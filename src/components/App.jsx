import React from 'react';
import { nanoid } from 'nanoid';
import { Contacts } from './Contacts/Contacts';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { useState, useEffect } from 'react';
const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const objJSON = JSON.stringify(contacts);
    localStorage.setItem('contacts', objJSON);
  }, [contacts]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('contacts'));

    setContacts(data);
  }, []);

  const onSubmit = contact => {
    const result = contacts.find(item => item.name === contact.name);
    if (result) {
      alert(`${contact.name} is already in contacts.`);
      return;
    } else {
      setContacts([...contacts, { ...contact, id: nanoid() }]);
    }
  };

  const onInputChange = e => {
    setFilter(e.target.value);
  };
  const onDeleteButton = contactId => {
    const filtredArrey = contacts.filter(item => item.id !== contactId);
    setContacts([...filtredArrey]);
  };

  return (
    <>
      <ContactForm onSubmit={onSubmit} />
      <Filter onChange={e => onInputChange(e)} filter={filter} />
      <Contacts contacts={contacts} filter={filter} onDelete={onDeleteButton} />
    </>
  );
};

export default App;
