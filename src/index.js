const toysUrl = "http://localhost:3000/toys";
const toyCollection = document.querySelector("#toy-collection");

let addToy = false;

const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});

function postToy(toy) {
  return fetch(toysUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(toy),
  });
}

function rendertoy(toy) {
  const card = document.createElement("div");
  card.innerHTML = `
      <div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar"/>
    <span>${toy.likes}</span>
    <button class="like-btn" id="likeBttn">Like</button>
    <button class="like-btn" id="deleteBtnn">Delete</button>
  </div>`;
  card.querySelector("#likeBttn").addEventListener("click", () => {
    const addLike = (toy.likes += 1);
    card.querySelector("span").textContent = addLike;
    updateLikes(toy);
  });
  card.querySelector("#deleteBtnn").addEventListener("click", () => {
    card.remove();
    deleteCard(toy);
  });

  toyCollection.append(card);
}

function submitToy(toy) {
  postToy(toy)
    .then((res) => res.json())
    .then((res) => rendertoy(res));
}

const createToy = document.querySelector(".submit");

createToy.addEventListener("click", function (e) {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const image = document.querySelector("#image").value;

  const toy = {
    name: name,
    image: image,
    likes: 0,
  };

  submitToy(toy);
});
function updateLikes(toy) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(toy),
  });
}

function deleteCard(toy) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(toy),
  });
}

// renders all toys in DataBase
fetch(toysUrl)
  .then((res) => res.json())
  .then((toys) =>
    toys.forEach((toy) => {
      rendertoy(toy);
    })
  );
