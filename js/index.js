window.onload = showLinks()

//Connect to Div containers
let resultsEl = document.getElementById("results")

let popUp = document.getElementById("popUp")

//Connect to Button Elements
const getLinksBtn = document.getElementById("myBtn-El")
const deleteBtn = document.getElementById("deleteBtn-El")

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

//Create function to Create Bookmark Objects and Store them in Local Storage
getLinksBtn.addEventListener("click", getLinks)


function getLinks() {

    //Select current Chrome Tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let bookmarkObjectArray = []
        let newUrl = tabs[0].url.substring(0, 30) + "..."

        //If Local Storage is empty, Assign Bookmark values and push to Local Storage
        if (localStorage.getItem("myMarks") === null) {
            resultsEl.innerHTML = ""

            //Assign values to the Bookmark Object
            bookmarks.myLinks = newUrl
            bookmarks.trueLink = tabs[0].url
            bookmarkObjectArray.push(bookmarks)
            localStorage.setItem("myMarks", JSON.stringify(bookmarkObjectArray))
            popDisplay("Link Grabbed")

            //Render Local Storage Items to Screen
            let lsContent = JSON.parse(localStorage.getItem("myMarks"))
            for (let i = 0; i < lsContent.length; i++) {

                let copyBtn = document.createElement('button')
                copyBtn.className = "resultSetBtn"
                copyBtn.id = "copyBtnEl"
                copyBtn.innerHTML = "Copy"
                copyBtn.addEventListener("click", function () {
                    navigator.clipboard.writeText(lsContent[i].trueLink)
                })

                // let delBtn = document.createElement('button')
                // delBtn.className = "resultSetBtn"
                // delBtn.id = "deleteBtn"
                // delBtn.innerHTML = "Delete"
                // delBtn.addEventListener("click", function () {
                //     this.parentElement.remove()
                //     deleteSpecificItem(lsContent, lsContent[i])
                // })
                // let newDiv = document.createElement('div')
                // newDiv.id = "resultSetDiv"
                // newDiv.innerHTML = `<a href="${lsContent[i].myLinks}"target = "_blank">${lsContent[i].myLinks}</a>`
                // newDiv.appendChild(delBtn)
                // newDiv.appendChild(copyBtn)
                // resultsEl.appendChild(newDiv)

                let delBtn = document.createElement('img')
                delBtn.src = "/img/close.png"
                delBtn.id = "closeIcon"
                delBtn.style.width="18px"
                delBtn.style.height="18px"
                delBtn.title="Delete this item"
                delBtn.className = "resultSetBtn"
                delBtn.addEventListener("click", function () {
                    this.parentElement.remove()
                    deleteSpecificItem(lsContent, lsContent[i])
                })
                let newDiv = document.createElement('div')
                newDiv.id = "resultSetDiv"
                newDiv.innerHTML = `<a href="${lsContent[i].myLinks}"target = "_blank">${lsContent[i].myLinks}</a>`
                newDiv.appendChild(delBtn)
                newDiv.appendChild(copyBtn)
                resultsEl.appendChild(newDiv)
            }

        } else {
            resultsEl.innerHTML = ""
            //Get content from Local Storage
            bookmarkObjectArray = JSON.parse(localStorage.getItem("myMarks"))

            //Assign values to the Bookmark Object
            if (checkDuplicates(bookmarkObjectArray, tabs[0].url)) {
                //If there exists the current URL in the Local Storage, do nothing except render what's already
                //in Local Storage to the screen
                popDisplay("Link already saved")
                for (let i = 0; i < bookmarkObjectArray.length; i++) {
                    let copyBtn = document.createElement('button')
                    copyBtn.className = "resultSetBtn"
                    copyBtn.id = "copyBtnEl"
                    copyBtn.innerHTML = "Copy"
                    copyBtn.addEventListener("click", function () {
                        navigator.clipboard.writeText(bookmarkObjectArray[i].trueLink)
                    })

                    // let delBtn = document.createElement('button')
                    // delBtn.className = "resultSetBtn"
                    // delBtn.id = "deleteBtn"
                    // delBtn.innerHTML = "Delete"
                    // delBtn.addEventListener("click", function () {
                    //     this.parentElement.remove()
                    //     deleteSpecificItem(bookmarkObjectArray, bookmarkObjectArray[i])
                    // })

                    let delBtn = document.createElement('img')
                    delBtn.src = "/img/close.png"
                    delBtn.id = "closeIcon"
                    delBtn.style.width="18px"
                    delBtn.style.height="18px"
                    delBtn.title="Delete this item"
                    delBtn.className = "resultSetBtn"
                    delBtn.addEventListener("click", function () {
                        this.parentElement.remove()
                        deleteSpecificItem(lsContent, lsContent[i])
                    })

                    let newDiv = document.createElement('div')
                    newDiv.id = "resultSetDiv"
                    newDiv.innerHTML = `<a href="${bookmarkObjectArray[i].myLinks}"target = "_blank">${bookmarkObjectArray[i].myLinks}</a>`

                    newDiv.appendChild(delBtn)
                    newDiv.appendChild(copyBtn)

                    resultsEl.appendChild(newDiv)
                }
            } else {
                bookmarks.myLinks = newUrl
                bookmarks.trueLink = tabs[0].url
                bookmarkObjectArray.push(bookmarks)
                localStorage.setItem("myMarks", JSON.stringify(bookmarkObjectArray))

                popDisplay("Link Grabbed")

                //Render Locasl Storage Items to Screen
                for (let i = 0; i < bookmarkObjectArray.length; i++) {

                    let copyBtn = document.createElement('button')
                    copyBtn.className = "resultSetBtn"
                    copyBtn.id = "copyBtnEl"
                    copyBtn.innerHTML = "Copy"
                    copyBtn.addEventListener("click", function () {
                        navigator.clipboard.writeText(bookmarkObjectArray[i].trueLink)
                    })

                    // let delBtn = document.createElement('button')
                    // delBtn.className = "resultSetBtn"
                    // delBtn.id = "deleteBtn"
                    // delBtn.innerHTML = "Delete"
                    // delBtn.addEventListener("click", function () {
                    //     this.parentElement.remove()
                    //     deleteSpecificItem(bookmarkObjectArray, bookmarkObjectArray[i])
                    // })

                    let delBtn = document.createElement('img')
                    delBtn.src = "/img/close.png"
                    delBtn.id = "closeIcon"
                    delBtn.style.width="18px"
                    delBtn.style.height="18px"
                    delBtn.title="Delete this item"
                    delBtn.className = "resultSetBtn"
                    delBtn.addEventListener("click", function () {
                        this.parentElement.remove()
                        deleteSpecificItem(lsContent, lsContent[i])
                    })
                    let newDiv = document.createElement('div')
                    newDiv.id = "resultSetDiv"
                    newDiv.innerHTML = `<a href="${bookmarkObjectArray[i].myLinks}"target = "_blank">${bookmarkObjectArray[i].myLinks}</a>`

                    newDiv.appendChild(delBtn)
                    newDiv.appendChild(copyBtn)

                    resultsEl.appendChild(newDiv)

                }
            }
        }
    })

}

