export default function convertir(str) {
  let array = str.split(" ");

  let result = [];
  for (let i = 0; i < array.length; i++) {
    console.log(
      array[i][0].toUpperCase() +
        array[i].slice(1, array[i].length).toLowerCase()
    );

    result.push(
      array[i][0].toUpperCase() +
        array[i].slice(1, array[i].length).toLowerCase()
    );
  }
  return result.join(" ");
}
