$(document).ready(function() {
    loadData.project.data();
    loadData.table.headline();
    loadData.table.data();
});

let loadData = {
    project: {
        data: function () {
            $.get({
                url: "http://localhost:4567/projects",
                context: document.body
            }).done(function(data) {
                data.forEach(projectName => {
                    $('.list-group').append('<a class="list-group-item bg-dark" href="#">').append(projectName).append('</a>');
                })
            })
        }
    },
    table: {
        headline: function () {
            let headline = `
                <tr>
                    <th>Project</th>
                    <th>Task</th>
                    <th>Date</th>
                    <th>Start time</th>
                    <th>Stop time</th>
                    <th>Hours</th>
                </tr>
            `
            $('thead').append(headline);
        },
        data: function () {
            $.get({
                url: "http://localhost:4567/scheduler",
                context: document.body
            }).done(function(data) {
                data.forEach(scheduler => {
                    const date = new Date(scheduler.startTime.date.year, scheduler.startTime.date.month -1, scheduler.startTime.date.day);
                    const startTime = new Date(scheduler.startTime.date.year, scheduler.startTime.date.month -1, scheduler.startTime.date.day,
                        scheduler.startTime.time.hour, scheduler.startTime.time.minute);
                    const stopTime = new Date(scheduler.stopTime.date.year, scheduler.stopTime.date.month -1, scheduler.stopTime.date.day,
                        scheduler.stopTime.time.hour, scheduler.stopTime.time.minute);

                    let row = `
                        <tr>
                            <td>${scheduler.projectName}</td>
                            <td>${scheduler.task}</td>
                            <td>${date.toLocaleDateString("en-US")}</td>
                            <td>${startTime.getHours()}:${formatMinutes(startTime.getMinutes())}</td>
                            <td>${stopTime.getHours()}:${formatMinutes(stopTime.getMinutes())}</td>
                            <td>${calculateTimeBetweenDates(startTime, stopTime)}</td>
                        </tr>
                    `
                    $('tbody').append(row);
                })
            })
        }
    }
}

function formatMinutes(minutes) {
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return minutes;
}

function calculateTimeBetweenDates(startTime, stopTime) {
    const diffMinutes = (stopTime.getTime() - startTime.getTime()) / 60000;
    const diffHours = Math.floor(diffMinutes / 60);
    const rest = diffMinutes - (diffHours * 60);
    return diffHours + ':' + formatMinutes(rest);
}