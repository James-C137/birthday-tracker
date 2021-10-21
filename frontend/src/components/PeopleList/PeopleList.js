import React from 'react';
import './PeopleList.css';

// Libraries
import axios from 'axios';
import { motion } from 'framer-motion';

// Components
// import PeopleDivider from '../PeopleDivider/PeopleDivider';
import Person from '../Person/Person';

const PeopleList = () => {
  const [people, setPeople] = React.useState();

  // Fetch data on initial load
  React.useEffect(() => {
    const fetchData = async () => {
      let response = null;
      try {
        // Fetch and validate data is array
        response = await axios.get('https://2vspad0pd5.execute-api.us-east-1.amazonaws.com/');
        const people = response.data;
        if (!Array.isArray(people)) return;

        // Get current number of day of year as threshold (0-364)
        const date = new Date();
        date.setFullYear(1970);
        const currentDay = Math.floor(date.getTime() / 1000 / 60 / 60 / 24);

        // Add birthday proximity for everyone
        people.forEach(person => {
          const temp = person['birthday'].split('-');
          const date = new Date();
          date.setFullYear(1970);
          date.setMonth(parseInt(temp[1]) - 1, parseInt(temp[2]));

          let proximity = Math.floor(date.getTime() / 1000 / 60 / 60 / 24) - currentDay;
          if (proximity < 0) {
            date.setFullYear(1971);
            proximity = Math.floor(date.getTime() / 1000 / 60 / 60 / 24) - currentDay;
          }
          person['birthday-proximity'] = proximity;
        });
        people.sort((a, b) => (a['birthday-proximity'] - b['birthday-proximity']));
        
        // Update component state
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
    people.forEach((person) => {
      list.push(
        <Person
          key={person['id']}
          firstName={person['first-name']}
          lastName={person['last-name']}
          nickName={person['nickname']}
          birthday={person['birthday']}
          birthdayProximity={isNaN(person['birthday-proximity']) ? 'NaN' : person['birthday-proximity']}
          tier={person['tier']}
        />
      )
    });

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
      { renderPeople() }
    </motion.div> : null
  );
}

export default PeopleList;
