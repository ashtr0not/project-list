const deleteText = document.querySelectorAll('.del')
const statusColor = document.querySelectorAll('.status')
// let item = document.querySelector('.item')

Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteProject)
})

Array.from(statusColor).forEach((element) => {
    element.addEventListener('change', statusChange)
})

async function statusChange(element){
    // let color = element.target.value
    let item = document.querySelector('.item')
    // const parent = this.parentNode
    // const proj = parent.querySelector('#projectName').innerText.replace(' :', '')
    // const descript = parent.querySelector('#projectDescription').innerText
    // const url = parent.querySelector('#projectLink').innerText
    // console.log("select changed list to color:", color)

    const color = this.value;
    const li = this.closest('.item');
    item.style.backgroundColor = color;

    const proj = li.querySelector('#projectName').innerText.replace(' :', '');

    // if(color !== ""){
    //     item.style.backgroundColor = color
    //     item.style.color = 'black'
    // }else{
    //     item.style.backgroundColor = 'black'
    //     item.style.color = 'black'
    // }
    try{
        const response = await fetch('updateProjectStatus', {
            method: 'put',
            headers: {'Content-Type' : 'application/json'},
            // body: JSON.stringify({
            //     'projectName' : proj,
            //     'description' : descript,
            //     'projectLink' : url,
            //     'status' : color
            // })
            body: JSON.stringify({ projectName: proj, color })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
//THIS CODE WORKS BUT IT GOES AWAY AFTER THE REFRESH
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



