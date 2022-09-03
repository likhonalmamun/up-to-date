
//  catagorie data loading starts here
fetch("https://openapi.programming-hero.com/api/news/categories")
  .then((res) => res.json())
  .then((data) => addToList(data.data.news_category))
  .catch((err) => console.log(err));
//  catagorie data loading ends here




// catagory listing starts here 
const addToList = (catagories) => {
  catagories.forEach((catagory) => {
    let li = document.createElement("li");
    li.classList.add("md:m-5");
    li.innerHTML = `
     <span onclick='loadPosts("${catagory.category_id}")' class='text-lime-700 hover:text-red-400'>${catagory.category_name}</span>
    `;
    document.getElementById("list").appendChild(li);
  });
};
//catagory listing ends here



// post data loading starts here 
const loadPosts = (id) => {
  // spinner getting visible here 
  document.getElementById("spinner").classList.remove("hidden");
  document.getElementById("post-container").classList.add("hidden");
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => showPosts(data.data))
    .catch((err) => console.log(err));
};
// post data loading ends here 




// adding post to page starts here 
const showPosts = (posts) => {
  posts.sort((a, b) => {
    if (a.total_view == null) {
      a.total_view = 00;
    }
    return parseInt(b.total_view) - parseInt(a.total_view);
  });
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
    console.log(post.total_view);
    let detail = post.details;
    if (detail.length > 250) {
      detail = detail.slice(0, 250) + "...";
    }
    let postBox = document.createElement("div");
    postBox.innerHTML = `
        <div class="flex p-0 sm:p-4 w-100 m-auto justify-center my-4 ">
          <div class="flex p-0 sm:p-4  w-[1500px] flex-col  lg:flex-row  w-100 rounded-lg bg-white shadow-lg">
          <img class=" w-[90%] block lg:w-[350px] m-auto  h-100 md:h-auto object-cover  rounded-t-lg md:rounded-none md:rounded-l-lg" src="${
            post.image_url
          }" alt="" />
          <div class=" p-2 sm:p-4 md:p-6 flex text-wrap md:w-full flex-col justify-start">
            <h5 class="text-lime-700 text-lg md:text-2xl font-bold mb-2">${
              post.title
            }</h5>
            <p class="text-gray-700 text-[10px] md:text-base mb-4">
            ${detail}
            </p>
            <p class="text-gray-600 md:text-xs text-[11px] font-bold">${
              post.author.published_date
                ? post.author.published_date
                : "unknown date"
            }</p>
            <div class="flex flex-wrap justify-center md:justify-between p-3 items-center">
            <div class="flex mt-3 items-center">
            <img  src='${
              post.author.img
            }' class='w-[30px] md:w-[40px] xl:w-[50px] rounded-[100px]' />
            <p class='text-lime-700 ml-2 font-bold uppercase mx-3 my-2 text-sm md:text-xl'>${
              post.author.name ? post.author.name : "unknown user"
            }</p>
        </div>
        <div class="flex items-center font-bold text-sm lg:text-xl mx-3 my-2 sm:text:xl text-red-500">Views : ${
          post.total_view ? post.total_view : "Calculating views"
        }</div>
        <div class="flex items-center font-bold text-sm lg:text-xl mx-3 my-2 sm:text:xl text-red-500"><span class='text-lime-700'>Ratings : </span> ${
          post.rating.number
        }</div>
        <button onclick= 'postDetail("${
          post._id
        }")' data-bs-toggle="modal" data-bs-target="#exampleModalCenteredScrollable" class=" px-2 sm:px-4  md:px-6 
          py-1 md:py-2 border-2 border-green-500
         text-green-900 font-semibold text-xs sm:text-sm md:text-sm lg:text-sm mx-3 my-2 uppercase rounded hover:bg-black hover:bg-opacity-5">See Details</button>
        </div>
      </div>
        </div>
      </div>
  `;
    document.getElementById("post-container").appendChild(postBox);
  });

  // spinner getting invisible here 
  document.getElementById("spinner").classList.add("hidden");
  document.getElementById("post-container").classList.remove("hidden");
};
// adding post to page ends here 





// post detail  loading starts here 
const postDetail = async (id) => {
  try {
    let res = await fetch(
      `https://openapi.programming-hero.com/api/news/${id}`
    );
    let data = await res.json();
    modal(data.data[0]);
  } catch (err) {
    console.log(err);
  }
};
// post detail loading ends here 




// showing details in modal starts here 
const modal = (post) => {
  document.getElementById(
    "exampleModalCenteredScrollableLabel"
  ).innerText = `${post.title}`;
  document.getElementById("modal-body").innerHTML = `
    <div class="p-1 md:p-3">
       <img class='w-full m-auto block mb-5 ' src="${post.image_url}" alt="">
       <p class="mb-4 text-[12px] md:text-base">${post.details}</p>
       <div class='border p-5'> <p class='text-center font-bold text-xl'>Post Author</p>
       <div class="flex justify-center mt-3 items-center">
      <img  src='${
        post.author.img
      }' class='w-[30px] md:w-[40px] xl:w-[50px] rounded-[100px]' />
      <p class='text-lime-700 ml-2 font-bold uppercase text-xl'>${
        post.author.name ? post.author.name : "unknown"
      }</p>
      </div>
    </div>

    </div>
    `;
};
// showing details to modal ends here 
