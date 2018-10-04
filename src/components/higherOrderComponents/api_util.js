// "Accept", "application/json"
// "https://icanhazdadjoke.com/"

export const fetchJoke = () => {
  const headers = new Headers();
  headers.append("Accept", "application/json");

  return fetch("https://icanhazdadjoke.com/", {
    method: "GET",
    headers
  }).then(response => response.json());
};

// const fetchJoke = async () => {
//   const headers = new Headers();
//   headers.append("Accept", "application/json");
//
//   const response = await fetch("https://icanhazdadjoke.com/", {
//     method: "GET",
//     headers
//   });
//
//   return await response.json();
//
// };

export default fetchJoke;
