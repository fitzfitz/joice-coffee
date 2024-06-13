import { getHours } from "date-fns";

const greetings = () => {
  const userTime = new Date();
  const hour = getHours(userTime);

  if (hour < 12) {
    return "Good morning";
  } else if (hour < 18) {
    return "Good afternoon";
  } else {
    return "Good night";
  }
};

export default greetings;
