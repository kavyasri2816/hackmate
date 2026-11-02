const events = [
  {id:1,title:"Hack With Hyderabad 3.0",type:"Hackathon",date:"03 Oct 2026",location:"Hyderabad, India",desc:"An 8-hour technology hackathon to collaborate, experiment, and build.",visual:"visual-purple",symbol:"⌘",tag:"BUILD & INNOVATE"},
  {id:2,title:"AI Build Sprint",type:"Hackathon",date:"14 Nov 2026",location:"Online",desc:"Prototype a practical AI solution with a team of curious builders.",visual:"visual-blue",symbol:"✳",tag:"ARTIFICIAL INTELLIGENCE"},
  {id:3,title:"Flutter UI Workshop",type:"Workshop",date:"21 Nov 2026",location:"Online",desc:"Learn to create polished, responsive mobile interfaces with Flutter.",visual:"visual-orange",symbol:"◈",tag:"APP DEVELOPMENT"},
  {id:4,title:"Cloud & DevOps Meetup",type:"Meetup",date:"28 Nov 2026",location:"Visakhapatnam, India",desc:"Explore cloud deployment, automation, and real-world DevOps workflows.",visual:"visual-green",symbol:"☁",tag:"CLOUD TECHNOLOGY"},
  {id:5,title:"Women Who Code Connect",type:"Meetup",date:"05 Dec 2026",location:"Online",desc:"Connect with developers, share experiences, and learn from the community.",visual:"visual-pink",symbol:"✦",tag:"COMMUNITY"},
  {id:6,title:"Full-Stack Starter Lab",type:"Workshop",date:"12 Dec 2026",location:"Online",desc:"Build a complete web application and understand how the pieces work together.",visual:"visual-dark",symbol:"{ }",tag:"WEB DEVELOPMENT"}
];

const grid = document.getElementById("event-grid");
const search = document.getElementById("search");
const empty = document.getElementById("empty-state");
let activeFilter = "All";
let saved = JSON.parse(localStorage.getItem("hackmate-saved") || "[]");

function renderEvents(){
  const term = search.value.toLowerCase().trim();
  const filtered = events.filter(e => (activeFilter === "All" || e.type === activeFilter) &&
    [e.title,e.type,e.location,e.desc,e.tag].join(" ").toLowerCase().includes(term));
  document.getElementById("result-count").textContent = String(filtered.length).padStart(2,"0");
  document.getElementById("hero-event-count").textContent = String(events.length).padStart(2,"0");
  grid.innerHTML = filtered.map(e => `
    <article class="event-card">
      <div class="card-visual ${e.visual}"><span class="type-tag">${e.tag}</span><span class="visual-symbol">${e.symbol}</span></div>
      <div class="card-body">
        <div class="event-meta"><span>${e.type.toUpperCase()}</span><span>${e.date}</span></div>
        <h3>${e.title}</h3><p>${e.desc}</p>
        <div class="card-footer"><span class="location">⌖ ${e.location}</span>
          <button class="register-btn ${saved.includes(e.id) ? "joined" : ""}" data-id="${e.id}">${saved.includes(e.id) ? "✓ Registered" : "Register +"}</button>
        </div>
      </div>
    </article>`).join("");
  empty.classList.toggle("hidden", filtered.length !== 0);
  grid.classList.toggle("hidden", filtered.length === 0);
}
function renderSaved(){
  const container = document.getElementById("saved-events");
  document.getElementById("saved-count").textContent = saved.length;
  if(!saved.length){
    container.innerHTML = `<div class="empty-dashboard"><span>✧</span><b>Your journey starts with one event.</b><p>Register for an opportunity and it will appear here.</p></div>`;
    return;
  }
  container.innerHTML = saved.map(id => events.find(e => e.id === id)).filter(Boolean).map(e => `
    <div class="saved-row"><div><b>${e.title}</b><small>${e.date} · ${e.location} · ${e.type}</small></div>
    <button class="remove-btn" data-remove="${e.id}">Remove</button></div>`).join("");
}
function persist(){localStorage.setItem("hackmate-saved",JSON.stringify(saved));renderEvents();renderSaved();}
let toastTimer;
function showToast(message){
  const toast=document.getElementById("toast");toast.textContent=message;toast.classList.add("show");
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2300);
}
document.getElementById("filters").addEventListener("click",e=>{
  const button=e.target.closest("button[data-filter]");if(!button)return;
  activeFilter=button.dataset.filter;
  document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===button));
  renderEvents();
});
search.addEventListener("input",renderEvents);
grid.addEventListener("click",e=>{
  const button=e.target.closest("button[data-id]");if(!button)return;
  const id=Number(button.dataset.id);
  if(saved.includes(id)){saved=saved.filter(x=>x!==id);showToast("Registration removed.");}
  else{saved.push(id);showToast("You're registered! Find it in My Events.");}
  persist();
});
document.getElementById("saved-events").addEventListener("click",e=>{
  const button=e.target.closest("button[data-remove]");if(!button)return;
  saved=saved.filter(id=>id!==Number(button.dataset.remove));persist();showToast("Event removed from your list.");
});
renderEvents();renderSaved();
