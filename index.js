function showFormData() {
  const name = document.getElementById("nameInput").value;
  const phone = document.getElementById("phoneInput").value;
  const comment = document.getElementById("commentInput").value;

  // Перевірка на пусті значення
  if (name === "" || phone === "" || comment === "") {
    return;
  }

  // Створення елементу повідомлення
  const notification = document.createElement("div");
  notification.textContent = "Ваше замовлення було відправлено";
  notification.style.position = "fixed";
  notification.style.top = "20px";
  notification.style.right = "20px";
  notification.style.backgroundColor = "green";
  notification.style.color = "white";
  notification.style.padding = "10px";
  notification.style.borderRadius = "5px";
  notification.style.zIndex = "9999";

  // Додаємо елемент повідомлення на сторінку
  document.body.appendChild(notification);

  // Зникнення повідомлення
  setTimeout(() => {
    notification.remove();
  }, 4000);
}

function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

// ЗАПИТИ
document.addEventListener("DOMContentLoaded", () => {
  fetchDoors();

  const addDoorForm = document.getElementById("add-door-form");
  const addButton = document.getElementById("add-door-button");
  addButton.addEventListener("click", () => {
    addDoor(addDoorForm);
  });

  const updateDoorForm = document.getElementById("edit-door-form");
  const updateButton = document.getElementById("update-door-button");
  updateButton.addEventListener("click", () => {
    updateDoor(updateDoorForm);
  });

  const cancelButton = document.getElementById("cancel-update-button");
  cancelButton.addEventListener("click", () => {
    cancelUpdateDoor(updateDoorForm);
  });
});

async function fetchDoors() {
  try {
    const response = await fetch("http://localhost:3000/doors");
    if (!response.ok) {
      throw new Error("Failed to fetch doors");
    }
    const doors = await response.json();
    displayDoors(doors);
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayDoors(doors) {
  const doorList = document.getElementById("door-list");
  doorList.innerHTML = "";
  doors.forEach((door) => {
    const listItem = document.createElement("li");
    listItem.classList.add("door-item");

    const doorInfo = document.createElement("div");
    doorInfo.classList.add("door-info");

    // Create text content for door
    const doorText = document.createElement("span");
    doorText.textContent = `${door.name} - ${door.price}`;

    const doorLink = document.createElement("a");
    doorLink.href = "door.html";
    doorLink.classList.add("btn");
    doorLink.textContent = "Детальніше";

    // Append text content to doorInfo div
    doorInfo.appendChild(doorText);
    doorInfo.appendChild(doorLink); // Add the link here

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("door-buttons");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("door-button", "door-button-edit");
    editButton.addEventListener("click", () => showEditDoorForm(door));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("door-button", "door-button-delete");
    deleteButton.addEventListener("click", () => deleteDoor(door._id));

    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);

    listItem.appendChild(doorInfo);
    listItem.appendChild(buttonsContainer);

    doorList.appendChild(listItem);
  });
}

async function addDoor(form) {
  const name = form.querySelector("#doorName").value;
  const price = form.querySelector("#doorPrice").value;

  try {
    const response = await fetch("http://localhost:3000/doors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price }),
    });

    if (!response.ok) {
      throw new Error("Failed to add door");
    }

    location.reload();
  } catch (error) {
    console.error("Error:", error);
  }
}

function showEditDoorForm(door) {
  const form = document.getElementById("edit-door-form");
  form.style.display = "block";
  form.querySelector("#edit-door-id").value = door._id;
  form.querySelector("#editDoorName").value = door.name;
  form.querySelector("#editDoorPrice").value = door.price;
}

async function updateDoor(form) {
  const doorId = form.querySelector("#edit-door-id").value;
  const name = form.querySelector("#editDoorName").value;
  const price = form.querySelector("#editDoorPrice").value;

  try {
    const response = await fetch(`http://localhost:3000/doors/${doorId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price }),
    });

    if (!response.ok) {
      throw new Error("Failed to update door");
    }

    location.reload();
  } catch (error) {
    console.error("Error:", error);
  }
}

function cancelUpdateDoor(form) {
  form.style.display = "none";
}

async function deleteDoor(doorId) {
  try {
    const response = await fetch(`http://localhost:3000/doors/${doorId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete door");
    }

    location.reload();
  } catch (error) {
    console.error("Error:", error);
  }
}
