let timerId;

function start() {
    let btn = document.getElementById("start");
    btn.disabled = true;
    fetch("/start").then((res) => {
        let alerts = document.getElementById("alerts");
        alerts.innerHTML = `<div class="alert alert-success alert-dismissible fade show m-2" role="alert">
        Server iniciado. Cuando se detecte que está encendido escucharás un sonido.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`; //Mostrar cartel verde de confirmación
        btn.disabled = false;
        if (typeof timerId !== "undefined") {
            window.clearInterval(timerId); //Evitar notificaciones duplicadas si se pulsa múltiples veces
        }
        timerId = window.setInterval(() => {
            fetch("/info").then((res) => {
                res.json().then((data) => {
                    if (data.status === "OK") {
                        new Audio("/public/notification.wav").play();
                        window.clearInterval(timerId);
                        info(); //Actualizar el estado
                    }
                });
            });
        }, 15000);
    });
}

function info() {
    let btn = document.getElementById("info");
    let div = document.getElementById("info-server");
    div.innerHTML = '<img src="/public/loading.gif" />';
    btn.disabled = true;
    let data;
    fetch("/info").then((res) => {
        res.json().then((data) => {
            if (data.status === "OK") {
                div.innerHTML = `<h2>Server status</h2>
                <p class="text-success"><b>Status: Online</b></p>
                <p><b>Players: </b>${data.players}`;
            } else {
                div.innerHTML = `<h2>Server status</h2>
                <p class="text-danger"><b>Status: Offline</b></p>`;
            }
            btn.disabled = false;
        });
    });
}
