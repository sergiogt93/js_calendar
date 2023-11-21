//Apertura modal principal Eventos

btnCrear.onclick = function () {
    today = new Date();
    var date = today.getFullYear() + '-' + esmenos0(today.getMonth() + 1) + '-' + esmenos0(today.getDate()) + 'T' + esmenos0(today.getHours()) + ':' + esmenos0(today.getMinutes());
    let allEventInputs = document.querySelectorAll('.eventComonClass');
    console.log(date)
    allEventInputs[1].value = date;
    mainModal.style.display = "block";
}

function esmenos0(a) {
    if (a < 10) {
        return ('0' + a)
    } else return a
}

closeModal.onclick = function () {
    cerrar_modal()
};

function cerrar_modal() {
    momentedit = 0;
    today = new Date();
    var date = today.getFullYear() + '-' + esmenos0(today.getMonth() + 1) + '-' + esmenos0(today.getDate()) + 'T' + esmenos0(today.getHours()) + ':' + esmenos0(today.getMinutes());
    mainModal.style.display = "none";
    checkboxDate.checked = false;
    ponerdata();
    recordatorio_modal.checked = false;
    recordatorio_modal_time();
    let allEventInputs = document.querySelectorAll('.eventComonClass');
    allEventInputs[0].value = '';
    allEventInputs[1].value = date;
    allEventInputs[2].value = 'No se repite';
    allEventInputs[3].value = '';
    allEventInputs[4].value = 'Meeting';
    bigModalId.innerHTML = ""
}


//Validación

btnSave.addEventListener("click", comprovacionFinal);

eventTitleInput.addEventListener("mouseup", comprovaciones);
eventTitleInput.addEventListener("keyup", comprovaciones);

function comprovaciones() {
    let profile_cont_input = document.getElementsByClassName('title-modal-input');
    if (profile_cont_input[0].value.length > 3) {
        profile_cont_input[0].style.color = "var(--azul)";
        profile_cont_input[0].style.backgroundColor = "#ffffff";
    } else {
        profile_cont_input[0].style.backgroundColor = "#F8D8DD";
    }
}

function comprovacionesFechas(event) {
    let profile_cont_input = document.querySelectorAll('.neededDate');
    if (checkboxDate.checked == true) {
        if (profile_cont_input[1].value < profile_cont_input[0].value) {
            profile_cont_input[0].style.backgroundColor = "#F8D8DD";
            profile_cont_input[1].style.backgroundColor = "#F8D8DD";
            console.log('a');
            return false
        } else {
            profile_cont_input[0].style.color = "var(--azul)";
            profile_cont_input[0].style.backgroundColor = "#ffffff";
            if (profile_cont_input[1]) {
                profile_cont_input[1].style.color = "var(--azul)";
                profile_cont_input[1].style.backgroundColor = "#ffffff";
            }
            return true
        }
    } else {
        return true
    }
}

function comprovacionFinal() {
    if (bigModalId.innerHTML !== "" && momentedit == 1) {
        deleteById(bigModalId.innerHTML)
    }
    let a = 0;
    let allInputs = document.querySelectorAll('.modal-need');
    for (let i = 0; i < allInputs.length; i++) {
        if (allInputs[i].classList[0] == 'title-modal-input') {
            comprovaciones();
            a++
        } else {
            if (comprovacionesFechas() == true) {
                a++
            }
        }
    }
    if (a == 2 || a == 3) {
        let allEventInputs = document.querySelectorAll('.eventComonClass');
        if (checkboxDate.checked == true && recordatorio_modal.checked == true) {
            finalEvent = new calendarEvent(allEventInputs[0].value, allEventInputs[1].value, allEventInputs[2].value, allEventInputs[3].value, allEventInputs[4].value, allEventInputs[5].value, allEventInputs[6].value);
            cerrar_modal();
            actual_date = new Date(esmenos0(allEventInputs[1].value));
            magia(finalEvent);
            createCal()
            console.log(finalEvent);
        } else if (checkboxDate.checked == true && recordatorio_modal.checked == false) {
            finalEvent = new calendarEvent(allEventInputs[0].value, allEventInputs[1].value, allEventInputs[2].value, allEventInputs[3].value, 'undefined', allEventInputs[4].value, allEventInputs[5].value);
            cerrar_modal();
            magia(finalEvent);
            actual_date = new Date(esmenos0(allEventInputs[1].value));
            createCal()
            console.log(finalEvent);
        } else if (checkboxDate.checked == false && recordatorio_modal.checked == true) {
            finalEvent = new calendarEvent(allEventInputs[0].value, allEventInputs[1].value, 'undefined', allEventInputs[2].value, allEventInputs[3].value, allEventInputs[4].value, allEventInputs[5].value);
            cerrar_modal();
            magia(finalEvent);
            actual_date = new Date(esmenos0(allEventInputs[1].value));
            createCal()
            console.log(finalEvent);
        } else if (checkboxDate.checked == false && recordatorio_modal.checked == false) {
            finalEvent = new calendarEvent(allEventInputs[0].value, allEventInputs[1].value, 'undefined', allEventInputs[2].value, 'undefined', allEventInputs[3].value, allEventInputs[4].value);
            cerrar_modal();
            magia(finalEvent);
            actual_date = new Date(esmenos0(allEventInputs[1].value));
            createCal()
            console.log(finalEvent);
        }
    }
}


