import { useState } from "react";
import "./App.css";
import contacts from "./contacts.json";

function App() {
  const [contactList, setContactList] = useState(contacts.slice(0,5));
  const [remainingContacts, setRemainingContacts] = useState(contacts.slice(5,))
  
  const addRandom = ()=> {
    const ind = Math.floor(Math.random()*remainingContacts.length);
    const toAdd=remainingContacts[ind];
    setContactList([...contactList,toAdd]);
    setRemainingContacts(remainingContacts.filter(r=>r.id!=toAdd.id));
  }
  
  const sortName = ()=> {
    const sortedList = [...contactList];
    sortedList.sort((a, b) => (a.name.localeCompare(b.name)));
    setContactList(sortedList);
  }
  
  const sortPopularity = ()=> {
    const sortedList = [...contactList];
    sortedList.sort((a, b) => (b.popularity - a.popularity));
    setContactList(sortedList);
  }
 
  const deleteContact = (id)=> {
    setRemainingContacts([...remainingContacts,contactList.filter((c)=>c.id==id)[0]]);
    setContactList(contactList.filter((c)=>c.id!=id));
  }

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <div className="btn-container">
        <button onClick={addRandom}>Add Random Contact</button>
        <button onClick={sortName}>Sort by Name</button>
        <button onClick={sortPopularity}>Sort by Popularity</button>
      </div>
      <table>
      <thead>
        <th>Picture</th><th>Name</th> <th>Popularity</th>
        <th>Won Oscar</th> <th>Won Emmy</th>
      </thead>
      <tbody>
      {contactList.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img src={contact.pictureUrl} alt={contact.name} height="100"/>
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar&&'🏆'}</td>
              <td>{contact.wonEmmy&&'🌟'}</td>
              <td><button onClick={()=>deleteContact(contact.id)}>Delete</button></td>
              </tr>
              ))}
      </tbody>
      </table>
    </div>
  );
}

export default App;
