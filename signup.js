const input = document.getElementById("input");
const result = document.getElementById("result");
input.oninput = function () {
  result.value = input.value;
};
const form = document.getElementById("container");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendData(form);
});

async function sendData(form) {
  try {
    const formData = new FormData(form);
    const queryString = new URLSearchParams(formData).toString();
    const response = await fetch(
      "http://localhost:1337/api/auth/local/register",
      {
        method: "POST",
        body: queryString,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();
    console.log(data);
    getData(data);
  } catch (error) {
    console.log(error);
  }
}

function getData(data) {
  //console.log(data.jwt);

  localStorage.setItem("jwt", data.jwt);

  window.location.href = "index.html";
}
