function showDetails(title, description, imageSrc) {
    document.getElementById("dessertTitle").textContent = title;
    document.getElementById("dessertDescription").textContent = description;
    document.getElementById("dessertImage").src = imageSrc;
    document.getElementById("dessertImage").alt = title;
    
    document.getElementById("dessertDetails").classList.remove("hidden");
    document.getElementById("dessertList").classList.add("hidden");
}

document.getElementById("main-menu").addEventListener("click", function () {
    document.getElementById("dessertDetails").classList.add("hidden");
    document.getElementById("dessertList").classList.remove("hidden");
});
