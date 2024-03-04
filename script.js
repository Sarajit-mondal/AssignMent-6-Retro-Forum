// API
// LatestPosts: - https://openapi.programming-hero.com/api/retro-forum/latest-posts

// AllPosts: - https://openapi.programming-hero.com/api/retro-forum/posts

// PostSearchByQuery
// PostByQuery: - https://openapi.programming-hero.com/api/retro-forum/posts?category=categoryName

// Example
// PostByQuery: - https://openapi.programming-hero.com/api/retro-forum/posts?category=coding

const viewListContainer = document.getElementById("marks-container");
const latestContainer = document.getElementById("latest-container");
const allFormContainer = document.getElementById("all-card-contianer");
const lodderEl = document.getElementById("lodder");
const errowEl = document.getElementById("errow");
const errorName = document.getElementById("errow-name");

let readList = 0;
const allData = "all";
const latestData = "latest";

// search data
const searchdata = async (category) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`
    );
    const data = await res.json();
    const posts = data.posts;
    lodderEl.classList.add("hidden");
    errowEl.classList.add("hidden");
    if (posts.length === 0) {
      lodderEl.classList.add("hidden");
      errowEl.classList.remove("hidden");
      errorName.innerText = "No Data";
    }
    createForum(posts);
  } catch (error) {
    lodderEl.classList.add("hidden");
    errowEl.classList.remove("hidden");
    errorName.innerText = error.message;
  }
};
// all forum data
const findForumData = async (category, isData) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/${category}`
    );
    const data = await res.json();
    const posts = data.posts;

    lodderEl.classList.add("hidden");
    errowEl.classList.add("hidden");
    if (isData === "all") {
      createForum(posts);
    } else if (isData === "latest") {
      latestForum(data);
    }
  } catch (error) {
    errowEl.classList.remove("hidden");
    errorName.innerText = error.message;
  }
};

// create forum all or search
function createForum(posts) {
  console.log(posts);

  for (let data of posts) {
    const div = document.createElement("div");
    div.className =
      "bg-[#797DFC1A] p-6  rounded-2xl flex flex-col md:flex-row gap-5 hover:border-2 hover:border-[#797DFC] hover:bg-[#797DFC21] cursor-pointer shadow-xl";
    div.innerHTML = `
    <!-- profile -->
                <div class="w-16 h-16 rounded-xl bg-light-color relative mx-auto">
                    <img src="https://cdn-icons-png.flaticon.com/512/3001/3001758.png" alt="" class="w-auto h-auto">
                    <span id="online" class="w-3 h-3 ${
                      data.isActive ? "bg-[#10B981]" : "bg-[#FF3434]"
                    }  block rounded-full absolute -top-1 -right-1"></span>
               </div>
               <!-- details -->
               <div class="w-full">
                <div class="pb-5 border-b-2  border-dashed border-gray-color">
                <p class="font-extrabold"># <span class="mr-6">${
                  data.category
                }</span>  Designation:  <span>${data.author.name}</span></p>
                <h3 class="font-bold">${data.title}</h>
                <p class="font-bold">${data.description}</p>
                </div>
                <!-- icons -->
                <div class="flex justify-between items-center my-5 w-full">
                  <div class="flex gap-x-10 items-center">
                  <div class="space-x-3  font-bold text-gray-color"><i class="fa-regular fa-message"></i><span>${
                    data.comment_count
                  }</span></div>
                  <div class="space-x-3  font-bold text-gray-color"><i class="fa-regular fa-eye"></i><span>${
                    data.view_count
                  }</span></div>
                  <div class="space-x-3  font-bold text-gray-color"><i class="fa-regular fa-clock"></i><span>${
                    data.posted_time
                  } min</span></div>
                  </div>
                   <button id="mark-btn" onclick="makeAsRead('${data.title}',${
      data.view_count
    })" class="rounded-full h-7 w-7 bg-[#10B981] active:scale-105 "><i class="fa-solid fa-envelope text-light-color "></i></button>
                </div>
               </div>
    `;
    allFormContainer.appendChild(div);
  }
}

// make list and view list
function makeAsRead(title, view) {
  console.log(title, view);
  readList++;
  document.getElementById("view-count").innerText = readList;
  const div = document.createElement("div");
  div.className =
    "flex justify-between items-center bg-light-color p-4 rounded-2xl gap-2 my-4 shadow-xl";
  div.innerHTML = `
  <h4 class="font-extrabold">${title}</h4>
                 <div class="space-x-3  font-bold text-gray-color flex items-center"><i class="fa-regular fa-eye"></i><span>${view}</span></div>
  `;
  viewListContainer.appendChild(div);
}

/// Creat latest forum
function latestForum(posts) {
  console.log(posts);
  for (let data of posts) {
    const div = document.createElement("div");
    div.className =
      "card card-compact  bg-base-100 shadow-xl p-5 bg-[#797DFC1C] cursor-pointer hover:bg-[#797DFC1F]";
    div.innerHTML = `
    <figure><img src=${
      data.cover_image
    } alt="Shoes" class="rounded-xl"/></figure>
  <div class="card-body space-y-2">
    <span class=" flex items-center space-x-2">
      <i class="fa-solid fa-calendar-days text-gray-color"></i>
      <p class="font-extrabold">${
        data.author.posted_date ? data.author.posted_date : "No publish date"
      }</p>

    </span>
    <h2 class="card-title font-extrabold">${data.title}</h2>
    <p class="font-bold text-gray-color">${data.description}</p>
    <div class="flex space-x-3">
      <img src="https://cdn-icons-png.flaticon.com/512/4139/4139981.png" alt=" " class="w-11 rounded-full h-11">
      <span>
        <h4 class="text-lg font-extrabold">${data.author.name}</h4>
        <p>${data.author.designation ? data.author.designation : "Unknown"}</p>
      </span>
    </div>
    
    </div>
    `;
    latestContainer.appendChild(div);
  }
}

// search forum here
function searchForum() {
  const searchEl = document.getElementById("search-file");
  const search = searchEl.value;
  const searchText = search.trim().toLowerCase();

  if (searchText) {
    allFormContainer.innerHTML = "";
    lodderEl.classList.remove("hidden");
    setTimeout(() => {
      searchdata(searchText, allData);
    }, 2000);
  }
}

findForumData("posts", allData);
findForumData("latest-posts", latestData);
