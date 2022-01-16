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
           
         
           
             setTimeout(()=> popUp.style="visibility:hidden",1200)

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
                     
         setTimeout(()=> popUp.style="visibility:hidden",1200)

        })

    }


})

//
showLinksBtn.addEventListener("click", renderMyScreen)

function renderMyScreen(e){
    e.preventDefault()
   
    if (resultsEl.innerHTML != ""){

    }else {

    for (let i = 0; i < bookmarkObjectArray.length; i++) {
        resultsEl.innerHTML += `<div id="resultSet">
        ${bookmarkObjectArray[i].myHostName} <a href="${bookmarkObjectArray[i].myLinks}" target = "_blank">Visit</a> <button class="resultSetBtn" id="copy-El"> COPY</button> <button class="resultSetBtn" id = "deleteURL"> Delete </button>
                        </di>`

    }
    }
}



deleteBtn.addEventListener("click", function () {
    localStorage.clear()
})
//}