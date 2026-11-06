const bodyElement = document.querySelector("#body");
const bannerTitle = document.createElement("h1");
const bannerCont = document.createElement("div");

bannerTitle.textContent = "Hello World";
bannerTitle.style = "color: red";

bannerCont.style.cssText +=
    "background-color: blue; height: 150px; width: 150px; border-radius: 10px";


bodyElement.appendChild(bannerTitle);
bodyElement.appendChild(bannerCont);


