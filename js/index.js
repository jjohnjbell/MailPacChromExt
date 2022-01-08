// window.onload = () => {
const resultsEl = document.getElementById("results")
const getLinksBtn = document.getElementById("myBtn")
const deleteBtn = document.getElementById("deleteBtn-El")
const showLinksBtn = document.getElementById("showLinks-El")
let storageContent = JSON.parse(localStorage.getItem("myMarks"))
let bookmarkObjectArray = []
let onloaderEl = ""

const bookmarks = {
    myLinks: "",
    myHostName: ""
}


if ( storageContent!= null) {
    render(storageContent)
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
            render(bookmarkObjectArray)

        })

    } else {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let url = new URL(tabs[0].url)
            bookmarkObjectArray = JSON.parse(localStorage.getItem("myMarks"))
            bookmarks.myLinks = tabs[0].url
            bookmarks.myHostName = url.hostname
            bookmarkObjectArray.push(bookmarks)
            localStorage.setItem("myMarks", JSON.stringify(bookmarkObjectArray))
            render(bookmarkObjectArray)


        })

    }


})



function render(bookmarker) {
    for (let i = 0; i < bookmarker.length; i++) {
        resultsEl.innerHTML += `<h5><div class="listEl">
                            ${bookmarker[i].myHostName}` + ` <a href="${bookmarker[i].myLinks}" target = "_blank">Visit</a> ` +
            `<button id="copy-El" class="btn-secondary"> COPY</button>` + `<button id = "deleteURL" class="btn btn-alert"> Delete </button>
                            </div></h5>`

    }

}



deleteBtn.addEventListener("click", function () {
    localStorage.clear()
})
//}