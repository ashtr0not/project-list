const deleteText = document.querySelectorAll('.del')
const statusColor = document.querySelectorAll('.status')

//Event Listeners 
Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteProject)
})

Array.from(statusColor).forEach((element) => {
    element.addEventListener('change', statusChange)
})

//This calls the function once the page reloads to help keep colors after status change 
setInitialColors()

async function statusChange() {
    const color = this.value
    const li = this.closest('li')
    const proj = li.querySelector('.projectName').innerText.replace(' :', '')

    // Map colors to status words
    let status = ''

    if (status === 'Not Started') color = 'red'
    if (status === 'In Progress') color = 'yellow'
    if (status === 'Completed') color = 'green'


    li.style.backgroundColor = color
    if (color === 'yellow') {
        li.style.color = 'black'
        li.style.borderColor = 'white'
    } else {
        li.style.color = 'white'
    }

    try {
        const response = await fetch('updateProjectStatus', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ projectName: proj, color, status })
        })
        const data = await response.json()
        console.log(data)
        // location.reload() // optional
    } catch (err) {
        console.error(err)
    }
}


async function deleteProject() {
    const li = this.closest('li')
    const proj = li.querySelector('.projectName').innerText.replace(' :', '')

    try {
        const response = await fetch('deleteProject', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ projectName: proj })
        })
        const data = await response.json()
        console.log(data)

        //Fade out the deleted project instead of reload
        li.style.transition = 'opacity 0.5s ease' //transition
        li.style.opacity = 0

        // After fading out, remove from the DOM
        setTimeout(() => {
            li.remove()
        }, 500) // matches the transition time

    } catch (err) {
        console.error(err)
    }
}

function setInitialColors() {
    const items = document.querySelectorAll('li')

    items.forEach(li => {
        const statusSelect = li.querySelector('.status')
        const selectedColor = statusSelect.value

        if (selectedColor) {
            li.style.backgroundColor = selectedColor

            if (selectedColor === 'yellow') {
                li.style.color = 'black'
                li.style.borderColor = 'white'
            } else {
                li.style.color = 'white'
            }
        }
    })
}