function checkDuplicates(array, urlEntry) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].trueLink === urlEntry) {
            return true
            break
        }
    }
}

//Remove specific item from Local Storage
function deleteSpecificItem(localStorageArray, objectKeyPair) {
    let indexItem = localStorageArray.indexOf(objectKeyPair)
    if (indexItem > -1) {
        localStorageArray.splice(indexItem, 1)
        localStorage.clear()
        resultsEl.innerHTML = ""
        localStorage.setItem("myMarks", JSON.stringify(localStorageArray))
        showLinks()

    }
}

function showLinks() {

    //Get content from Local Storage
    let bookmarkObjectArray = []
    bookmarkObjectArray = JSON.parse(localStorage.getItem("myMarks"))
    document.getElementById("results").innerHTML = ""

    if (localStorage.getItem("myMarks") != null) {
        //Render Locasl Storage Items to Screen
        for (let i = 0; i < bookmarkObjectArray.length; i++) {

            let copyBtn = document.createElement('button')
            copyBtn.className = "resultSetBtn"
            copyBtn.id = "copyBtnEl"
            copyBtn.innerHTML = "Copy"
            copyBtn.addEventListener("click", function () {
                navigator.clipboard.writeText(bookmarkObjectArray[i].trueLink)
            })

            // let delBtn = document.createElement('button')
            // delBtn.className = "resultSetBtn"
            // delBtn.id = "deleteBtn"
            // delBtn.innerHTML = "Delete"
            // delBtn.addEventListener("click", function () {
            //     this.parentElement.remove()
            //     deleteSpecificItem(bookmarkObjectArray, bookmarkObjectArray[i])
            // })

            let delBtn = document.createElement('img')
            delBtn.src = "/img/close.png"
            delBtn.id = "closeIcon"
            delBtn.style.width="18px"
            delBtn.style.height="18px"
            delBtn.title="Delete this item"
            delBtn.className = "resultSetBtn"
            delBtn.addEventListener("click", function () {
                this.parentElement.remove()
                deleteSpecificItem(bookmarkObjectArray, bookmarkObjectArray[i])
            })

            let newDiv = document.createElement('div')
            newDiv.id = "resultSetDiv"
            newDiv.innerHTML = `<a href="${bookmarkObjectArray[i].myLinks}"target = "_blank">${bookmarkObjectArray[i].myLinks}</a>`

            newDiv.appendChild(delBtn)
            newDiv.appendChild(copyBtn)
            document.getElementById("results").appendChild(newDiv)

        }
    }
}

//Create function to remove the Div's that store the Result Set
function clearChild() {
    document.getElementById("resultSetDiv").remove()
}

//Create Function to clear Local Storage
deleteBtn.addEventListener("click", function () {
    localStorage.clear()
    resultsEl.innerHTML = ""
})

