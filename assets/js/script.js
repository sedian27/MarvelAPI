const API = `https://gateway.marvel.com/v1/public/comics?ts=1&apikey=${PUBLIC_KEY}&hash=${MD5HASH}&orderBy=title`;

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getData = (api) => {
  return fetch(api)
    .then((res) => res.json())
    .then((data) => fillData(data.data.results))
    .catch((err) => console.error("API error:", err));
};

const CREATOR_ROL = {
  writer: '<li class="list-group-item"><strong>Writer:</strong> ',
  editor: '<li class="list-group-item"><strong>Editor:</strong> ',
  "penciller (cover)":
    '<li class="list-group-item"><strong>Penciller Cover:</strong> ',
  penciller: '<li class="list-group-item"><strong>Penciller:</strong> ',
};

const formaterDate = (date) => {
  let newDate = new Date(date);
  return `${
    MONTHS[newDate.getMonth()]
  } ${newDate.getDate()}, ${newDate.getFullYear()}`;
};

const fillData = (comics) => {
  let html = "";
  comics.forEach((comic) => {
    html += '<div class="col">';
    html += `<div class="card h-100 p-2">`;
    html += `<img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" class="card-img-top" alt="${comic.title}">`;
    html += '<div class="card-body fs-5">';
    html += `<h5 class="card-title fs-2">${comic.title}</h5>`;
    html += `<p class="card-text">${
      comic.description ? comic.description : ""
    }</p>`;
    html += "</div>";
    html += '<ul class="list-group list-group-flush">';
    comic.creators.items.forEach((creator) => {
      html += CREATOR_ROL[creator.role];
      html += `${creator.name}</li>`;
    });
    html += `<li class="list-group-item"><strong>Publish:</strong> ${formaterDate(
      comic.dates[0].date
    )}</li>`;
    html += "</ul>";

    html += "</div>";
    html += "</div>";
  });

  document.getElementById("comics").innerHTML = html;
};

getData(API);
