const ipcRenderer = require("electron").ipcRenderer

const toggle = document.querySelector("#toggle")

const exit = document.querySelector("#exit")
const ul = document.querySelector("#roms-list")
const photo = document.querySelector("#photo")
const info = document.querySelector("#info")
const path = require('path');
exit.addEventListener("click", () => {
    console.log(12)
    ipcRenderer.send("exit")
})
toggle.addEventListener("click", () => {
    console.log(12)
    ipcRenderer.send("toggle")
})
ipcRenderer.on("roms", (event, data) => {
    console.log(data)
    data.forEach(element => {
        let li = document.createElement("li")
        li.className = "rom-li"
        li.innerText = element.title
        li.dataset.key = element.key
        li.dataset.describer = element.describer
        li.onclick = (e) => {
            console.log(e.target.dataset.key)
            info.innerText = e.target.dataset.describer
            ipcRenderer.send("getPhoto", e.target.dataset.key)
        }

        li.ondblclick = (e) => {
            console.log(e.target.dataset.key)
            ipcRenderer.send("play", e.target.dataset.key)
        }
        ul.appendChild(li)
    });
})
ipcRenderer.on("photo", (event, data) => {
    console.log(data)
    let dirpath = path.join(__dirname, `../snap/${data.key}/`)
    // createBannerArea(photo, data)
    let list = data.photos.map((element) => {
        return dirpath + element
    })
    console.log(list)
    createBannerArea(photo, list)
})
ipcRenderer.send("loading")
