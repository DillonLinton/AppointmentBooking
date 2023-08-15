document.addEventListener("DOMContentLoaded", function() {
  const timeSlotsContainer = document.querySelector(".time-slots");
  const bookingForm = document.querySelector(".booking-form");
  const bookButton = document.getElementById("book-btn");
  const confirmationScreen = document.createElement("div");
  const bookedAppointments = {};

  const timeSlots = generateTimeSlots();
  renderTimeSlots(timeSlots);

  bookButton.addEventListener("click", function() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const appointmentType = document.getElementById("appointment-type").value;
    const selectedTimeSlot = document.querySelector(".selected");

    if (!name || !email || !appointmentType || !selectedTimeSlot) {
      alert("Please fill in all the fields and select a time slot.");
      return;
    }

    const timeSlot = selectedTimeSlot.textContent;

    if (bookedAppointments[timeSlot]) {
      alert("Time slot already booked.");
      return;
    }

    bookedAppointments[timeSlot] = { name, email, appointmentType };

    showConfirmationScreen(name, email, appointmentType, timeSlot);
  });

  function generateTimeSlots() {
    const timeSlots = [];
    const startTime = 9;
    const endTime = 17;

    for (let hour = startTime; hour <= endTime; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const timeSlot = `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
        timeSlots.push(timeSlot);
      }
    }

    return timeSlots;
  }

  function renderTimeSlots(slots) {
    slots.forEach(slot => {
      const timeSlotElement = document.createElement("div");
      timeSlotElement.classList.add("time-slot");
      timeSlotElement.textContent = slot;
      timeSlotsContainer.appendChild(timeSlotElement);

      timeSlotElement.addEventListener("click", function() {
        const previouslySelected = document.querySelector(".selected");
        if (previouslySelected) {
          previouslySelected.classList.remove("selected");
        }

        if (!bookedAppointments[slot]) {
          timeSlotElement.classList.add("selected");
        }
      });
    });
  }

  function showConfirmationScreen(name, email, appointmentType, timeSlot) {
    confirmationScreen.innerHTML = `
      <div class="confirmation-box">
        <h2>Appointment Confirmed</h2>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Appointment Type: ${appointmentType}</p>
        <p>Time Slot: ${timeSlot}</p>
        <button id="close-btn">Close</button>
      </div>
    `;
    confirmationScreen.classList.add("confirmation-screen");
    document.body.appendChild(confirmationScreen);

    const closeButton = document.getElementById("close-btn");
    closeButton.addEventListener("click", function() {
      confirmationScreen.style.display = "none";
    });
  }
});