// Work planner logic

// init global variables
// current hour is retrieved from moment.js
let currentHour = parseInt(moment().hour());
// store the default hours in the day
let workingHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
// select the row element to listen for user clicks
const cardsEl = $(".row");
// get the current day
const todaysDate = moment().format('LL');
// and display at the top of the page
const todaysDateEl = $("#currentDate");
todaysDateEl.text(`Today's date: ${todaysDate}`);

// get any local user configs
let userSettings = JSON.parse(localStorage.getItem("userSettings") || "[]");

// if there is no stored data for a user,
if (userSettings.length === 0) {
    // then load localStorage with a default array of placeholder data
    for (let i = 0; i < workingHours.length; i++) {
        userSettings[i] = { id: i, text: '' };
    }
    // and save that default array to localStorage
    localStorage.setItem("userSettings", JSON.stringify(userSettings));
    userSettings = JSON.parse(localStorage.getItem("userSettings"));
} else {
    // there are existing settings, so store them
    userSettings = JSON.parse(localStorage.getItem("userSettings"));
    // and display them in the textarea for each card
    for (let i = 0; i < userSettings.length; i++) {
        $(`[data-id=${userSettings[i].id}]`).children('.card-body').children('textarea').val(userSettings[i].text);
    }
}

// color code the current, past, and future cards
for (let i = 0; i < workingHours.length; i++) {

    // check if hour is past
    if (parseInt((moment().hour(workingHours[i]).hour())) < currentHour) {
        // set the card style to greyed-out
        $(`[data-hour=${workingHours[i]}]`).addClass("bg-secondary");

        // check if hour is current
    } else if (parseInt((moment().hour(workingHours[i]).hour())) === currentHour) {
        // set the card style to highlighted
        $(`[data-hour=${workingHours[i]}]`).addClass("bg-info");
    } else {
        // do nothing to these cards, since they are in the future
    }
}

// add save functionality to text/card

// listen for a user clicking on a lock
cardsEl.on('click', '.lockBtn', function () {
    let userNote = $(this).parent().siblings('textarea').val();
    if (userNote === '') { // if the textbox is empty
        return; // do nothing
    } else { // pull the text from the card
        let currentCardId = $(this).parent().parent().parent().data('id');
        userSettings[currentCardId].text = userNote;
        // and update the localStorage
        localStorage.setItem("userSettings", JSON.stringify(userSettings));
    }
});