//Connect to Div's
let resultsEl = document.getElementById("results")

const popUp = document.getElementById("popUp")

//Connect to Button Elements
const getLinksBtn = document.getElementById("myBtn-El")
const deleteBtn = document.getElementById("deleteBtn-El")
const showLinksBtn = document.getElementById("showLinks-El")

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

//Check if Local Storage is empty, if so it hides the Show Links Button
hideShowBtn()

function hideShowBtn() {
    if (localStorage.getItem("myMarks") === null) {
        showLinksBtn.style = "display:none"
    }
}

//Create function to Create Bookmark Objects and Store them in Local Storage
getLinksBtn.addEventListener("click", getLinks)

// e.preventDefault()
function getLinks() {

    let bookmarkObjectArray = []
    //If Local Storage is empty, Assign Bookmark values and push to Local Storage
    if (localStorage.getItem("myMarks") === null) {

        //Select current Chrome Tab
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            //Convert URL Object to String to enable the use of the Substring method
            // use this to get hostname from URL Object "let url = new URL(tabs[0].url)....url.hostname
            let newUrl = tabs[0].url.substring(0, 40) + "..."

            //Assign values to the Bookmark Object
            bookmarks.myLinks = newUrl
            bookmarks.trueLink = tabs[0].url
            bookmarkObjectArray.push(bookmarks)
            localStorage.setItem("myMarks", JSON.stringify(bookmarkObjectArray))

            // popUp.style = "visibility: display"
            popDisplay("Link Grabbed")



            showLinksBtn.style = "display=visible"

            resultsEl.innerHTML = ""

            //NEW SHOW LINK FUNCTION
            for (let i = 0; i < bookmarkObjectArray.length; i++) {

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


        })
        //END SHOW LINK FUNCTION


    } else {
        //Select current Chrome Tab
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

            //Convert URL  to String to enable the use of the Substring method
            let actualLink = tabs[0].url
            let newUrl = tabs[0].url.substring(0, 40) + "..."
            let bookmarkObjectArray = []


            //Get content from Local Storage
            bookmarkObjectArray = JSON.parse(localStorage.getItem("myMarks"))
            //Assign values to the Bookmark Object
            bookmarks.myLinks = newUrl
            bookmarks.trueLink = tabs[0].url
            bookmarkObjectArray.push(bookmarks)
            localStorage.setItem("myMarks", JSON.stringify(bookmarkObjectArray))

            popDisplay("Link Grabbed")

            showLinksBtn.style = "display=visible"

            // for (let i = 0; i < bookmarkObjectArray.length; i++) {
            //     if ((bookmarkObjectArray[i].trueLink === actualLink)&&(actualLink===tabs[0].url)) {
            //         popDisplay("Link Already Grabbed")

            //     } else {


            //NEW SHOW LINK FUNCTION
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

        })

    }

}
//END SHOW LINK FUNCTION










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