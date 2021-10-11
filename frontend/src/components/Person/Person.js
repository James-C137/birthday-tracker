import React from 'react';
import './Person.css';

// Libraries
import { motion } from 'framer-motion';

const numberToMonth = {
  '01': 'Jan.',
  '02': 'Feb.',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'Aug.',
  '09': 'Sept.',
  '10': 'Oct.',
  '11': 'Nov.',
  '12': 'Dec.',
}

const tierDisplayString = {
  '1': 'T1',
  '1.5': 'T1.5',
  '2': 'T2',
  '3': 'T3',
  'family': 'F',
}

const getBirthdayDisplayString = (birthday) => {
  const temp = birthday.split('-');
  const month = numberToMonth[temp[1]];
  const day = temp[2];
  return `${month} ${day}`;
}

const getAge = (birthday) => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const birthYear = parseInt(birthday.split('-')[0]);
  return currentYear - birthYear;
}

const Person = ({firstName, lastName, nickName, birthday, tier}) => {
  const nameDisplayString = `${firstName} ${lastName}${firstName === nickName ? '' : ` (${nickName})`}`;
  const birthdayDisplayString = getBirthdayDisplayString(birthday);
  const currentAge = getAge(birthday);
  // console.log(birthdayDisplayString)

  return(
    <motion.div
      className="person"
      variants={{
        hidden: { y: 32, opacity: 0 },
        show: { y: 0, opacity: 1 },
      }}
      // transition={{ type: 'spring', duration: 0.25 }}
    >
      <div>
        <p className="person-title">{`${nameDisplayString}, ${currentAge}` || 'Name, Age'}</p>
        <p className="person-birthday">{birthdayDisplayString || 'Birthday'}</p>
      </div>
      <p className="person-tier">{tierDisplayString[tier] || 'T?'}</p>
    </motion.div>
  );
}

export default Person;
