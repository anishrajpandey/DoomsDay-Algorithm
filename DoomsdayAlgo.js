// const prompt = require("prompt-sync")();

var numericDays = [
  //for indexing the days according to the number
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var DoomsDay = {
  //list of doomsday for a particular monnth month:doomsday
  3: 14,
  4: 4,
  6: 6,
  8: 8,
  10: 10,
  12: 12,
  9: 5,
  5: 9,
  7: 11,
  11: 7,
};
function getDoomsDayForCentury(century) {
  //Returns a doomsday for a century which helps to find a doomsday for a year falling in that century
  var n = 1;
  var dayCode = null;

  while (dayCode == null) {
    if (century < 20) {
      // the increasing pattern of century with the pattern of doomsday (2 0 5 3)
      if (century == 20 - 4 * n) {
        dayCode = 2;
      } else if (century == 20 - 4 * n + 1) {
        dayCode = 0;
      } else if (century == 20 - 4 * n + 2) {
        dayCode = 5;
      } else if (century == 20 - 4 * n + 3) {
        dayCode = 3;
      }
    }
    if (century > 20) {
      // the decreasing pattern of century with the pattern of doomsday (2 0 5 3)
      if (century == 20 + 4 * n) {
        dayCode = 2;
      } else if (century == 20 + 4 * n - 1) {
        dayCode = 3;
      } else if (century == 20 + 4 * n - 2) {
        dayCode = 5;
      } else if (century == 20 + 4 * n - 3) {
        dayCode = 0;
      }
    }

    if (century == 20) {
      dayCode = 2;
    }
    if (dayCode != null) return dayCode;
    n += 1;
  }
}
function getDoomsDayForYear(Year) {
  //returns a doomsday for a year after adding doomsday of century + leap years
  let centuryCode = getDoomsDayForCentury(parseInt(Year / 100));
  let ActualDayCode =
    (centuryCode +
      (Year - parseInt(Year / 100) * 100) +
      parseInt((Year - parseInt(Year / 100) * 100) / 4)) %
    7;
  return ActualDayCode;
}

const isLeapYear = (year) => {
  //to check if the year is leap year or not
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      if (year % 400 === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } else {
    return false;
  }
};
//function to print out the day
function getActualDay(year, month, day) {
  let doomsDay = getDoomsDayForYear(year); //to get the  doomsday for the year
  month = parseInt(month); // to convert to int
  day = parseInt(day); // to convert to int
  let DoomsDayForMonth = DoomsDay[month]; // get the day of the month on which doomsday falls
  if (month == 1) {
    DoomsDayForMonth = isLeapYear(year) ? 4 : 3; //for leap year in jan and feb
  } else if (month == 2) {
    DoomsDayForMonth = isLeapYear(year) ? 29 : 28;
  }

  let difference = Math.abs(DoomsDayForMonth - day); //difference between doomsday date and user entered date
  let significantDay = difference % 7; //modulus of 7 because after 7 days same day repeats

  significantDay =
    day > DoomsDayForMonth ? significantDay : -1 * significantDay; //if the user entered date is smaller we have to add otherwise we have to subtract some numbers to get to the doomsday
  let dayIndex = (significantDay + doomsDay) % 7; //adding the difference day to doomsday
  if (dayIndex < 0) {
    dayIndex += 7; //because when we subtract 1 from 0, it gives -1 ,but should give 6
  }

  let FoundDay = numericDays[Math.abs(dayIndex)]; //refering to the array of day with index as day
  // document.querySelector("h1").innerText = `\nThe Day is ${FoundDay}\n\n`; //final resullt... //todo later
  document.querySelector("span").innerText = FoundDay;
  colorizeText(FoundDay);
  // console.log("Again(Y/N)??");
  // let ask = prompt("Again?(Y/N)");
  // ask.toLowerCase() == "y" ? main() : console.log("\nThank You");
}
function colorizeText(pday) {
  // console.log(pday);

  let day = document.getElementById("day");
  if (pday === "Sunday") {
    day.style.color = "red";
  } else if (pday === "Monday") {
    day.style.color = "turquoise";
  } else if (pday === "Tuesday") {
    day.style.color = "violet";
  } else if (pday === "Wednesday") {
    day.style.color = "#ffcc00";
  } else if (pday === "Thursday") {
    day.style.color = "#6666ff";
  } else if (pday === "Friday") {
    day.style.color = "#00cc00";
  } else if (pday === "Saturday") {
    day.style.color = "#ff9966";
  } else {
    day.style.color = "#22c7ff";
  }
}
//main function
function main() {
  let year = document.getElementById("year").value;
  let month = document.getElementById("month").value;
  let day = document.getElementById("weekday").value;
  // console.dir(day);
  console.log(year, month, day);
  // console.log("Enter the month (in number)");
  // let month = prompt("Enter the month (in number)");
  // console.log("Enter date");
  // let day = prompt("Enter date");
  getActualDay(year, month, day); //calling the function to print the day
}

//main execution
document.querySelector("form").onsubmit = (e) => {
  e.preventDefault();
  main();
};
// PRETTY COOL, HUH!
