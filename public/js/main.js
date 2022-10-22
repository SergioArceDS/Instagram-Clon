document.addEventListener("DOMContentLoaded", () => {
    fetchPosts();
    const fotos = document.querySelectorAll(".rounded-circle")
    console.log(fotos)
});

const fetchPosts = async() => {
    try {
        const res = await fetch("/getposts");
        const data = await res.json();

        paintPosts(data);
    } catch (error) {
        console.log(error);
    }
}

const verifyLike = (likes, user_id) => {
    let ids = [];
    likes.forEach(like => {
        ids.push(like['user_id']);
    });

    if(ids.includes(parseInt(user_id))){
        return "❤";
    }else{
        return "🤍";
    } 
}

const paintPosts = (data) => {
    const postsContainer = document.getElementById("posts-container");
    const templatePost = document.getElementById("template-post").content;
    const fragment = document.createDocumentFragment();
    console.log(data)

    data.forEach((post) => {
        const clone = templatePost.cloneNode(true);
        clone.getElementById("user-profile").setAttribute("src", "http://localhost:5000/img/photos/" + post['user_info']['profile']); 
        clone.querySelector("a").setAttribute("href", "/profile/" + post['user_info']['user_id']);
        clone.querySelector("a").textContent = post['user_info']['username'];
        clone.querySelector(".post-img").setAttribute("src", "http://localhost:5000/img/posts/" + post['media']);
        clone.getElementById("input_post-id").setAttribute("value", post['post_id']);
        let user_id = clone.querySelector(".like-user-id").value;
        clone.querySelector(".btn-like").textContent = verifyLike(post['likes'], user_id);
        clone.querySelector(".likes").textContent = post['likes'].length + " Me gusta";
        clone.querySelector("p").textContent = post['title'];
    
        fragment.appendChild(clone);
    });

    postsContainer.appendChild(fragment);
}