//poner otro input date

checkboxDate.addEventListener("click", ponerdata)

function ponerdata() {
    var divdate_modal = document.createElement("div")
    var spandate = document.createElement("span")
    var clocki = document.createElement("i")
    var inputdate_modal = document.createElement("input")
    today = new Date();
    var date = today.getFullYear() + '-' + esmenos0(today.getMonth() + 1) + '-' + esmenos0(today.getDate());
    var date2 = date + "T" + esmenos0(today.getHours()) + ":" + esmenos0(today.getMinutes())
    inputdate_modal.type = "Date"
    inputdate_modal.value = date
    inputdate_modal.classList = "date_modal modal-need eventComonClass neededDate"
    clocki.classList = "far fa-clock"
    spandate.classList = "date-picker"
    divdate_modal.id = "div2"
    if (checkboxDate.checked == true) {
        fecha_modal.appendChild(divdate_modal)
        divdate_modal.appendChild(spandate)
        spandate.appendChild(clocki)
        spandate.appendChild(inputdate_modal)
        typedatatimelocal.type = "Date"
        typedatatimelocal.value = date
    } else if (checkboxDate.checked == false) {
        let allEventInputs = document.querySelectorAll('.eventComonClass');
        var a = document.getElementById("div2")
        if (a) {
            fecha_modal.removeChild(a)
            typedatatimelocal.type = "datetime-local"
            console.log(date2)
            allEventInputs[1].value = date2
        }
    }
}

//poner selection recordatorio

recordatorio_modal.addEventListener("click", recordatorio_modal_time)

function recordatorio_modal_time() {
    if (recordatorio_modal.checked == true) {
        selctdiv_modal.appendChild(crearlistamin())
    } else if (recordatorio_modal.checked == false) {
        var a = document.getElementById("selectrecord")
        if (a) {
            selctdiv_modal.removeChild(a)
        }
    }
}

function crearlistamin() {
    var selectrecordatorio = document.createElement("select")
    selectrecordatorio.classList = "repit_modal eventComonClass"
    selectrecordatorio.id = "selectrecord"
    const timerecordatorio = [5, 10, 15, 30, 60]
    for (const time of timerecordatorio) {
        var option_modal = document.createElement("option")
        option_modal.innerHTML = time + " minutes"
        selectrecordatorio.appendChild(option_modal)
    }
    return selectrecordatorio
}

eventTitleInput.addEventListener("click", transitiontitle)

function transitiontitle() {
    liniabonito.classList.toggle("liniabonito")
}





// PRUEBAS
spanclose.onclick = function () {
    modal.style.display = "none";
}


spanedit.onclick = function () {
    modal.style.display = "none";
    var obj = getEventById(ideventmodal.innerHTML)
    if (obj.fechaFin == "undefined" && obj.remember == "undefined") {
        let allEventInputs = document.querySelectorAll('.eventComonClass');
        allEventInputs[0].value = obj.eventTitle
        allEventInputs[1].value = obj.fechaInicio
        allEventInputs[2].value = obj.repeat
        allEventInputs[3].value = obj.description
        allEventInputs[4].value = obj.eventType
        bigModalId.innerHTML = obj.eventId
    }
    if (obj.fechaFin !== "undefined" && obj.remember == "undefined") {
        checkboxDate.checked = true;
        ponerdata();
        let allEventInputs = document.querySelectorAll('.eventComonClass');
        allEventInputs[0].value = obj.eventTitle
        allEventInputs[1].value = obj.fechaInicio
        allEventInputs[2].value = obj.fechaFin
        allEventInputs[3].value = obj.repeat
        allEventInputs[4].value = obj.description
        allEventInputs[5].value = obj.eventType
        bigModalId.innerHTML = obj.eventId
    }
    if (obj.fechaFin == "undefined" && obj.remember !== "undefined") {
        recordatorio_modal.checked = true;
        recordatorio_modal_time();
        let allEventInputs = document.querySelectorAll('.eventComonClass');
        allEventInputs[0].value = obj.eventTitle
        allEventInputs[1].value = obj.fechaInicio
        allEventInputs[2].value = obj.repeat
        allEventInputs[3].value = obj.remember
        allEventInputs[4].value = obj.description
        allEventInputs[5].value = obj.eventType
        bigModalId.innerHTML = obj.eventId
    }
    if (obj.fechaFin !== "undefined" && obj.remember !== "undefined") {
        recordatorio_modal.checked = true;
        recordatorio_modal_time();
        checkboxDate.checked = true;
        ponerdata();
        let allEventInputs = document.querySelectorAll('.eventComonClass');
        allEventInputs[0].value = obj.eventTitle
        allEventInputs[1].value = obj.fechaInicio
        allEventInputs[2].value = obj.fechaFin
        allEventInputs[3].value = obj.repeat
        allEventInputs[4].value = obj.remember
        allEventInputs[5].value = obj.description
        allEventInputs[6].value = obj.eventType
        bigModalId.innerHTML = obj.eventId
    }
    momentedit = 1
    mainModal.style.display = "block";
}




