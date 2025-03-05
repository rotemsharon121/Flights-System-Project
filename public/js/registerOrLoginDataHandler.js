const login = document.getElementById('login')

fetch('http://localhost:3000/customers/api/allCustomers')
    .then(response => response.json())
    .then(data => {
        if (data === 'an error occurred, can\'t show all customers') {
            login.innerHTML =
                `<div class="col-lg-10 text-center mx-auto">
                        <h3 class="text-danger">an error occurred, can't show all customers</h3>`
        }
        data.forEach(customer => {
            const row = document.createElement(`div`)
            row.id = `${customer.id}`
            row.className = 'col-sm-6 col-md-4 col-lg-3'
            row.innerHTML = `
                    <form action="/user_page">
                        <button class="btn btn-outline-primary" type="submit" style= "border: none;">
                            <img src="${customer.Profile_picture}" class="card-img-top rounded-circle mt-5" alt="random person">
                            <div class="card-body">
                                <h5 class="card-title">${customer.User_name}</h5>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">${customer.First_name} ${customer.Last_name}</li>
                            </ul>
                        </button>
                    </form>
                    `
            login.appendChild(row)

            row.addEventListener('submit', (event) => {
                const userid = row.id
                const cookieExpires = 60 * 10 // cookie expires after 10 minutes
                document.cookie = `customer=${userid}; max-age=${cookieExpires}`
            })
        })

    })
    .catch(error => {
        console.error('Error fetching data:', error)

    })

function displaySelectedImage(event, elementId) {
    const selectedImage = document.getElementById(elementId);
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            selectedImage.src = e.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
}


document.getElementById('profilePicture').addEventListener('change', (event) => {
    displaySelectedImage(event, 'selectedImg')
})

document.getElementById('register-form').addEventListener('submit', (event) => {
    event.preventDefault()
    const newUser = {
        First_name: document.getElementById('first_name').value,
        Last_name: document.getElementById('last_name').value,
        Address: document.getElementById('address').value,
        Phone_number: document.getElementById('phone_number').value,
        Credit_card_number: document.getElementById('Credit card number').value,
        User_name: document.getElementById('user_name').value,
        User_password: document.getElementById('password').value,
        // Profile_picture: document.getElementById('selectedImg').files[0]
    }
    // const profilePicture = document.getElementById('selectedImg')
    // console.log(profilePicture)
    // console.log(newUser.Profile_picture);
    


    fetch('http://localhost:3000/customers/api/newCustomer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
        .then(response => response.json())
        .then(data => {
            fetch(`http://localhost:3000/customers/api/${data.id}`)
                .then(response => response.json())
                .then(data => {
                    const cookieExpires = 60 * 10 // cookie expires after 10 minutes
                    document.cookie = `customer=${data.customer.id}; max-age=${cookieExpires}`
                    window.location.href = '/user_page'
                })
                .catch(error => {
                    console.error('Error:', error)
                    document.getElementById('register-btn').innerHTML = `<h3 class="text-danger">an error occurred, can't show the customer</h3>`
                })
        })
        .catch(error => {
            console.error('Error:', error)
            document.getElementById('register-btn').innerHTML = `<h3 class="text-danger">an error occurred, can't add the customer</h3>`
        })

})


// loginForm.addEventListener('click', (event) => {
//     console.log('user1 clicked')
//     const userid = event.target.id
//     console.log(userid)

// })

// loginForm.addEventListener('submit', (event) => {
//     const userid = event.target.id
//     console.log(userid)
//     document.cookie = `customer=${userId}`
// })