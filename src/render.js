const ipcRenderer = require("electron").ipcRenderer
//全屏切换
const toggle = document.querySelector("#toggle")
//退出
const exit = document.querySelector("#exit")
//rom列表容器
const ul = document.querySelector("#roms-list")
//rom 快照容器
const photo = document.querySelector("#photo")
//rom 描述容器
const info = document.querySelector("#info")
const path = require('path');
//全局设定
let selectedItem = null //选中项dom
let selectedItemKey = null //选中项key
function removeSelect() {
    selectedItem && selectedItem.classList.remove("select")
}
//退出监听事件
exit.addEventListener("click", () => {
    ipcRenderer.send("exit")
})
//全屏切换监听事件
toggle.addEventListener("click", () => {
    ipcRenderer.send("toggle")
})

const createLi = (element) => {
    let li = document.createElement("li")
    li.className = "rom-li"
    li.innerText = element.title
    li.dataset.key = element.key
    li.dataset.describer = element.describer
    // 单击选中游戏
    return li
}
//监听获取rom列表
ipcRenderer.on("roms", (event, data) => {
    data.forEach(element => {
        let li = createLi(element)
        // 单击选中游戏
        li.onclick = (e) => {
            let rom = e.target
            //移除选中样式
            removeSelect()
            rom.classList.add("select");
            info.innerText = rom.dataset.describer
            ipcRenderer.send("getPhoto", rom.dataset.key)
            selectedItem = rom
            selectedItemKey = rom.dataset.key
        }
        //双击开始游戏
        li.ondblclick = (e) => {
            console.log(e.target.dataset.key)
            ipcRenderer.send("play", e.target.dataset.key)
        }
        ul.appendChild(li)
    });
})
//监听获取照片
ipcRenderer.on("photo", (event, data) => {
    let dirpath = path.join(__dirname, `../snap/${data.key}/`)
    // createBannerArea(photo, data)
    let list = data.photos.map((element) => {
        return dirpath + element
    })
    createBannerArea(photo, list)
})
//监听错误
ipcRenderer.on("error", (event, error) => {
    alert("错误提示：请确保rom依赖项没有缺失!\n" + error)
})
//开始加载
ipcRenderer.send("loading")
