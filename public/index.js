let list = document.getElementById('list');

// Get data from server
fetch('/get')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.forEach(member => {
            let li = document.createElement('li');
            li.innerHTML = member;
            list.appendChild(li);
        });
    });
