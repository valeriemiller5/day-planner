$(document).ready(function () {
    //Moment.js variable set-up
    //Display today's day and date at the top of the screen
    const now = moment().format("dddd, LL");
    $("#today").text(now);
    //Capture the time right now and round down to the nearest hour (ex. 11:29AM rounds to 11:00AM)
    const roundTime = moment().startOf("hour").format("LT");
    // console.log(roundTime);

    //Variables to set CSS styling to textarea background based on time relative to right now
    const past = "has-background-grey-lighter";
    const present = "has-background-warning";
    const future = "has-background-primary";

    //Display any text that has been saved to local storage
    for (var i = 1; i < 25; i++) {
        // console.log($(".textArea"+i))
        // console.log(localStorage.getItem(i));
        $(".textArea"+i).val(localStorage.getItem(i))
    };

    //Function for setting CSS styling to textarea based on timeslot compared to current time
    $("textarea[data-value='dataSlot']").each(function () {
        let id = $(this).attr("id");
        // console.log(id);
        // console.log(moment(id, 'HH:mm a').isBefore(moment(roundTime, 'HH:mm a')));
        if (moment(id, 'HH:mm a').isBefore(moment(roundTime, 'HH:mm a'))) {
            // console.log(this.id)
            $(this).addClass(past)
        }
        if (moment(id, 'HH:mm a').isSame(moment(roundTime, 'HH:mm a'))) {
            // console.log(this.id)
            $(this).addClass(present)
        }
        if (moment(id, 'HH:mm a').isAfter(moment(roundTime, 'HH:mm a'))) {
            // console.log(this.id)
            $(this).addClass(future)
        }
    })

    // Save data in timeblock to localStorage so that it's there every time you open this app in the browser
    $(document).on("click", ".button", function () {
        const key = this.id;
        //Grab the value of the selected button's sibling textarea
        const sibling = $(this).siblings("textarea");
        const value = sibling.val();
        // console.log(key);
        // console.log(value);
        
        //Added Sweetalert, because I like them.
        Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Your scheduled item has been saved',
            showConfirmButton: false,
            timer: 1500
        });
        //Save textarea values to localstorage
        localStorage.setItem(key, value);
    });

});