import React from 'react';
import './PeopleList.css';

// Libraries
import axios from 'axios';
import { motion } from 'framer-motion';

// Components
import Person from '../Person/Person';

const PeopleList = () => {
  const [people, setPeople] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      let response = null;
      try {
        response = await axios.get('https://2vspad0pd5.execute-api.us-east-1.amazonaws.com/');
        const people = response.data;
        people.sort((a, b) => {
          const temp0 = a['birthday'].split('-');
          const temp1 = b['birthday'].split('-');
          const months = [parseInt(temp0[1]) || Infinity, parseInt(temp1[1]) || Infinity];
          const days = [parseInt(temp0[2]) || Infinity, parseInt(temp1[2]) || Infinity];

          // Initially, sort by months
          if (months[0] < months[1]) {
            return -1;
          }
          else if (months[0] > months[1]) {
            return 1;
          }
          
          // If same month, sort by day
          if (days[0] < days[1]) {
            return -1;
          }
          else if (days[0] > days[1]) {
            return 1;
          }

          return 0;
        });
        setPeople(people);
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  
  return (
    people ? <motion.div
      className="people-list"
      initial={'hidden'}
      animate={'show'}
      transition={{ staggerChildren: 0.05 }}
    >
      <p>Birthdays</p>
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
    </motion.div> : null
  );
}

export default PeopleList;
