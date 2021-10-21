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

const getBirthdayInfo = (birthday) => {
  const temp = birthday.split('-');
  // const year = parseInt(temp[0]);
  const month = numberToMonth[temp[1]];
  const day = parseInt(temp[2]);
  return { month, day };
}

const getAge = (birthday) => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const birthYear = parseInt(birthday.split('-')[0]);

  let age = currentYear - birthYear;
  if (
    date.getMonth()+1 <= parseInt(birthday.split('-')[1]) && 
    date.getDate() < parseInt(birthday.split('-')[2])
  ) {
    age--;
  }

  return age;
}

const Person = ({firstName, lastName, nickName, birthday, birthdayProximity, tier}) => {
  const { month, day } = getBirthdayInfo(birthday);
  const titleDisplayString = `${firstName} ${lastName}${firstName === nickName ? '' : ` (${nickName})`}`;
  // const birthdayDisplayString = getBirthdayDisplayString(birthday);
  const currentAge = getAge(birthday);
  // console.log(birthdayDisplayString)

  let classString = 'person';

  if (birthdayProximity === 0) {
    classString += ' birthday-today';
  }
  else if (birthdayProximity <= 14) {
    classString += ' birthday-soon';
  }

  return(
    <motion.div
      className={classString}
      variants={{
        hidden: { y: 32, opacity: 0 },
        show: { y: 0, opacity: 1 },
      }}
    >
      <div className="person-birthday">
        <p className="person-birthday-day">{isNaN(day) ? '???' : day}</p>
        <p className="person-birthday-month">{month ? month : '???'}</p>
      </div>
      <p className="person-title">{`${titleDisplayString}${currentAge ? `, ${currentAge}` : ''}` || 'Name, Age'}</p>
      <p className="person-tier">{tierDisplayString[tier] || 'T?'}</p>
    </motion.div>
  );
}

export default Person;
