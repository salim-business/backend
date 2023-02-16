var objs = [
  { first_nom: "Lazslo", last_nom: "zamf" },
  { first_nom: "Lazslo", last_nom: "Jamf" },
  { first_nom: "Pig", last_nom: "Bodine" },
  { first_nom: "Pirate", last_nom: "Prentice" },
];

function compare(a, b) {
  if (a.last_nom < b.last_nom) {
    return 1;
  }
  if (a.last_nom > b.last_nom) {
    return -1;
  }
  return 0;
}

const newArr = objs.sort(compare);
console.log(newArr);
