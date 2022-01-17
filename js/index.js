// window.onload = () => {
const resultsEl = document.getElementById("results")
const popUp = document.getElementById("popUp")
const getLinksBtn = document.getElementById("myBtn-El")
const deleteBtn = document.getElementById("deleteBtn-El")
const showLinksBtn = document.getElementById("showLinks-El")
let storageContent = JSON.parse(localStorage.getItem("myMarks"))
let bookmarkObjectArray = []
let onloaderEl = ""

const bookmarks = {
    myLinks: "",
    myHostName: ""
}

if (storageContent === null) {
    showLinksBtn.style = "display:none"
}




getLinksBtn.addEventListener("click", function (e) {
    e.preventDefault()

    if (localStorage.getItem('myMarks') === null) {

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let url = new URL(tabs[0].url)
            bookmarks.myLinks = tabs[0].url
            bookmarks.myHostName = url.hostname
            bookmarkObjectArray.push(bookmarks)
            localStorage.setItem("myMarks", JSON.stringify(bookmarkObjectArray))

            // popUp.style = "visibility: display"
            popUp.style = "visibility:visible"



            setTimeout(() => popUp.style = "visibility:hidden", 1200)
            showLinksBtn.style = "display=visible"

        })

    } else {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let url = new URL(tabs[0].url)
            bookmarkObjectArray = JSON.parse(localStorage.getItem("myMarks"))
            bookmarks.myLinks = tabs[0].url
            bookmarks.myHostName = url.hostname
            bookmarkObjectArray.push(bookmarks)
            localStorage.setItem("myMarks", JSON.stringify(bookmarkObjectArray))
            popUp.style = "visibility:visible"

            setTimeout(() => popUp.style = "visibility:hidden", 1200)

            showLinksBtn.style = "display=visible"

        })

    }


})

//
showLinksBtn.addEventListener("click", renderMyScreen)

function renderMyScreen(e) {
    e.preventDefault()

    if (resultsEl.innerHTML != "") {

    } else {

        for (let i = 0; i < bookmarkObjectArray.length; i++) {
            resultsEl.innerHTML += `<div id="resultSetDiv">
        <a href="${bookmarkObjectArray[i].myLinks}" 
        target = "_blank">${bookmarkObjectArray[i].myHostName}</a> 
        <button class="resultSetBtn" id="copy-El"> Copy</button> 
        <button class="resultSetBtn" id = "deleteURL"> Delete </button>
                        </di>`

        }
    }
}



deleteBtn.addEventListener("click", function () {
    localStorage.clear()
})
//}