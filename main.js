const deleteText = document.querySelectorAll('#delete')
let statusColor = document.querySelector('#status')
let item = document.querySelector('.item')

Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteProject)
})

// Array.from(statusColor).forEach((element) => {
//     element.addEventListener('change', )
// })

statusColor.addEventListener('change', (element) => {
    console.log("select changed.", element.target.value)
    let color = element.target.value
    if(color !==""){
        item.style.backgroundColor = color
        item.style.color = 'black'
    }else{
        item.style.backgroundColor = 'black'
        item.style.color = 'white'
    }
})



async function deleteProject(){
    const proj = this.parentNode.childNodes[1].innerText
    const descript = this.parentNode.childNodes[3].innerText
    const url = this.parentNode.childNodes[5].innerText
    try{
        const response = await fetch('deleteProject',{
            method:'delete',
            headers:{'Content-Type' : 'application/json'},
            body: JSON.stringify({
                'projectName' : proj,
                'description' : descript,
                'projectLink' : url
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

// statusColor.addEventListener('change', (element) => {
//     console.log("select changed.", element.target.value)
//     let color = element.target.value
//     if(color !==""){
//         item.style.backgroundColor = color
//         item.style.color = 'black'
//     }else{
//         item.style.backgroundColor = 'black'
//         item.style.color = 'white'
//     }
// })

