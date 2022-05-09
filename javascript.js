/* localStorage.setItem("fullname", "Charles Widmore");
 const fullname = localStorage.getItem("fullname");
console.log(fullname);
localStorage.removeItem("fullname");
const fullnameBorrado = localStorage.getItem("fullname");
console.log(fullnameBorrado);  */

onRequest();

async function onRequest() {
  const jwt = localStorage.getItem("jwt");
  try {
    const response = await fetch("http://localhost:1337/api/users/me", {
      method: "GET",
      headers: { Authorization: "Bearer " + jwt },
    });

    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    printData(data);
  } catch (error) {
    console.log(error);
  }
}

function printData(data) {
  const container = document.getElementById("container");

  const p = document.createElement("p");
  const div = document.createElement("div");

  p.textContent = "Bienvenido " + data.name + " " + data.subname;

  div.appendChild(p);
  container.appendChild(div);

  //console.log(data);
}
const borrar = document.getElementById("btRequest2");

borrar.addEventListener("click", () => {
  sendData();
});

function sendData() {
  localStorage.removeItem("jwt");

  window.location.href = "login.html";
}
function checkToken() {
  if (isTokenExpired()) {
    window.location.href = "login.html";
  }
}
checkToken();
