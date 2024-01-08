
// BACKGROUND

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

//ANIMATION

document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll(".section");

  function showSections(index) {
    if (index < sections.length) {
      setTimeout(function() {
        sections[index].classList.add("show");
        showSections(index + 1);
      }, 300); 
    }
  }

  showSections(0);
});

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

// TOGGLE THEME

function setTheme() {
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    document.body.classList.add(currentTheme);
  }
}

const toggleThemeButton = document.getElementById("toggleThemeButton");

toggleThemeButton.addEventListener("click", (event) => {
  event.preventDefault();
  
  document.body.classList.toggle("dark");

  const icon = toggleThemeButton.querySelector("ion-icon");
  const currentIconName = icon.getAttribute("name");

  if (currentIconName === "moon-sharp") {
    icon.setAttribute("name", "sunny-outline");
  } else {
    icon.setAttribute("name", "moon-sharp");
  }
});


// CLOCK

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

// FILTER

document.addEventListener('DOMContentLoaded', () => {
  const tags = document.querySelectorAll('.tags button');
  const posts = document.querySelectorAll('.blog-post .post');

  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      const filter = tag.getAttribute('data-filter');
      
      posts.forEach(post => {
        const postTags = post.getAttribute('data-tags');
        if (filter === 'all' || postTags.includes(filter)) {
          post.classList.remove('hidden');
        } else {
          post.classList.add('hidden');
        }
      });
    });
  });
});


// BLOG SCROLL

document.querySelectorAll('.navigation').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('data-target');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// SCROLL TO TOP

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

window.onscroll = function() {
  const btnToTop = document.getElementById("btnToTop");

  if (document.documentElement.scrollTop > 300 || document.body.scrollTop > 300) {
    btnToTop.style.display = "block";
  } else {
    btnToTop.style.display = "none";
  }
};

// COPY CODE

document.addEventListener('DOMContentLoaded', function() {
  const copyButton = document.querySelector('.copy-button');
  const codeSnippet = document.querySelector('.coding code');

  copyButton.addEventListener('click', function() {
      const textArea = document.createElement('textarea');
      textArea.value = codeSnippet.textContent;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
  });
});

const copyButtons = document.querySelectorAll('.copy-button');

copyButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    copyCode(index);
  });
});

function copyCode(index) {
  const codeBlocks = document.querySelectorAll('.coding pre code');
  const codeToCopy = codeBlocks[index].textContent.trim();

  const copyMessage = document.querySelectorAll('.copy-message')[index];

  const range = document.createRange();
  range.selectNode(codeBlocks[index]);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      copyMessage.style.display = 'block';
      setTimeout(() => {
        copyMessage.style.display = 'none';
      }, 2000);
    }
  } catch (err) {
    console.error('Could not copy text', err);
  }

  window.getSelection().removeAllRanges();
}

