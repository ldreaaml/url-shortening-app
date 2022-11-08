const navBtn = document.getElementById("menu-btn");
const nav = document.getElementById("menu");
const shortenBtn = document.getElementById("shorten-btn");
const error = document.getElementById("error");
const form = document.getElementById("form");
const input = document.getElementById("txtBox");
const result = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");

navBtn.addEventListener("click", () => {
  navBtn.classList.toggle("open");
  nav.classList.toggle("flex");
  nav.classList.toggle("hidden");
});

input.addEventListener("input", () => {
  error.classList.add("hidden");
  input.classList.remove("txtBoxWarning");
});

form.addEventListener("submit", () => {
  if (input.value.match("^$")) {
    error.classList.remove("hidden");
    input.classList.add("txtBoxWarning");
    error.innerText = "Please add a link";
  } else {
    // make api call
    const url = input.value;
    getShortenedLink(url)
      .then((data) => {
        document.getElementById("original-link").innerText = url;
        document.getElementById("short-link").innerText =
          data.result.short_link;
      })
      // invalid link provided or failed to fetch
      .catch(() => {
        error.classList.remove("hidden");
        input.classList.add("txtBoxWarning");
        error.innerText = "Invalid URL. Please try again";
      });
  }
});

//copy to clipboard
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(copyBtn.previousElementSibling.innerHTML);
  copyBtn.innerText = "Copied!";
  copyBtn.classList.add("copiedBtn");
});

async function getShortenedLink(link) {
  const url = "https://api.shrtco.de/v2/shorten?url=" + link;
  console.log(url);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);

    return result;
  } catch (err) {
    console.log(err);
  }
}
