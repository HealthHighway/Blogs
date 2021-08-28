//custom onsite-form functions
//the only difference is 'stage' and 'state'

//initialization
const atc_btn = document.querySelector('#addtocart')
const main_form = document.querySelector('.os-form')

let problem = document.querySelector('#osf-problem').value;
let currDate = ""

//buttons
const osf_ailBtns = document.querySelectorAll('.osf-ail')
const osf_serviceBtns = document.querySelectorAll('.osf-service')
const osf_timingBtns = document.querySelectorAll('.osf-timing')
const osf_healBtn = document.querySelector('.osf-heal')
const osf_notSureBtn = document.querySelector('.osf-ns') //used
const osf_backBtn = document.querySelector('.osf-back-button')
const osf_finalBtn = document.querySelector('.final-btn')
const osf_payBtn = document.querySelector('#payNow')

//stages
const osf_stages = document.querySelectorAll('.osf-content') //used
const osf_service = document.querySelector('#choose-service') //used
const osf_ailments = document.querySelector('#choose-ailment') //used
const osf_problem = document.querySelector('#not-sure') //used
const osf_contact = document.querySelector('#provide-contact') //used 
const osf_timing = document.querySelector('#choose-timing') //used
const osf_basicInfo = document.querySelector('#basic-info') //used
const osf_days = document.querySelector('#choose-days') //used
const osf_calendar = document.querySelector('#fitness-calendar') //used
const osf_final = document.querySelector('#final-card') //used


//forms
const osf_form_problem = document.querySelector('.osf-form-problem') //used
const osf_form_basic = document.querySelector('.osf-form-basicinfo') //used
const osf_form_contact = document.querySelector('.osf-form-contact') //used
const osf_form_timing = document.querySelector('.time-grid') //used
const osf_form_days = document.querySelector('.day-grid') //used



//other
const buttonsdiv = document.querySelector('.buttttons') //used


// btn event listeners
atc_btn.addEventListener('click', () => { //makes form modal visible
    document.querySelector('.container-for-form').classList.add('active')
    main_form.style.display = "grid"
})

for (let btn of osf_ailBtns) {
    btn.addEventListener('click', () => {
        osf_goToStage(osf_basicInfo)
    })
}
for (let btn of osf_serviceBtns) {
    btn.addEventListener('click', () => {
        osf_goToStage(osf_basicInfo)
    })
}

//To be changed to close btn
// osf_payBtn.addEventListener('click', () => {
//     document.querySelector('.container-for-form').classList.remove('active')
// })



osf_healBtn.addEventListener('click', () => {
    osf_goToStage(osf_ailments)
})

osf_notSureBtn.addEventListener('click', () => {
    osf_goToStage(osf_problem)
})

osf_backBtn.addEventListener('click', () => {
    //back btn code
})
osf_finalBtn.addEventListener('click', () => {
    updating()
    osf_goToStage(osf_final)
})


// form event listeners
osf_form_problem.addEventListener('submit', (e) => {
    e.preventDefault();
    let problemcustom = document.getElementById("osf-problem").value;
    if (problemcustom.length <= 2) {
        document.getElementById('osf-invalid-problem').style.display = "block";
    } else {
        osf_goToStage(osf_basicInfo)
    }
    problem = document.querySelector('#osf-problem').value

})
osf_form_basic.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = document.getElementById("osf-name").value;
    let age = document.getElementById("osf-age").value;
    let weight = document.getElementById("osf-weight").value;
    let height = document.getElementById("osf-height").value;
    if (name.length <= 2) {
        document.getElementById('osf-invalid-name').style.display = "block";
    }
    if (age.length == 0 || Number(age) <= 0 || Number(age) > 100 || isNaN(age)) {
        document.getElementById('osf-invalid-age').style.display = "block";
    }
    if (weight.length == 0 || Number(weight) <= 0 || isNaN(weight)) {
        document.getElementById('osf-invalid-weight').style.display = "block";
    }
    if (height.length == 0 || Number(height) <= 0 || isNaN(height)) {
        document.getElementById('osf-invalid-height').style.display = "block";
    } else {
        osf_goToStage(osf_contact)
    }

})
osf_form_contact.addEventListener('submit', (e) => {
    e.preventDefault();
    let contact = document.getElementById("osf-contact").value;
    let phoneno = /^[0-9]{10}$/;
    if (!contact.match(phoneno)) {
        document.getElementById('osf-invalid-contact').style.display = "block";
    } else { osf_goToStage(osf_timing) }
})
osf_form_timing.addEventListener('submit', (e) => {
    e.preventDefault();
    osf_goToStage(osf_days)
})
osf_form_days.addEventListener('submit', (e) => {
    e.preventDefault();
    osf_goToStage(osf_calendar)
})





// functions
function osf_isActive(stage_name) {
    if (stage_name.classList.contains('active-state')) {
        return true
    } else {
        return false
    }
}


function osf_goToStage(stage_name, percent) {
    if (!stage_name.classList.contains('active-state')) {
        osf_stages.forEach((stage) => stage.classList.remove('active-state'));
        stage_name.classList.add('active-state');

    }
    if (!osf_service.classList.contains('active-state')) {
        osf_service.style.display = "none"
    } else if (osf_service.classList.contains('active-state')) {
        osf_service.style.display = "flex"
    }
    if (osf_isActive(osf_final)) {
        document.querySelector('.osf-gif').style.display = "none"
        osf_final.style.gridColumn = "1/-1"
        osf_final.style.justifySelf = "center"
    } else {
        document.querySelector('.osf-gif').style.display = "unset"

    }

    // customProgressBar.style.minWidth = percent

}



var checkboxeschecked = document.querySelectorAll('input[name="days"]:checked');


function updating() {
    //inputs
    let name = document.querySelector('#osf-name').value
    let age = document.querySelector('#osf-age').value
    let weight = document.querySelector('#osf-weight').value;
    let height = document.querySelector('#osf-height').value
    let contact = document.querySelector('#osf-contact').value

    //spans
    document.querySelector('#f-height').innerHTML = height
    document.querySelector('#f-weight').innerHTML = weight
    document.querySelector('#f-name').innerHTML = name
    document.querySelector('#f-age').innerHTML = age
    document.querySelector('#f-contact').innerHTML = contact

    //days
    var checkboxes = document.getElementsByName('days');
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            let value = document.createElement('span')
            document.querySelector('#f-days').appendChild(value).innerHTML = checkbox.value + ", ";
        }
    })


    //date
    document.getElementById("f-date").innerHTML = currDate.toString().substring(0, 15);


    //time
    var timings = document.getElementsByName('timing');
    for (i = 0; i < timings.length; i++) {
        if (timings[i].checked)
            document.getElementById("f-time").innerHTML = timings[i].value;
    }
    //problem
    document.querySelector('#f-problem').innerHTML = problem;


    //trainer
    var ele = document.getElementsByName('trainer');
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            document.getElementById("f-pref").innerHTML = ele[i].value;
    }


}

