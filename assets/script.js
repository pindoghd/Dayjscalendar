document.addEventListener('DOMContentLoaded', function () {
    const currentDayElement = document.getElementById('current-day');
    const plannerContainer = document.getElementById('planner-container');
  
    // Display current day at the top of the calendar
    currentDayElement.textContent = dayjs().format('dddd, MMMM D, YYYY');
  
    // Create timeblocks for standard business hours
    for (let hour = 9; hour <= 17; hour++) {
      const timeBlock = createTimeBlock(hour);
      plannerContainer.appendChild(timeBlock);
    }
  
    // Load events from local storage
    loadEvents();
  
    function createTimeBlock(hour) {
      const timeBlock = document.createElement('div');
      timeBlock.classList.add('time-block');
  
      const timeLabel = document.createElement('div');
      timeLabel.textContent = `${hour}:00`;
      timeBlock.appendChild(timeLabel);
  
      const eventTextarea = document.createElement('textarea');
      timeBlock.appendChild(eventTextarea);
  
      const saveBtn = document.createElement('button');
      saveBtn.classList.add('save-btn');
      saveBtn.textContent = 'Save';
      saveBtn.addEventListener('click', function () {
        saveEvent(hour, eventTextarea.value);
      });
      timeBlock.appendChild(saveBtn);
  
      // Color-code timeblock based on past, present, or future
      const currentHour = dayjs().hour();
      if (hour < currentHour) {
        timeBlock.classList.add('past');
      } else if (hour === currentHour) {
        timeBlock.classList.add('present');
      } else {
        timeBlock.classList.add('future');
      }
  
      return timeBlock;
    }
  
    function saveEvent(hour, eventText) {
      const events = JSON.parse(localStorage.getItem('events')) || {};
      events[hour] = eventText;
      localStorage.setItem('events', JSON.stringify(events));
    }
  
    function loadEvents() {
      const events = JSON.parse(localStorage.getItem('events')) || {};
      const timeBlocks = plannerContainer.getElementsByClassName('time-block');
      for (let i = 0; i < timeBlocks.length; i++) {
        const hour = i + 9; // Assuming timeblocks start from 9 AM
        const eventText = events[hour] || '';
        const textarea = timeBlocks[i].querySelector('textarea');
        textarea.value = eventText;
      }
    }
  });
  