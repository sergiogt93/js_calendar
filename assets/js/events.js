class calendarEvent {
    constructor(eventTitle, fechaInicio, fechaFin, repeat, remember, description, eventType, id) {
        this.setIDToStorage();
        if (id = "undefined") {
            var goodId = localStorage.id
        } else {
            var goodId = id
        }
        this.allEvent = {
            eventTitle: eventTitle,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,
            repeat: repeat,
            remember: remember,
            description: description,
            eventType: eventType,
            eventId: goodId
        }
        this.setToLocalStorage(this.allEvent.eventType);
    }
    setToLocalStorage(eventType) {
        if (localStorage[eventType]) {
            let typeStorage = JSON.parse(localStorage[eventType]);
            typeStorage.push(this.allEvent)
            localStorage[eventType] = (JSON.stringify(typeStorage))
        } else if (!localStorage[eventType]) {
            let typeStorage = []
            typeStorage.push(this.allEvent);
            localStorage[eventType] = (JSON.stringify(typeStorage))
        }
    }
    setIDToStorage() {
        if (!localStorage.id) {
            localStorage.id = '1';
        }
        localStorage.id = parseInt(localStorage.id) + 1
    }
    createTagEvent(father) {
        if (this.allEvent.fechaInicio.split("T").length > 1) {
            var horaevento = this.allEvent.fechaInicio.split("T")
            horaevento = horaevento[1]
            var content = horaevento + ' ' + this.allEvent.eventTitle
            if (this.allEvent.eventType == 'Meeting') {
                father.appendChild(inDay(content, this.allEvent.eventId, 'miniEvents inday', 'meeting'))
            } else if (this.allEvent.eventType == 'Personal') {
                father.appendChild(inDay(content, this.allEvent.eventId, 'miniEvents inday', 'personal'))
            } else if (this.allEvent.eventType == 'Study')
                father.appendChild(inDay(content, this.allEvent.eventId, 'miniEvents inday', 'study'))
        } else {
            if (this.allEvent.eventType == 'Meeting') {
                father.appendChild(newElement({
                    tag: 'div',
                    id: this.allEvent.eventId,
                    clas: ['miniEvents', 'meeting'],
                    content: this.allEvent.eventTitle
                }))
            } else if (this.allEvent.eventType == 'Personal') {
                father.appendChild(newElement({
                    tag: 'div',
                    id: this.allEvent.eventId,
                    clas: ['miniEvents', 'personal'],
                    content: this.allEvent.eventTitle
                }))
            } else if (this.allEvent.eventType == 'Study')
                father.appendChild(newElement({
                    tag: 'div',
                    id: this.allEvent.eventId,
                    clas: ['miniEvents', 'study'],
                    content: this.allEvent.eventTitle
                }))
        }
    }
    eraseEvent() {
        let typeStorage = JSON.parse(localStorage.eventType);
        typeStorage.forEach(element => {
            if (this.allEvent == element) {
                console.log('a');
            };
        });
    }
}


function startSetTimeOut() {
    setTimeout(() => {
        checkPassEvents();
    }, 100);
}

setInterval(function () {
    recuerda()
}, 1000)

function checkPassEvents() {
    let currentEvents = allLocalStorage(['Meeting', 'Personal', 'Study']);
    for (const iterator of currentEvents) {
        if (iterator.fechaFin == 'undefined') {
            let a = new Date(iterator.fechaInicio)
            if (new Date(iterator.fechaInicio) <= actual_date) {
                let currentId = iterator.eventId;
                iterator.eventType = 'PassedEvents'
                iterator.eventId = '0'
                if (localStorage['PassedEvents']) {
                    let typeStorage = JSON.parse(localStorage['PassedEvents']);
                    typeStorage.push(iterator)
                    localStorage['PassedEvents'] = (JSON.stringify(typeStorage))
                } else if (!localStorage['PassedEvents']) {
                    let typeStorage = []
                    typeStorage.push(iterator);
                    localStorage['PassedEvents'] = (JSON.stringify(typeStorage))
                }
                deleteById(currentId);
            }
        } else {
            let a = new Date(iterator.fin)
            if (new Date(iterator.fin) <= actual_date) {
                let currentId = iterator.eventId;
                iterator.eventType = 'PassedEvents'
                iterator.eventId = '0'
                if (localStorage['PassedEvents']) {
                    let typeStorage = JSON.parse(localStorage['PassedEvents']);
                    typeStorage.push(iterator)
                    localStorage['PassedEvents'] = (JSON.stringify(typeStorage))
                } else if (!localStorage['PassedEvents']) {
                    let typeStorage = []
                    typeStorage.push(iterator);
                    localStorage['PassedEvents'] = (JSON.stringify(typeStorage))
                }
                deleteById(currentId);
            }
        }
    }
}

function allLocalStorage(X = []) {
    let typeStorage=undefined
    for (const a of X) {
        if (!localStorage[a]) {
        } else {
            if (typeStorage == undefined) {
                typeStorage = JSON.parse(localStorage[a]);
            } else {
                let typeStorage2 = typeStorage;
                let typeStorage3 = JSON.parse(localStorage[a]);
                typeStorage = typeStorage3.concat(typeStorage2);
            }
        }
    }
    return typeStorage
}

function getEventById(id) {
    var X = ['Meeting', 'Personal', 'Study']
    let typeStorage = allLocalStorage(X);
    return typeStorage.find(element => element.eventId == id)
}