spandel.onclick = function () {
    modal.style.display = "none";
    deleteById(ideventmodal.innerHTML)
}

function deleteById(X) {
    var obj = getEventById(X);
    var arrdel = JSON.parse(localStorage[obj.eventType])
    console.log(arrdel);
    var arrdelete = arrdel.filter(function (evn) {
        return evn.eventId !== X
    })
    console.log(arrdelete);
    var envalocal = JSON.stringify(arrdelete)
    localStorage[obj.eventType] = envalocal
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    } else if (event.target == mainModal) {
        cerrar_modal()
    }
}
document.onkeydown = function (evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        modal.style.display = "none";
        cerrar_modal()
    }
};



//funcionalidad REPEAT

function magia(a) {
    if (a.allEvent.repeat == 'No se repite') {
        return
    } else if (a.allEvent.repeat == "Cada dia") {
        console.log(a.allEvent.eventId);
        let b = new Date(a.allEvent.fechaInicio)
        b.setHours(b.getHours() + 24);
        let childrenDate = new calendarEvent(a.allEvent.eventTitle, nomalizaeFecha(b, a), a.allEvent.fechaFin, a.allEvent.repeat, a.allEvent.remember, a.allEvent.description, a.allEvent.eventType, a.allEvent.eventId)
        if (b.getFullYear() == actual_date.getFullYear() || b.getFullYear() + 1 == actual_date.getFullYear() + 1) {
            console.log(childrenDate.allEvent.eventId);
            magia(childrenDate);
        }
    } else if (a.allEvent.repeat == "Cada semana") {
        let b = new Date(a.allEvent.fechaInicio)
        b.setDate(b.getDate() + 7);
        let childrenDate = new calendarEvent(a.allEvent.eventTitle, nomalizaeFecha(b, a), a.allEvent.fechaFin, a.allEvent.repeat, a.allEvent.remember, a.allEvent.description, a.allEvent.eventType, a.allEvent.eventId)
        if (b.getFullYear() == actual_date.getFullYear()) {
            console.log('a');
            magia(childrenDate);
        }
    } else if (a.allEvent.repeat == "Cada mes") {
        let b = new Date(a.allEvent.fechaInicio)
        b.setMonth(b.getMonth() + 1);
        let childrenDate = new calendarEvent(a.allEvent.eventTitle, nomalizaeFecha(b, a), a.allEvent.fechaFin, a.allEvent.repeat, a.allEvent.remember, a.allEvent.description, a.allEvent.eventType, a.allEvent.eventId)
        if (b.getFullYear() == actual_date.getFullYear()) {
            console.log('a');
            magia(childrenDate);
        }
    } else if (a.allEvent.repeat == "Laborables") {
        let b = new Date(a.allEvent.fechaInicio)
        b.setHours(b.getHours() + 24);
        if (b.getDay() == 0 || b.getDay() == 6) {
            return
        }
        if (b.getFullYear() == actual_date.getFullYear()) {
            let childrenDate = new calendarEvent(a.allEvent.eventTitle, nomalizaeFecha(b, a), a.allEvent.fechaFin, a.allEvent.repeat, a.allEvent.remember, a.allEvent.description, a.allEvent.eventType, a.allEvent.eventId)
            console.log('a');
            magia(childrenDate);
        }
    }

}

function nomalizaeFecha(a, b) {
    console.log(a);
    console.log(b);
    if (b.allEvent.fechaFin !== 'undefined') {
        var t = a.getDate()
        var c = a.getMonth() + 1
        var d = a.getFullYear()
        return d + "-" + c + "-" + t
    } else {
        var X = esmenos0(a.getHours())
        var y = esmenos0(a.getMinutes())
        var t = esmenos0(a.getDate())
        var c = esmenos0(a.getMonth() + 1)
        var d = a.getFullYear()
        return d + "-" + c + "-" + t + 'T' + X + ':' + y
    }
}



function eventoDia() {
    var evnday = document.querySelectorAll(".number-days")
    for (const X of evnday) {
        X.addEventListener("click", function (evn) {
            var a = evn.srcElement.dataset
            checkboxDate.checked = true;
            ponerdata();
            let allEventInputs = document.querySelectorAll('.eventComonClass');
            var t = esmenos0(a.day)
            var c = esmenos0(a.month)
            var d = a.year
            var result = d + "-" + c + "-" + t
            allEventInputs[1].value = result
            allEventInputs[2].value = result
            mainModal.style.display = "block";
        })
    }
}