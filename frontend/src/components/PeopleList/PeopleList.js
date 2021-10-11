import React from 'react';
import './PeopleList.css';

// Libraries
import axios from 'axios';

// Components
import Person from '../Person/Person';

// const people = [
//   {
//     id: 'aaa-bbb',
//     firstName: 'Aaa',
//     lastName: 'Bbb',
//     nickName: 'Ab',
//     birthday: '2001-01-01',
//     tier: '1',
//   },
//   {
//     id: 'ccc-ddd',
//     firstName: 'Ccc',
//     lastName: 'Ddd',
//     nickName: 'Cd',
//     birthday: '2002-02-02',
//     tier: '1',
//   },
//   {
//     id: 'eee-fff',
//     firstName: 'Eee',
//     lastName: 'Fff',
//     nickName: 'Ef',
//     birthday: '2003-03-03',
//     tier: '1',
//   },
//   {
//     id: 'ggg-hhh',
//     firstName: 'Ggg',
//     lastName: 'Hhh',
//     nickName: 'Gh',
//     birthday: '2004-04-04',
//     tier: '1',
//   },
// ];

const PeopleList = () => {
  const [people, setPeople] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      let response = null;
      try {
        response = await axios.get('https://2vspad0pd5.execute-api.us-east-1.amazonaws.com/');
        setPeople(response.data);
        console.log(response.data);
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  
  return (
    <div className="people-list">
      <p>Upcoming Birthdays</p>
      {
        people.map((person) => (
          <Person
            key={person['id']}
            firstName={person['first-name']}
            lastName={person['last-name']}
            nickName={person['nickname']}
            birthday={person['birthday']}
            tier={person['tier']}
          />
        ))
      }
    </div>
  );
}

export default PeopleList;
