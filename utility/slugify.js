const MY_DOB = "1999-07-02";
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-");
};

export const getMyCurrentAge = () => {
  const birthMonth = new Date(MY_DOB).getMonth() + 1;
  const birthYear = new Date(MY_DOB).getFullYear();
  const currentMonth = new Date("2025-03-11").getMonth() + 1;
  const currentYear = new Date("2025-03-11").getFullYear();
  let years = currentYear - birthYear;
  let months = currentMonth - birthMonth;
  if (months < 0) {
    years--;
    months += 12;
  }
  return years;
};
