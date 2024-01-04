
 function bgAnimationItems(){
    const rows = 7, cols = 10;
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
             const div = document.createElement("div");
             div.className = `col-${j+1}`; 
             document.querySelector(".bg-animation-effect").appendChild(div); 
         }
   }
 }
bgAnimationItems();

// DOCK

const dockItems = document.querySelectorAll(".dock-item");

const defaultItemScale = 1;
const hoverItemScale = 2.5;
const neighborItemScale = 2;

const defaultMargin = "10px";
const expandedMargin = "40px";

const updateDockItems = () => {
  dockItems.forEach((item) => {
    let scale = defaultItemScale;
    let margin = defaultMargin;

    const isHovered = item.classList.contains("hovered");
    const isNeighbor = item.classList.contains("neighbor");


    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (!isMobile) {
      if (isHovered) {
        scale = hoverItemScale;
        margin = expandedMargin;
      } else if (isNeighbor) {
        scale = neighborItemScale;
        margin = expandedMargin;
      }
    }

    item.style.transform = `scale(${scale})`;
    item.style.margin = `0 ${margin}`;
  });
};


window.addEventListener("resize", updateDockItems);
updateDockItems();

dockItems.forEach((item) => {
  item.addEventListener("mousemove", () => {
    dockItems.forEach((otherItem) => {
      otherItem.classList.remove("hovered", "neighbor");
    });

    item.classList.add("hovered");

    const currentIndex = Array.from(dockItems).indexOf(item);
    const prevItem = dockItems[currentIndex - 1];
    const nextItem = dockItems[currentIndex + 1];

    if (prevItem) prevItem.classList.add("neighbor");
    if (nextItem) nextItem.classList.add("neighbor");

    updateDockItems();
  });
});

document.querySelector(".dock").addEventListener("mouseleave", () => {
  dockItems.forEach((item) => {
    item.classList.remove("hovered", "neighbor");
  });

  updateDockItems();
});


// CURSOR
const trailer = document.getElementById("trailer");

const animateTrailer = (e, interacting) => {
  const x = e.clientX - trailer.offsetWidth / 2,
        y = e.clientY - trailer.offsetHeight / 2;
  
  const keyframes = {
    transform: `translate(${x}px, ${y}px) scale(${interacting ? 8 : 1})`
  }
  
  trailer.animate(keyframes, { 
    duration: 800, 
    fill: "forwards" 
  });
}

const getTrailerClass = type => {
  switch(type) {
    case "video":
      return "fa-solid fa-play";
    default:
      return "fa-solid fa-arrow-up-right"; 
  }
}

window.onmousemove = e => {
  const interactable = e.target.closest(".interactable"),
        interacting = interactable !== null;
  
  const icon = document.getElementById("trailer-icon");
  
  animateTrailer(e, interacting);
  
  trailer.dataset.type = interacting ? interactable.dataset.type : "";
  
  if(interacting) {
    icon.className = getTrailerClass(interactable.dataset.type);
  }
}

// CARDS

const contentWrMainElements = document.querySelectorAll(".content-wr-main");

contentWrMainElements.forEach(contentWrMain => {

  contentWrMain.onmousemove = e => {
    const cards = contentWrMain.querySelectorAll(".card");
    cards.forEach(card => {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  };
});

const allArticles = document.getElementById("all-articles");

allArticles.onmousemove = e => {
  const rect = allArticles.getBoundingClientRect(),
    x = e.clientX - rect.left;

  allArticles.style.setProperty("--mouse-x", `${x}px`);
};

allArticles.onmouseleave = () => {
  allArticles.style.setProperty("--mouse-x", `-100px`); 
};

const cloudEngineer = document.getElementById("cloud-engineer");

cloudEngineer.onmousemove = e => {
  const rect = cloudEngineer.getBoundingClientRect(),
    x = e.clientX - rect.left;

  cloudEngineer.style.setProperty("--mouse-x", `${x}px`);
};

cloudEngineer.onmouseleave = () => {
  cloudEngineer.style.setProperty("--mouse-x", `-100px`);
};


// TOGGLE THEME

const toggleThemeButton = document.getElementById("toggleThemeButton");

toggleThemeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const icon = toggleThemeButton.querySelector("ion-icon");
  const currentIconName = icon.getAttribute("name");

  if (currentIconName === "moon-sharp") {
    icon.setAttribute("name", "sunny-outline");
  } else {
    icon.setAttribute("name", "moon-sharp");
  }
});




const timeArea = document.querySelector(".time");

const timePeriod = document.querySelector(".time-per");

const tik = () => {

    const date = new Date();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (hours < 10) {
        hours = "0" + hours;
    }
    
    if (minutes < 10) {
        minutes = "0" + minutes; 
    }

    if (seconds < 10) {
        seconds = "0" + seconds; 
    }

    const ampm = (hours >= 12) ? "pm" : "am";

    const time = `${hours}:${minutes}:${seconds}`;

    timeArea.innerHTML = time;
    timePeriod.innerHTML = ampm;

    setTimeout(tik, 1000);

};

tik();


 const filtro = document.getElementById('filtro');
 const nombres = document.getElementById('nombres');


 filtro.addEventListener('input', () => {
   const textoFiltro = filtro.value.toLowerCase();
   const divsNombres = nombres.querySelectorAll('div');

   
   divsNombres.forEach(divNombre => {
     const textoDiv = divNombre.innerText.toLowerCase();
     if (textoDiv.includes(textoFiltro)) {
       divNombre.style.display = 'block';
     } else {
       divNombre.style.display = 'none';
     }
   });
 });