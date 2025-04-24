const deleteText = document.querySelectorAll('.del')
// const statusColor = document.querySelectorAll('#status')
// let item = document.querySelector('.item')

Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteProject)
})

// Array.from(statusColor).forEach((element) => {
//     element.addEventListener('change', statusChange)
// })

// async function statusChange(element){
//     let item = document.querySelector('.item')
//     let color = element.target.value
//     const proj = this.parentNode.childNodes[1].innerText
//     const descript = this.parentNode.childNodes[3].innerText
//     const url = this.parentNode.childNodes[5].innerText
//     console.log("select changed list to color:", color)
//     try{
//         const response = await fetch('updateProjectStatus', {
//             method: 'put',
//             headers: {'Content-Type' : 'application/json'},
//             body: JSON.stringify({
//                 'projectName_' : proj,
//                 'description_' : descript,
//                 'projectLink_' : url,
//                 'status_' : item
//             })
//         })
//         if(color !== ""){
//             item.style.backgroundColor = color
//             item.style.color = 'black'
//         }else{
//             item.style.backgroundColor = 'black'
//             item.style.color = 'black'
//         }
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }
//THIS CODE WORKS BUT IT GOES AWAY AFTER THE REFRESH
// statusColor.addEventListener('change', (element) => {ß
//     console.log("select changed.", element.target.value)
//     let color = element.target.value
//     if(color !==""){
//         item.style.backgroundColor = color
//         item.style.color = 'black'
//     }else{
//         item.style.backgroundColor = 'black'
//         item.style.color = 'white'
//     }
// })cle



async function deleteProject(){
    const parent = this.parentNode
    const proj = parent.querySelector('#projectName').innerText.replace(' :', '')
    const descript = parent.querySelector('#projectDescription').innerText
    const url = parent.querySelector('#projectLink').innerText
    try{
        const response = await fetch('deleteProject',{
            method: 'delete',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                'projectName' : proj,
                'projectDescription' : descript,
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



