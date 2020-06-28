$(document).ready(function() {
    $.get({
        url: "http://localhost:4567/projects",
        context: document.body
    }).done(function(data) {
        console.log(data.message);
        /*data.message.forEach(projectName => {
            $('.list-group').append('<a class="list-group-item list-group-item-action bg-dark" href="#">').append(projectName).append('</a>');
        })*/
    })
});