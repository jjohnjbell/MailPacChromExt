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
    myHostName: "",
    trueLink: ""
}

// if (storageContent === null) {
//     showLinksBtn.style = "display:none"
// }

getLinksBtn.addEventListener("click", getLinks)
function getLinks(e) {
    e.preventDefault()

    if (localStorage.getItem('myMarks') === null) {

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let url = toString(new URL(tabs[0].url))
            let newUrl = tabs[0].url.substring(12, 40) + "..."

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
            let newUrl = tabs[0].url.substring(12, 40) + "..."

            // bookmarks.myLinks = tabs[0].url
            bookmarkObjectArray = JSON.parse(localStorage.getItem("myMarks"))
            bookmarks.myLinks = newUrl
            bookmarks.trueLink = tabs[0].url
            bookmarks.myHostName = url.hostname
            bookmarkObjectArray.push(bookmarks)
            localStorage.setItem("myMarks", JSON.stringify(bookmarkObjectArray))
            popUp.style = "visibility:visible"

            //Hides Pop-up div after 1200 milliseconds
            setTimeout(() => popUp.style = "visibility:hidden", 1200)

            showLinksBtn.style = "display=visible"

        })

    }


    
}

// showLinksBtn.addEventListener("click", function (e) {
//     e.preventDefault()

//     //Store LocalStorage Content
//     let lsContent = JSON.parse(localStorage.getItem("myMarks"))
//     for (let i = 0; i < lsContent.length; i++) {

//         let copyBtn = document.createElement('button')
//         copyBtn.className = "resultSetBtn"
//         copyBtn.innerHTML = "Copy"
//         copyBtn.addEventListener("click", function () {
//             navigator.clipboard.writeText(lsContent[i].trueLink)
//         })

//         let deleteBtn = document.createElement('button')
//         deleteBtn.className = "resultSetBtn"
//         deleteBtn.innerHTML = "Delete"

//         let newDiv = document.createElement('div')
//         newDiv.id = "resultSetDiv"
//         newDiv.innerHTML += `<a href="${lsContent[i].myLinks}"target = "_blank">${lsContent[i].myLinks}</a>`

//         newDiv.appendChild(deleteBtn)
//         newDiv.appendChild(copyBtn)

//         resultsEl.appendChild(newDiv)
//         console.log(lsContent[i].myLinks)

//     }
  
//     // resultsEl.innerHTML += lsContent[0].myLinks
//     // console.log(lsContent.length)
// })






showLinksBtn.addEventListener("click", function (e) {
    e.preventDefault()

        console.log(bookmarkObjectArray[0])

    })

  
    // resultsEl.innerHTML += lsContent[0].myLinks
    // console.log(lsContent.length)
//})





function clearChild() {
    document.getElementById("resultSetDiv").remove()
}
deleteBtn.addEventListener("click", function () {
    localStorage.clear()
})
