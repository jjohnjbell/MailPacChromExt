// window.onload = () => {

//Getting Results Div Element
const resultsEl = document.getElementById("results")

//Getting Pop-Up Div Element
const popUp = document.getElementById("popUp")

//Getting Button Elements
const getLinksBtn = document.getElementById("myBtn-El")
const deleteAllBtn = document.getElementById("deleteBtn-El")
const showLinksBtn = document.getElementById("showLinks-El")

//Storing Local Storage Content
let storageContent = JSON.parse(localStorage.getItem("myMarks"))

//Creating Array that will store the JSON Parsed Local Storage Content
let bookmarkObjectArray = []

//Creating Bookmark Object
const bookmarks = {
    myLinks: "",
    myHostName: "",
    trueLink: ""
}

//showLinksBtn is hidden when Local Storage is empty because there is nothing to render
if (storageContent === null) {
    showLinksBtn.style = "display:none"
}

//Add Click event and getLinks Function to getLinksBtn
getLinksBtn.addEventListener("click", getLinks)

//Add Click event and showLinks Function to showLinksBtn
showLinksBtn.addEventListener("click", showLinks)

//Add Click event to deleteAllBtn used to clear Local Storage
deleteAllBtn.addEventListener("click", function () {
    localStorage.clear()
})

//Create getLinks Function
function getLinks(e) {
    e.preventDefault()

    if (localStorage.getItem('myMarks') === null) {

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let url = toString(new URL(tabs[0].url))
            let newUrl = tabs[0].url.substring(0, 40) + "..."

            // bookmarks.myLinks = tabs[0].url
            bookmarks.myLinks = newUrl
            bookmarks.myHostName = url.hostname
            bookmarks.trueLink = tabs[0].url
            bookmarkObjectArray.push(bookmarks)
            localStorage.setItem("myMarks", JSON.stringify(bookmarkObjectArray))

            // popUp.style = "visibility: display"
            popUp.style = "visibility:visible"



            setTimeout(() => popUp.style = "visibility:hidden", 1200)
            showLinksBtn.style = "display=visible"

        })

    } else {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let url = toString(new URL(tabs[0].url))
            let newUrl = tabs[0].url.substring(0, 40) + "..."

            // bookmarks.myLinks = tabs[0].url
            bookmarkObjectArray = JSON.parse(localStorage.getItem("myMarks"))
            bookmarks.myLinks = newUrl
            bookmarks.trueLink = tabs[0].url
            bookmarks.myHostName = url.hostname
            bookmarkObjectArray.push(bookmarks)
            localStorage.setItem("myMarks", JSON.stringify(bookmarkObjectArray))
            popUp.style = "visibility:visible"

            setTimeout(() => popUp.style = "visibility:hidden", 1200)

            showLinksBtn.style = "display=visible"

        })

    }
}


//Create showLinks Function
function showLinks(e) {

    e.preventDefault()

    if (resultsEl.innerHTML != "") {

    } else {



        let copyBtn = document.createElement('button')
        copyBtn.className = "resultSetBtn"
        copyBtn.innerHTML = "Copy"

        copyBtn.addEventListener("click", function () {
            navigator.clipboard.writeText(bookmarkObjectArray[i].trueLink)
        })

        let deleteBtn = document.createElement('button')
        deleteBtn.className = "resultSetBtn"
        deleteBtn.innerHTML = "Delete"

        deleteBtn.addEventListener("click", deleteDiv)

        let newDiv = document.createElement('div')

        for (let i = 0; i < bookmarkObjectArray.length; i++) {

            newDiv.appendChild(deleteBtn)
            newDiv.appendChild(copyBtn)

            resultsEl.appendChild(newDiv)
            newDiv.id = "resultSetDiv"
            newDiv.innerHTML = `<a href="${bookmarkObjectArray[i].myLinks}"target = "_blank">${bookmarkObjectArray[i].myLinks}</a>`




            //     resultsEl.innerHTML += `<div id="resultSetDiv">
            // <a href="${bookmarkObjectArray[i].myLinks}"target = "_blank">${bookmarkObjectArray[i].myHostName}</a> 
            // <button class="resultSetBtn" > Copy</button> 
            // <button class="resultSetBtn" > Delete </button>
            //                 </di>`

        }
    }
}

//Create deleteDiv function deletes respective result divs via deleteBtn
function deleteDiv() {
    document.getElementById("resultSetDiv").remove()
}
