document.addEventListener('DOMContentLoaded', function () {
    var db = firebase.database();
    //const devicesRef = db.ref('/devices');
    // Create listeners
    const devicesRef = db.ref('/devices');


// Register functions that update with last devices state
    devicesRef.on('value', function (snapshot) {
        let devices = snapshot.val();
        let data = devices["esp32_14C4F4"];
        console.log(data["timeStamp"]);
        let loginTime = moment(data["timeStamp"]).format('LT');
        console.log(loginTime);

        if (data["card"] != 0) {
            $('#student_1 .bottom .loginTime').text(loginTime);
        }

        // let devicesEl = document.getElementById('devices');
        // devicesEl.innerHTML = '';

        // for (var key in devices) {
        //   let deviceState = devices[key];
        //   let li = document.createElement('li');
        //   li.className = 'mdc-list-item';
        //   li.innerHTML = `
        //     <span class="mdc-list-item__start-detail grey-bg" role="presentation">
        //         <i class="material-icons" aria-hidden="true">cloud</i>
        //     </span>
        //     <span class="mdc-list-item__text">
        //         Station #${key}
        //         <span class="mdc-list-item__text__secondary">
        //             ${deviceState.temp} C°/${deviceState.humidity} %
        //         </span>
        //         <span class="mdc-list-item__text__secondary">
        //             Last updated: ${new Date(
        //               deviceState.lastTimestamp
        //             ).toLocaleString()}
        //         </span>
        //     </span>
        //   `;

        //   devicesEl.appendChild(li);
        // }

    });

    //fetchReportData();

});


const reportDataUrl = 'https://us-central1-itracking-project-firebase.cloudfunctions.net/getReportData';

function fetchReportData() {
    try {
        fetch(reportDataUrl)
            .then(res =>
                res.json()
            )
            .then(rows => {
                var maxTempData = rows.map(row => row.max_temp);
                var avgTempData = rows.map(row => row.avg_temp);
                var minTempData = rows.map(row => row.min_temp);

                var maxHumData = rows.map(row => row.max_hum);
                var avgHumData = rows.map(row => row.avg_hum);
                var minHumData = rows.map(row => row.min_hum);

                var labels = rows.map(row => row.data_hora.value);

            });
    } catch (e) {
        alert('Error getting report data');
    }
}