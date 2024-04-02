document.addEventListener("DOMContentLoaded", () => {
  //Form set up
  let form = document.querySelector("#comment-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    appendList(form.comment_input.value);
    form.reset();
  });
  //set up the timer
  intervalId = setInterval(incrementCounter, 1000);
});

//Function to append list to the form
function appendList(comment) {
  let li = document.createElement("li");
  li.textContent = comment;
  document.getElementById("list").appendChild(li);
}
const counterElement = document.getElementById("counter");
const submit = document.getElementById("submit");
const plusButton = document.getElementById("plus");
const minusButton = document.getElementById("minus");
const likeButton = document.getElementById("heart");
const likesElement = document.querySelector(".likes");
const pauseButton = document.getElementById("pause");

let count = 0;
let likes = 1;
let intervalId;
let isPaused = false;

// Start the timer on page load

function incrementCounter() {
  if (!isPaused) {
    count++;
    counterElement.textContent = count;
  }
}
//add the value of the count by 1
plusButton.addEventListener("click", function () {
  count++;
  counterElement.textContent = count;
});
//reduce the value of the count by 1

minusButton.addEventListener("click", function () {
  if (count > 0) {
    count--;
    counterElement.textContent = count;
  }
});
likeButton.addEventListener("click", function () {
    // Check if a list item already exists for the current count
    const existingListItem = likesElement.querySelector(`li[data-count="${count}"]`);
  
    if (existingListItem) {
      const existingCount = existingListItem.dataset.likeCount ? parseInt(existingListItem.dataset.likeCount, 10) : 1;
      existingListItem.textContent = `${count} has been liked ${existingCount} times`;
      // Update like count data attribute
      existingListItem.dataset.likeCount = existingCount + 1; 
    } else {
      // Create a new list item for the unique count
      const newLikeItem = document.createElement("li");
      // Display only the count
      newLikeItem.textContent = `${count} has been liked ${likes} times`; 
      newLikeItem.dataset.count = count;
      // Set initial like count for new items
      newLikeItem.dataset.likeCount = 1; 
      likesElement.appendChild(newLikeItem);
    }
  });


pauseButton.addEventListener("click", function () {
  if (!isPaused) {
    clearInterval(intervalId);
    isPaused = true;
    pauseButton.textContent = "Resume";
    // Call a function to remove functionality
    blurButtons();
  } else {
    intervalId = setInterval(incrementCounter, 1000);
    isPaused = false;
    pauseButton.textContent = "Pause";
    // Call a function to restore functionality
    unblurButtons();
  }
});

function blurButtons() {
  // disable the buttons when triggered
  counterElement.disabled = true;
  plusButton.disabled = true;
  minusButton.disabled = true;
  likeButton.disabled = true;
  submit.disabled = true

}

function unblurButtons() {
  // Undisable the buttons when triggered
  counterElement.disabled = false;
  plusButton.disabled = false;
  minusButton.disabled = false;
  likeButton.disabled = false;
  submit.disabled = false
}
