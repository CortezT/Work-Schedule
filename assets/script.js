$(function () {
    //current hour of the day
    var currentHour = dayjs().format('H');
    //Changes color of the time block depending on current hour.
    //Also affected by wether or not the block is past, present, or future relative to current time.
    function hourlyColor() {
      $('.time-block').each(function () {
        var blockHour = parseInt(this.id);
        $(this).toggleClass('past', blockHour < currentHour);
        $(this).toggleClass('present', blockHour === currentHour);
        $(this).toggleClass('future', blockHour > currentHour);
      });
    }
  
    function updateTime() {
      var timeEl = $('#time');
      var dateEl = $('#date');
      var currentDate = dayjs().format('dddd, MMMM D, YYYY');
      var currentTime = dayjs().format('hh:mm:ss A');
      dateEl.text(currentDate);
      timeEl.text(currentTime);
    }
  
    // This will get the user input from the localStorage
    $('.time-block').each(function () {
      var key = $(this).attr('id');
      var value = localStorage.getItem(key);
      $(this).children('.description').val(value);
    });
    // Refreshes color based on past, present, and future
    function refreshColor() {
      $('.time-block').each(function () {
        var blockHour = parseInt(this.id);
        if (blockHour == currentHour) {
          $(this).removeClass('past future').addClass('present');
        } else if (blockHour < currentHour) {
          $(this).removeClass('future present').addClass('past');
        } else {
          $(this).removeClass('past present').addClass('future');
        }
      });
    }
    //Saves user inpute
    function textEntry() {
      $('.saveBtn').on('click', function () {
        var key = $(this).parent().attr('id');
        var value = $(this).siblings('.description').val();
        localStorage.setItem(key, value);
      });
    }
  
    hourlyColor();
    textEntry();
    refreshColor();
  
    setInterval(updateTime, 1000);
  });