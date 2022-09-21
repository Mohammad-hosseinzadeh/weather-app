// `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`
// https://api.openweathermap.org/data/2.5/weather?q=tehran&appid=d747e5dfad868acd171619339a5fb192&units=metric


// variabels
const form = document.querySelector("form");
const input = document.querySelector("input");
const msg = document.querySelector(".msg");
const list = document.querySelector(".cities");
const apiKey = "d747e5dfad868acd171619339a5fb192";

// eventListener
eventListener();
function eventListener() {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputValue = input.value;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const { main, name, sys, weather } = data;
                const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
                const li = document.createElement("li");
                li.classList.add("city");
                const markup = `
                    <h2 class="city-name" data-name=${name},${sys.country}>
                    <span>${name}</span>
                    <span>${sys.country}</span>
                    </h2>
                    <div class="city-temp">${Math.round(main.temp)}</div>
                    <figure>
                    <img class="city-icon" src='${icon}'alt="city">
                    <figcaption>${weather[0]["description"]}</figcaption>
                    </figure>
                `;
                li.innerHTML = markup;
                list.appendChild(li);
                msg.innerHTML = "";
            })
            // show error msg for invalid city name
            .catch(() => {
                msg.innerHTML = "search for valid city";
            });
        // clear the input after entering the name of a city
        input.value = "";
    });
}
