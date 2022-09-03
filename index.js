fetch("https://openapi.programming-hero.com/api/news/categories")
  .then((res) => res.json())
  .then((data) => addToList(data.data.news_category));

const addToList = (catagories) => {
  catagories.forEach((catagory) => {
    let li = document.createElement("li");
    li.innerHTML = `
     <span onclick='loadPosts("${catagory.category_id}")' class='text-lime-700 hover:text-red-400'>${catagory.category_name}</span>
    `;
    document.getElementById("list").appendChild(li);
  });
};
const loadPosts = (id) => {
  document.getElementById("spinner").classList.remove("hidden");
  document.getElementById("post-container").classList.add("hidden");
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => showPosts(data.data));
};

const showPosts = (posts) => {
  posts.sort((a, b) => {
    return parseInt(b.total_view) - parseInt(a.total_view);
  });
  console.log(posts);
  if (posts.length == 0) {
    document.getElementById("post-count").innerHTML = `
    <p> No Post Found In This Catagory !! </p> 
    <p> Change Catagory To View Posts </p> 
    `;
  } else {
    document.getElementById("post-count").innerHTML = `
  <p> ${posts.length} Posts Found In This Catagory !! </p> 
  `;
  }
  document.getElementById("post-container").innerHTML = "";
  posts.forEach((post) => {
    let detail = post.details;
    if (detail.length > 250) {
      detail = detail.slice(0, 250) + "...";
    }
    let postBox = document.createElement("div");
    postBox.innerHTML = `
  <div class="flex justify-center m-11">
  <div class="flex p-4  flex-col md:flex-row md:w-3/4 rounded-lg bg-white shadow-lg">
    <img class=" w-[350px] h-100 md:h-auto object-cover  rounded-t-lg md:rounded-none md:rounded-l-lg" src="${
      post.image_url
    }" alt="" />
    <div class="p-6 flex  md:w-full flex-col justify-start">
      <h5 class="text-lime-700 text-2xl font-bold mb-2">${post.title}</h5>
      <p class="text-gray-700 text-base mb-4">
      ${detail}
      </p>
      <p class="text-gray-600 text-xs font-bold">${
        post.author.published_date ? post.author.published_date : "unknown date"
      }</p>
      <div class="flex justify-between p-3 items-cent">
  <div class="flex mt-3 items-center">
  <img  src='${post.author.img}' class='w-[50px] rounded-[100px]' />
  <p class='text-lime-700 ml-2 font-bold uppercase text-xl'>${
    post.author.name ? post.author.name : "unknown user"
  }</p>
  </div>
  <div class="flex items-center font-bold text-lg text-red-500">Views : ${
    post.total_view ? post.total_view : "Calculating views"
  }</div>
  <div class="flex items-center font-bold text-lg text-red-500"><span class='text-lime-700'>Ratings : </span> ${
    post.rating.number
  }</div>
  <button onclick= 'postDetail("${
    post._id
  }")' data-bs-toggle="modal" data-bs-target="#exampleModalCenteredScrollable" class="inline-block px-6   py-0 border-2 border-green-500 text-green-900 font-semibold text-lg uppercase rounded hover:bg-black hover:bg-opacity-5">See Details</button>
</div>
    </div>
  </div>
</div>
  `;
    document.getElementById("post-container").appendChild(postBox);
  });
  document.getElementById("spinner").classList.add("hidden");
  document.getElementById("post-container").classList.remove("hidden");
};

const postDetail = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then((res) => res.json())
    .then((data) => modal(data.data[0]));
};

const modal = (post) => {
  console.log(post);
  document.getElementById(
    "exampleModalCenteredScrollableLabel"
  ).innerText = `${post.title}`;
  document.getElementById("modal-body").innerHTML = `
    <div class="p-4">
       <img class='w-[430px] mb-5 h-[350px]' src="${post.image_url}" alt="">
       <p class="mb-4">${post.details}</p>
       <div class='border p-5'> <p class='text-center font-bold text-2xl'>Post Author</p>
       <div class="flex justify-center mt-3 items-center">
  <img  src='${post.author.img}' class='w-[50px] rounded-[100px]' />
  <p class='text-lime-700 ml-2 font-bold uppercase text-xl'>${
    post.author.name ? post.author.name : "unknown"
  }</p>
  </div></div>

    </div>
    `;
};

function sortPostHigh(array) {}
