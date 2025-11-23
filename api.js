const body = document.querySelector('body');
        body.id = 'home';

        const form = document.createElement('div')
        form.classList.add('api')
        const airport = document.createElement('div')
        airport.classList.add('airport')
        const input = document.createElement('input')
        const title = document.createElement('h1')
        const submit = document.createElement('button')
        submit.textContent = "send"
        title.textContent = 'Enter ICAO code'
        document.body.appendChild(form) 
        form.appendChild(title)
        form.appendChild(input)
        form.appendChild(submit)
        form.appendChild(airport)

        let airport_data = null
    
        submit.addEventListener('click',async () => {
            // console.log(input.value)
            await fetch_airport(input.value)
            render_UI(airport_data.Name)
            render_UI(airport_data.Location)
            render_UI(airport_data.ICAO)

        })

        async function fetch_airport(icao_code) {
            try {
                const url = `http://127.0.0.1:5000/airport/${icao_code}`
                const respsone = await fetch(url)
                if (!respsone.ok) {
                    throw new Error(`HTTP error! Status: ${respsone.status}`)
                }
                const data = await respsone.json()
                airport_data = data
            }
            catch (error) {
                console.error("Fetch Fail",error)
            }
        }
        render_UI = (inf) => {
            airport.innerHTML += `<p>${inf}</p>`
        }


        