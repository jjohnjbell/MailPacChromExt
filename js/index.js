// window.onload = () => {
const resultsEl = document.getElementById("results")
const getLinksBtn = document.getElementById("myBtn")
const deleteBtn = document.getElementById("deleteBtn-El")
let bookmarkObjectArray = []

const bookmarks = {
    myLinks: "",
    myHostName: ""
}



getLinksBtn.addEventListener("click", function (e) {
    e.preventDefault()

    if (localStorage.getItem('myMarks') === null) {

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            bookmarks.myLinks = tabs[0].url
            bookmarks.myHostName = tabs[0].title
            bookmarkObjectArray.push(bookmarks)
            localStorage.setItem("myMarks", JSON.stringify(bookmarkObjectArray))
            render(bookmarkObjectArray)
        })

    } else {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            bookmarkObjectArray = JSON.parse(localStorage.getItem("myMarks"))
            bookmarks.myLinks=tabs[0].url
            bookmarks.myHostName=tabs[0].title
            bookmarkObjectArray.push(bookmarks)
            localStorage.setItem("myMarks", JSON.stringify(bookmarkObjectArray))
            render(bookmarkObjectArray)

        })

    }

    
})

function render(bookmarker) {
    for (let i = 0; i < bookmarker.length; i++) {
        resultsEl.innerHTML += `<h3><div>
                            ${bookmarker[i].myHostName} and ${bookmarker[i].myLinks}
                            </div></h3>`
    }
}


deleteBtn.addEventListener("click", function () {
    localStorage.clear()
})
//}