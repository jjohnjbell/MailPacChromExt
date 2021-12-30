// window.onload = () => {
const results = document.getElementById("results")
const getLinksBtn = document.getElementById("myBtn")
const deleteBtn = document.getElementById("deleteBtn-El")

const bookmarks = {
    myLinks: [],
    myHostName: []
}



getLinksBtn.addEventListener("click", function (e) {
    e.preventDefault()



    if (localStorage.getItem('myMarks') === null) {

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let bookmarkObjectArray = []
            bookmarks.myLinks.push(tabs[0].url)
            bookmarks.myHostName.push(tabs[0].title)
            bookmarkObjectArray.push(bookmarks)
            localStorage.setItem("myMarks",JSON.stringify(bookmarkObjectArray))
        })

        } else {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                let bookmarkObjectArray = JSON.parse(localStorage.getItem("myMarks"))
                bookmarks.myLinks.push(tabs[0].url)
                bookmarks.myHostName.push(tabs[0].title)
                bookmarkObjectArray.push(bookmarks)
                localStorage.setItem("myMarks",JSON.stringify(bookmarkObjectArray))

            })

        }

       // render(bookmarks)
    })

// function render(bookmarker) {
//    results.innerHTML = ""
//     for (let i = 0; i < bookmarks.length; i++) {
//            results.innerHTML += `<div><h3> ${bookmarks.myHostName[i]} 
//            <a class="btn btn-default" target="_blank"  href =" ' + ${bookmarks.myLinks[i]} + ' "> Visit </a>
//            </h3></div>`
//     }
// }


deleteBtn.addEventListener("click", function () {
    localStorage.clear()
})
//}