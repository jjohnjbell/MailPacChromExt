//Connect to Div's
const resultsEl = document.getElementById("results")
const popUp = document.getElementById("popUp")

//Connect to Button Elements
const getLinksBtn = document.getElementById("myBtn-El")
const deleteBtn = document.getElementById("deleteBtn-El")
const showLinksBtn = document.getElementById("showLinks-El")

//Create Local Storage Variable
let storageContent = JSON.parse(localStorage.getItem("myMarks"))

//Create Array in which the Bookmark Objects will be stored to be put in Local Storage
let bookmarkObjectArray = []


//Create Bookmark Object
const bookmarks = {
    myLinks: "",
    trueLink: ""
}

//Check if Local Storage is empty, if so it hides the Show Links Button
if (storageContent === null) {
    showLinksBtn.style = "display:none"
}

//Create function to Create Bookmark Objects and Store them in Local Storage
getLinksBtn.addEventListener("click", function (e) {

    //Stop rendering from disappearing immediately
    e.preventDefault()

    //If Local Storage is empty, Assign Bookmark values and push to Local Storage
    if (localStorage.getItem('myMarks') === null) {

        //Select current Chrome Tab
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            //Convert URL Object to String to enable the use of the Substring method
            // use this to get hostname from URL Object "let url = new URL(tabs[0].url)....url.hostname
            let newUrl = tabs[0].url.substring(12, 40) + "..."

            //Assign values to the Bookmark Object
            bookmarks.myLinks = newUrl
            bookmarks.trueLink = tabs[0].url
            bookmarkObjectArray.push(bookmarks)
            localStorage.setItem("myMarks", JSON.stringify(bookmarkObjectArray))

            // popUp.style = "visibility: display"
            popUp.style = "visibility:visible"
            

            //Remove Pop Up div after 1200 milliseconds
            setTimeout(() => popUp.style = "visibility:hidden", 1200)
            showLinksBtn.style = "display=visible"

        })

    } else {
        //Local Storage is not empty so we pull it's content, update it and post back to Local Storage

        //Select current Chrome Tab
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

            //Convert URL  to String to enable the use of the Substring method
            let newUrl = tabs[0].url.substring(12, 40) + "..."

            //Store Local Storage content in Array
            bookmarkObjectArray = JSON.parse(localStorage.getItem("myMarks"))

            //Assign values to the Bookmark Object
            bookmarks.myLinks = newUrl
            bookmarks.trueLink = tabs[0].url
            bookmarkObjectArray.push(bookmarks)
            localStorage.setItem("myMarks", JSON.stringify(bookmarkObjectArray))
            popUp.style = "visibility:visible"

            //Remove Pop Up div after 1200 milliseconds
            setTimeout(() => popUp.style = "visibility:hidden", 1200)

            showLinksBtn.style = "display=visible"
            
        })
    }
})

//Create function to Render all links stored in Local Storage
showLinksBtn.addEventListener("click", function (e) {

    let lsContent = JSON.parse(localStorage.getItem("myMarks"))

    e.preventDefault()

    //Store LocalStorage Content

    for (let i = 0; i < lsContent.length; i++) {

        let copyBtn = document.createElement('button')
        copyBtn.className = "resultSetBtn"
        copyBtn.innerHTML = "Copy"
        copyBtn.addEventListener("click", function () {
            navigator.clipboard.writeText(lsContent[i].trueLink)
        })

        let deleteBtn = document.createElement('button')
        deleteBtn.className = "resultSetBtn"
        deleteBtn.innerHTML = "Delete"

        let newDiv = document.createElement('div')
        newDiv.id = "resultSetDiv"
        newDiv.innerHTML += `<a href="${lsContent[i].myLinks}"target = "_blank">${lsContent[i].myLinks}</a>`

        newDiv.appendChild(deleteBtn)
        newDiv.appendChild(copyBtn)

        resultsEl.appendChild(newDiv)
        console.log(lsContent[i].myLinks)

    }


})

///Create function to remove the Div's that store the Result Set
function clearChild() {
    document.getElementById("resultSetDiv").remove()
}

//Create Function to clear Local Storage
deleteBtn.addEventListener("click", function () {
    localStorage.clear()
})
