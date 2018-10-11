const fetchJoke = async () => {
  const headers = new Headers();
  headers.append("Accept", "application/json");

  const response = await fetch("https://icanhazdadjoke.com/", {
    method: "GET",
    headers
  });

  return await response.json();
};

// The above is the new async/await syntax. Look it up! Use it! It's amazing.
// Its the equivalent of this code below:

export const oldStyleFetchJoke = () => {
  const headers = new Headers();
  headers.append("Accept", "application/json");

  return fetch("https://icanhazdadjoke.com/", {
    method: "GET",
    headers
  }).then(response => response.json());
};

export default fetchJoke;
