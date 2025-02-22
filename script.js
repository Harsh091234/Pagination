let pageContent = document.getElementById("pageContent");
let paginationBtns = document.querySelectorAll(".pageBtn");
let prevBtn = document.querySelector(".previousBtn");
let nextBtn = document.querySelector(".nextBtn");

const pages = ["page1.html", "page2.html", "page3.html", "page4.html"];

async function getText(file) {
    let myObject = await fetch(file);
    let myText = await myObject.text();
    pageContent.innerHTML = myText;
}


let currentPage = 1;

async function UpdatePagination() {
    await getText(pages[currentPage - 1]);

    paginationBtns.forEach((btn, index) => {
        btn.classList.toggle('active', index + 1 === currentPage);

    });

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === pages.length;
}

paginationBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        currentPage = index + 1;
        UpdatePagination();
    })
});

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        UpdatePagination();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentPage < pages.length) {
        currentPage++;
        UpdatePagination();
    }
});