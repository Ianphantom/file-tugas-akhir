export const postAction = (urlToFetch, data) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };
  fetch(urlToFetch, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
