import config from "../conf/index.js";

async function fetchReservations() {
  try {
    const response = await fetch(`${config.backendEndpoint}/reservations`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return null;
  }
}

function addReservationToTable(reservations) {
  const tableParent = document.getElementById("reservation-table-parent");
  const banner = document.getElementById("no-reservation-banner");
  const table = document.getElementById("reservation-table");

  table.innerHTML = "";

  if (!reservations || reservations.length === 0) {
    tableParent.style.display = "none";
    banner.style.display = "block";
    return;
  }

  tableParent.style.display = "block";
  banner.style.display = "none";

  reservations.forEach((reservation) => {
    const row = document.createElement("tr");
    row.id = reservation.id;

    const transactionLink = document.createElement("a");
    transactionLink.href = `detail/?adventure=${reservation.adventure}`;
    transactionLink.innerHTML = reservation.id;
    row.appendChild(transactionLink);

    const values = [
      reservation.name,
      reservation.adventureName,
      reservation.person,
      new Date(reservation.date).toLocaleDateString("en-IN"),
      String(reservation.price),
      new Date(reservation.time).toLocaleString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }) + ", " + new Date(reservation.time).toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      }),
    ];

    values.forEach((value) => {
      const cell = document.createElement("td");
      cell.innerHTML = value;
      row.appendChild(cell);
    });

    const actionCell = document.createElement("td");
    const visitButton = document.createElement("a");
    visitButton.id = reservation.id + "-visit";
    visitButton.className = "reservation-visit-button";
    visitButton.href = `detail/?adventure=${reservation.adventure}`;
    visitButton.innerHTML = "Visit Adventure";
    actionCell.appendChild(visitButton);
    row.appendChild(actionCell);

    table.appendChild(row);
  });
}

export { fetchReservations, addReservationToTable };
