import { request } from "./api.js";

const res = await request("/dashboard/stats");

if (res && !res.message) {
    document.getElementById("hotel").textContent = res.totalHotel;
    document.getElementById("user").textContent = res.totalUser;
    document.getElementById("message").textContent = res.totalMessage;
    document.getElementById("email").textContent = res.totalEmail;
} else {
    console.error("Erreur dashboard :", res.message);
}