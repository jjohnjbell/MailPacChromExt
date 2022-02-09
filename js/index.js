window.onload = showLinks()

//Connect to Div's
let resultsEl = document.getElementById("results")

const popUp = document.getElementById("popUp")

//Connect to Button Elements
const getLinksBtn = document.getElementById("myBtn-El")
const deleteBtn = document.getElementById("deleteBtn-El")
//const showLinksBtn = document.getElementById("showLinks-El")

//Create Local Storage Variable
//let storageContent = JSON.parse(localStorage.getItem("myMarks"))

//PopUp function
function popDisplay(text) {
    popUp.innerHTML = text
    popUp.style = "visibility:visible"
    //Remove Pop Up div after 1200 milliseconds
    setTimeout(() => popUp.style = "visibility:hidden", 1200)
}

//Create Bookmark Object
const bookmarks = {
    myLinks: "",
    trueLink: ""
}

// //Check if Local Storage is empty, if so it hides the Show Links Button
// hideShowBtn()

// function hideShowBtn() {
//     if (localStorage.getItem("myMarks") === null) {
//         showLinksBtn.style = "display:none"
//     }
// }

//Create function to Create Bookmark Objects and Store them in Local Storage
getLinksBtn.addEventListener("click", getLinks)



function showLinks() {

    //Get content from Local Storage
    let bookmarkObjectArray = []
    bookmarkObjectArray = JSON.parse(localStorage.getItem("myMarks"))
    document.getElementById("results").innerHTML = ""

    if(localStorage.getItem("myMarks") != null){
    //Render Locasl Storage Items to Screen
    for (let i = 0; i < bookmarkObjectArray.length; i++) {

        let copyBtn = document.createElement('button')
        copyBtn.className = "resultSetBtn"
        copyBtn.innerHTML = "Copy"
        copyBtn.addEventListener("click", function () {
            navigator.clipboard.writeText(bookmarkObjectArray[i].trueLink)
        })


        let newDiv = document.createElement('div')
        newDiv.id = "resultSetDiv"
        newDiv.innerHTML = `<a href="${bookmarkObjectArray[i].myLinks}"target = "_blank">${bookmarkObjectArray[i].myLinks}</a>`
        newDiv.appendChild(copyBtn)

        document.getElementById("results").appendChild(newDiv)

    }
}
}

function getLinks() {

    //Select current Chrome Tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let bookmarkObjectArray = []
        let newUrl = tabs[0].url.substring(0, 40) + "..."

        //If Local Storage is empty, Assign Bookmark values and push to Local Storage
        if (localStorage.getItem("myMarks") === null) {
            resultsEl.innerHTML = ""
            //Assign values to the Bookmark Object
            bookmarks.myLinks = newUrl
            bookmarks.trueLink = tabs[0].url
            bookmarkObjectArray.push(bookmarks)
            localStorage.setItem("myMarks", JSON.stringify(bookmarkObjectArray))

            // popUp.style = "visibility: display"
            popDisplay("Link Grabbed")
            //showLinksBtn.style = "display=visible"

            //Render Local Storage Items to Screen
            let lsContent = JSON.parse(localStorage.getItem("myMarks"))
            for (let i = 0; i < lsContent.length; i++) {

                let copyBtn = document.createElement('button')
                copyBtn.className = "resultSetBtn"
                copyBtn.innerHTML = "Copy"
                copyBtn.addEventListener("click", function () {
                    navigator.clipboard.writeText(lsContent[i].trueLink)
                })


                let newDiv = document.createElement('div')
                newDiv.id = "resultSetDiv"
                newDiv.innerHTML = `<a href="${bookmarkObjectArray[i].myLinks}"target = "_blank">${bookmarkObjectArray[i].myLinks}</a>`
                newDiv.appendChild(copyBtn)

                resultsEl.appendChild(newDiv)
            }

        } else {
            resultsEl.innerHTML = ""
            //Get content from Local Storage
            bookmarkObjectArray = JSON.parse(localStorage.getItem("myMarks"))

            //Assign values to the Bookmark Object
            bookmarks.myLinks = newUrl
            bookmarks.trueLink = tabs[0].url
            bookmarkObjectArray.push(bookmarks)
            localStorage.setItem("myMarks", JSON.stringify(bookmarkObjectArray))

            popDisplay("Link Grabbed")
          //  showLinksBtn.style = "display=visible"

            //Render Locasl Storage Items to Screen
            for (let i = 0; i < bookmarkObjectArray.length; i++) {

                let copyBtn = document.createElement('button')
                copyBtn.className = "resultSetBtn"
                copyBtn.innerHTML = "Copy"
                copyBtn.addEventListener("click", function () {
                    navigator.clipboard.writeText(bookmarkObjectArray[i].trueLink)
                })


                let newDiv = document.createElement('div')
                newDiv.id = "resultSetDiv"
                newDiv.innerHTML = `<a href="${bookmarkObjectArray[i].myLinks}"target = "_blank">${bookmarkObjectArray[i].myLinks}</a>`
                newDiv.appendChild(copyBtn)

                resultsEl.appendChild(newDiv)

            }
        }
    })

}

//Create function to remove the Div's that store the Result Set
function clearChild() {
    document.getElementById("resultSetDiv").remove()
}

//Create Function to clear Local Storage
deleteBtn.addEventListener("click", function () {
    localStorage.clear()
    resultsEl.innerHTML = ""
    hideShowBtn()
})