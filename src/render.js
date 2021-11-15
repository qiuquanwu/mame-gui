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

// 下一个游戏
function nextGame() {
    let row = selectedItem.nextSibling ? selectedItem.nextSibling : selectedItem
    selectGame(row)
}
// 上一个游戏
function lastGame() {
    if (selectedItem.dataset.index == 0) {
        return
    } else {
        let row = selectedItem.previousSibling ? selectedItem.previousSibling : selectedItem
        selectGame(row)
    }

}
// 选择游戏
function selectGame(rom) {
    removeSelect()
    rom.classList.add("select");
    info.innerText = rom.dataset.describer
    ipcRenderer.send("getPhoto", rom.dataset.key)
    console.log(rom.dataset.index)
    selectedItem = rom
}
// 移除选中
function removeSelect() {
    selectedItem && selectedItem.classList.remove("select")
}

function initGame() {
    let rom = ul.firstChild
    selectGame(rom)
}
// 监听键盘事件
document.onkeydown = (e) => {
    console.log(e)
    if (e.key == "ArrowDown") {
        nextGame()
    } else if (e.key == "ArrowUp") {
        lastGame()
    }
    else if (e.key == "Enter") {
        startGame()
    }

}
function startGame() {
    ipcRenderer.send("play", selectedItem.dataset.key)
}
//退出监听事件
exit.addEventListener("click", () => {
    ipcRenderer.send("exit")
})
//全屏切换监听事件
toggle.addEventListener("click", () => {
    ipcRenderer.send("toggle")
})


//创建游戏列表
const createLi = (element, index) => {
    let li = document.createElement("li")
    li.className = "rom-li"
    li.innerText = element.title
    li.dataset.key = element.key
    li.dataset.index = index
    li.dataset.describer = element.describer
    // 单击选中游戏
    return li
}
//监听获取rom列表
ipcRenderer.on("roms", (event, data) => {
    data.forEach((element, index) => {
        let li = createLi(element, index)
        // 单击选中游戏
        li.onclick = (e) => {
            let rom = e.target
            //选择当前游戏
            selectGame(rom)
        }
        //双击开始游戏
        li.ondblclick = (e) => {
            console.log(e.target.dataset.key)
            ipcRenderer.send("play", e.target.dataset.key)
        }
        if (index == 0) {
            selectGame(li)
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

// 初始化

