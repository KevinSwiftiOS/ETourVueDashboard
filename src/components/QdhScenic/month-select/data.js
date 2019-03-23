const months = [];
for (let i = 1; i < 13; i++) {
  months.push({
    label: i + "月",
    value: i > 9 ? i.toString() : "0" + i
  });
}

export default months;