function findEvent(father, date2 = null) {
    var fatherDay = father.firstChild.dataset.day;
    let fatherMonth = father.firstChild.dataset.month;
    let fatherYear = father.firstChild.dataset.year;
    let product_data=[]
    product_data = allLocalStorage(['Meeting', 'Personal', 'Study']);
    // console.log(product_data);
    let toPrint=[];
    if (date2 == null) {
        for (const a of product_data) {
            // console.log(a)
            var product_data2=product_data
            if(a.fechaFin !== "undefined"){
                    var init =new Date(a.fechaInicio)
                    var fin =new Date(a.fechaFin)
                    // console.log(a)
                    var monthdifer=fin.getMonth()-init.getMonth()
                    var daydifer=fin.getDate()-init.getDate()
                    var duration =daydifer+(monthdifer*30)
                    // console.log(duration);
                    for(let i=1;i<duration+1;i++){
                        var goodInit=a.fechaInicio
                        var realA=new Date(a.fechaInicio)
                        var seDay =realA.getDate()+1
                        realA.setDate(seDay)
                        var fecharepe=realA.getFullYear()+"-"+esmenos0(realA.getMonth()+1)+"-"+esmenos0(realA.getDate())
                        // console.log(x)
                        // a.fechaInicio=goodInit
                        product_data2.push(creaobj(a,fecharepe))
                    }

                }
                else{
                    toPrint.push(a)
                }
            }
            var resultProductData = product_data2.filter(
                function (a) {
                    var b = new Date(a.fechaInicio);
                    let eventDate = b.getDate();
                    let eventMonth = b.getMonth();
                    let eventYear = b.getFullYear();
                    return eventYear == fatherYear && eventMonth == fatherMonth && eventDate == fatherDay;
                });
    };
    let set                 = new Set( resultProductData.map( JSON.stringify ) )
    let arrSinDuplicaciones = Array.from( set ).map( JSON.parse );
    return arrSinDuplicaciones;
}


function creaobj(obj, fecha) {
    return {
        eventTitle: obj.eventTitle,
        fechaInicio: fecha,
        fechaFin: obj.fechaFin,
        repeat: obj.repeat,
        remember: obj.remember,
        description: obj.description,
        eventType: obj.eventType,
        eventId: obj.goodId
    }
}

function findFather(x) {
    for (let index = 0; index < boxEventsCal.length; index++) {
        let realChilds = findEvent(boxEventsCal[index]);
        realChilds.forEach(element => {
            // if (x !== null) {
            // if (element.eventId == x) {
            //     return
            // }
            creaTag(element, index)
            // }
        });
    }
    var eventsClick = document.getElementsByClassName("miniEvents")
    for (const evn of eventsClick) {
        evn.addEventListener("click", function (evn) {
            console.log(evn.srcElement)
            var obj = getEventById(evn.srcElement.id)
            console.log(obj)
            titleModalInfo.innerHTML = obj.eventTitle
            dateModalInfo.innerHTML = obj.fechaInicio
            repetModalInfo.innerHTML = obj.repeat;
            cicletype.classList.add((obj.eventType).toLowerCase())
            typeeventmodal.innerHTML = obj.eventType
            ideventmodal.innerHTML = obj.eventId
            modal.style.display = "block";
        })
    }
}



function creaTag(element, index) {
    if (element.fechaInicio.split("T").length > 1) {
        var horaevento = element.fechaInicio.split("T")
        horaevento = horaevento[1]
        var content = horaevento + ' ' + element.eventTitle
        if (element.eventType == 'Meeting') {
            boxEventsCal[index].appendChild(inDay(content, element.eventId, 'miniEvents inday', 'meeting'))
        } else if (element.eventType == 'Personal') {
            boxEventsCal[index].appendChild(inDay(content, element.eventId, 'miniEvents inday', 'personal'))
        } else if (element.eventType == 'Study')
            boxEventsCal[index].appendChild(inDay(content, element.eventId, 'miniEvents inday', 'study'))
    } else {
        if (element.eventType == 'Meeting') {
            boxEventsCal[index].appendChild(newElement({
                tag: 'div',
                id: element.eventId,
                clas: ['miniEvents', 'meeting'],
                content: element.eventTitle
            }))
        } else if (element.eventType == 'Personal') {
            boxEventsCal[index].appendChild(newElement({
                tag: 'div',
                id: element.eventId,
                clas: ['miniEvents', 'personal'],
                content: element.eventTitle
            }))
        } else if (element.eventType == 'Study')
            boxEventsCal[index].appendChild(newElement({
                tag: 'div',
                id: element.eventId,
                clas: ['miniEvents', 'study'],
                content: element.eventTitle
            }))
    }
}



function recuerda() {
    let all = allLocalStorage(["Meeting", "Personal", "Study"])
    for (const one of all) {
        recuerdame(one)
    }
}






function recuerdame(evn) {
    if (evn.remember !== "undefined") {
        var actualDate = new Date()
        var dateEvent = new Date(evn.fechaInicio)
        if (dateEvent.getFullYear() == actualDate.getFullYear()) {
            if (dateEvent.getMonth() == actualDate.getMonth()) {
                if (dateEvent.getDate() == actualDate.getDate()) {
                    var minAntes = evn.remember.split(" ")[0]
                    var min = (dateEvent.getMinutes() - parseInt(minAntes))
                    dateEvent.setMinutes(min)
                    if (dateEvent.getHours() == actualDate.getHours()) {
                        if (dateEvent.getMinutes() == actualDate.getMinutes()) {
                            contentRemmember.innerHTML = "Tienes un evento en : " + minAntes + " minutos"
                            modalRemmember.style.display = "block"
                        }
                    }
                }
            }
        }
    }
}