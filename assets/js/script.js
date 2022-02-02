const PUBLIC_KEY = "02d5aabe56c6ebbc7301461783553b53";
const MD5HASH = "9595d209d54310d6c4c460508a52e022";

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
  writer: '<div class="col-6"><strong>Writer:</strong> ',
  editor: '<div class="col-6"><strong>Editor:</strong> ',
  "penciller (cover)": '<div class="col-6"><strong>Penciller Cover:</strong> ',
  penciller: '<div class="col-6"><strong>Penciller:</strong> ',
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
    html += `
    <div
      class="modal fade"
      id="m-${comic.id}"
      aria-hidden="true"
      aria-labelledby="m-${comic.id}Label"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered mw-50">
        <div class="modal-content comicContent">
          <div class="modal-header">
            <h5 class="card-title fs-2">${comic.title}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="d-flex">
              <div class="d-flex align-content-center">
                <img
                  src="${comic.thumbnail.path}.${comic.thumbnail.extension}"
                  class="card-img-top comicCover"
                  alt="${comic.title}"
                />
              </div>
              <div class="container">
                <p class="card-text">
                  ${comic.description ? comic.description : ""}
                </p>
                <div class="row">`;
    comic.creators.items.forEach((creator) => {
      html += CREATOR_ROL[creator.role];
      html += `<p>${creator.name}</p></div>`;
    });
    html += `
                  <div class="col-6">
                    <strong>Publish:</strong>
                    <p>${formaterDate(comic.dates[0].date)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  <div class="col">
    <div class="card h-100">
    <a
      data-bs-toggle="modal"
      href="#m-${comic.id}"
      role="button"
      >
      <img src="${comic.thumbnail.path}.${
      comic.thumbnail.extension
    }" class="card-img-top" alt="${comic.title}">
    </a>
    </div>
  </div>`;
  });

  document.getElementById("comics").innerHTML = html;
};

getData(API);
