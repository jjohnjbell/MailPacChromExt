// window.onload = () => {
    const links = JSON.parse(localStorage.getItem("myMarks"))
    const results = document.getElementById("results")
    const getLinksBtn = document.getElementById("myBtn")
    const deleteBtn = document.getElementById("deleteBtn-El")

    const bookmarks = {
        myLinks: [],
        myHostName:[]
    }


    deleteBtn.addEventListener("click",function(){
        localStorage.clear()
    })

    // if (links) {
    //     render(links)
    // }

    getLinksBtn.addEventListener("click", function (e) {
        e.preventDefault()

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            bookmarks.myLinks.push(tabs[0].url)
            bookmarks.myHostName.push(tabs[0].title)  
           let newMarks = JSON.parse(localStorage.getItem("myMarks"))
            localStorage.setItem("myMarks", JSON.stringify(bookmarks))
            console.log(newMarks)
        })
      
        render(bookmarks)
    })

    function render(bookmarker) {
       results.innerHTML = ""
        for (let i = 0; i < bookmarks.length; i++) {
               results.innerHTML += `<div><h3> ${bookmarks.myHostName[i]} 
               <a class="btn btn-default" target="_blank"  href =" ' + ${bookmarks.myLinks[i]} + ' "> Visit </a>
               </h3></div>`
        }
    }
//}