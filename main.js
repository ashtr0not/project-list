const deleteText = document.querySelectorAll('.delete')

Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteProject)
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