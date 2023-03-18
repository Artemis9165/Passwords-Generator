const btn = document.querySelector("button");
const outputBlock = document.querySelector("#output");
const securityDropdown = document.querySelector("#security");
const timeDropdown = document.querySelector("#time");
btn.addEventListener("click", callPasswords);

const passwords = () => "passwords.json";

const fetchPasswords = async (passwords) => {
  const res = await fetch(passwords);
  const data = await res.json();
  postPasswords(data);
};

const postPasswords = (json) => {
  const filteredPasswords = [];
  json.forEach((password) => {
    if (
      securityDropdown.value == password.strength &&
      timeDropdown.value == password.time_unit
    ) {
      filteredPasswords.push(password.password);
      outputBlock.style.height = "10rem";
      outputBlock.style.backgroundColor = "rgba(0,0,0,0.1)";
      outputBlock.style.lineHeight = "8rem";
      outputBlock.style.textAlign = "center";
      outputBlock.style.verticalAlign = "middle";
      outputBlock.textContent = `Your Password is ${
        filteredPasswords[
          Math.ceil(Math.random() * filteredPasswords.length - 1)
        ]
      }`;
    }
    if (filteredPasswords.length == 0) {
      outputBlock.textContent =
        "There are no passwords that match the criteria";
    }
  });
};

async function callPasswords() {
  const password = passwords();
  await fetchPasswords(password);
}
