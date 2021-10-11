import React from 'react';
import './PeopleList.css';

// Libraries
import axios from 'axios';
import { motion } from 'framer-motion';

// Components
import PeopleDivider from '../PeopleDivider/PeopleDivider';
import Person from '../Person/Person';

const PeopleList = () => {
  const [people, setPeople] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      let response = null;
      try {
        response = await axios.get('https://2vspad0pd5.execute-api.us-east-1.amazonaws.com/');
        const people = response.data;

        const date = new Date();
        const currentDayNumber = date.getMonth() * 31 + date.getDate();

        people.forEach(person => {
          const temp = person['birthday'].split('-');
          const month = parseInt(temp[1]) || Infinity;
          const day = parseInt(temp[2]) || Infinity;
          const sortNumber = (month-1) * 31 + day;
          person['sort-number'] = sortNumber < currentDayNumber ? sortNumber + 366 : sortNumber;

          const birthdayProximity = person['sort-number'] - currentDayNumber;
          if (birthdayProximity === 0) {
            person['birthday-proximity'] = 'today';
          }
          else if (birthdayProximity <= 14) {
            person['birthday-proximity'] = 'soon';
          }
          else {
            person['birthday-proximity'] = 'far';
          }
        });
        people.sort((a, b) => (a['sort-number'] - b['sort-number']));
        setPeople(people);
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const renderPeople = () => {
    if (people.length < 1) return null;

    const list = [];
    list.push(
      <Person
        key={people[0]['id']}
        firstName={people[0]['first-name']}
        lastName={people[0]['last-name']}
        nickName={people[0]['nickname']}
        birthday={people[0]['birthday']}
        birthdayProximity={people[0]['birthday-proximity']}
        tier={people[0]['tier']}
      />
    );

    for (let i = 1; i < people.length; i++) {
      const person = people[i];
      if (person['birthday-proximity'] !== people[i-1]['birthday-proximity']) {
        list.push(<PeopleDivider />);
      }
      list.push(
        <Person
          key={person['id']}
          firstName={person['first-name']}
          lastName={person['last-name']}
          nickName={person['nickname']}
          birthday={person['birthday']}
          birthdayProximity={person['birthday-proximity']}
          tier={person['tier']}
        />
      )
    }
    
    return list;
  }
  
  return (
    people ? <motion.div
      className="people-list"
      initial={'hidden'}
      animate={'show'}
      transition={{ staggerChildren: 0.05 }}
    >
      <p>Birthdays</p>
      {  
        renderPeople()
        // people.map((person) => (
        //   <Person
        //     key={person['id']}
        //     firstName={person['first-name']}
        //     lastName={person['last-name']}
        //     nickName={person['nickname']}
        //     birthday={person['birthday']}
        //     birthdayProximity={person['birthday-proximity']}
        //     tier={person['tier']}
        //   />
        // ))
      }
    </motion.div> : null
  );
}

export default PeopleList;
