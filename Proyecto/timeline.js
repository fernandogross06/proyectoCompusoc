const accessToken = '7iuykejvnJFo83tEDn2EtS7ToUehgJpQaJhaJmHWvh0'; // Replace with your actual token
const mastodonInstance = 'https://mastodon.social'; // Replace with your Mastodon instance URL
var comentar = false;
const apiUrl = `${mastodonInstance}/api/v1/timelines/public`;

async function fetchHomeTimeline() {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch timeline');
    }

    const data = await response.json();
    console.log(data)
    displayTimeline(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

function displayTimeline(posts) {
  const timelineDiv = document.getElementById('timeline');
  timelineDiv.innerHTML = ''; // Clear any existing posts

  posts.forEach(post => {
      // Create the main elements for the post
      var a = document.createElement("a");
      var div = document.createElement("div");
      var div2 = document.createElement("div");
      var div3 = document.createElement("div");
      var div4 = document.createElement("div");
      var div5 = document.createElement("div");
      var label = document.createElement("label");
      var label2 = document.createElement("label");
      var span = document.createElement("span");

      // Assign classes to elements
      a.classList = "linksInternos";
      a.href = "profile.html";
      div.classList = "post";
      
      // Update the "circulo" div to accept the profile image
      div2.classList = "circulo";
      
      // Check if the user has a profile avatar, and display it
      const profileImage = document.createElement('img');
      profileImage.src = post.account.avatar || 'default-avatar.png'; // Use a default image if no avatar
      profileImage.alt = post.account.display_name + "'s avatar";
      profileImage.classList.add('profile-image');  // Add a class to style the avatar image

      div2.appendChild(profileImage); // Append the profile image to the "circulo" div

      // Append the user profile icon (if any)
      div.appendChild(div2);

      div3.classList = "post-content";
      div4.classList = "header";
      label.classList = "textos desc name";
      label.textContent = post.account.display_name || post.account.username;

      div4.appendChild(label);

      label2.classList = "textos desc time";
      label2.textContent = calculateTime(post.created_at);

      div4.appendChild(label2);

      div3.appendChild(div4);

      div5.classList = "postText";
      span.classList = "textos desc postBody";

      // Format and display the post text (converts any HTML to plain text)
      formatText(div5, convertToPlainText(post.content));

      div3.appendChild(div5);

      // Handle images (if any)
      if (post.media_attachments && post.media_attachments.length > 0) {
          post.media_attachments.forEach(media => {
              if (media.type === 'image') {
                  // Create an image element
                  const img = document.createElement('img');
                  img.classList = "post-image";  // Add your CSS class for images
                  img.src = media.url;  // Use the original image URL
                  img.alt = media.description || "Image";  // Add an alt text for the image
                  
                  // Append the image to the post
                  div3.appendChild(img);
              }
          });
      }

      // Append the post content to the timeline
      div.appendChild(div3);
      a.appendChild(div);
      document.getElementById("posts").appendChild(a);
  });
}

async function fetchUserToots() {
 // const accessToken = 'YOUR_ACCESS_TOKEN';  // Replace with your actual Mastodon OAuth access token
  const apiUrl = 'https://mastodon.social/api/v1/accounts/verify_credentials';  // This returns info about the authenticated user

  try {
    // First, verify the authenticated user's credentials to get the user ID
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const user = await response.json();
    const userId = user.id;  // Get the user ID of the authenticated user

    // Now fetch the toots (statuses) for this user
    const tootApiUrl = `https://mastodon.social/api/v1/accounts/${userId}/statuses`;
    const tootResponse = await fetch(tootApiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });

    if (!tootResponse.ok) {
      throw new Error('Failed to fetch toots');
    }

    const posts = await tootResponse.json();
   document.getElementById("name").textContent = user.username
    document.getElementById("joined").textContent ="Joined: " +  formatDate(user.created_at)
    console.log(user);
    displayTimeline(posts);  // Pass the posts to the displayTimeline function
  } catch (error) {
    console.error('Error fetching toots:', error);
  }
}



function convertToPlainText(html) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || doc.body.innerText;
  }
// Call the function to fetch and display the timeline



async function postToot(content) {
  const apiUrl = `${mastodonInstance}/api/v1/statuses`;

  const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          status: content,  // Text content of the toot
          visibility: 'public' // Optional: 'public', 'unlisted', 'private', 'direct'
      })
  });

  if (!response.ok) {
      console.error('Failed to post toot:', response.status, response.statusText);
      return;
  }

  const data = await response.json();
  console.log('Toot posted successfully:', data);
}


function createCommentBox(){
  
  var textarea = document.createElement("textarea")
  var button = document.createElement("button")

  textarea.placeholder = "Write your comment..."
  textarea.id = "commentInput"

  button.id = "publishBtn"
  button.classList = "button boton buttonComment"
  button.textContent = "Publish"
  button.onclick = function(){hideCommentBox()};
  
  if(comentar == false){
      document.getElementById("comment-box").appendChild(textarea)
      document.getElementById("comment-box").appendChild(button)
      comentar = true;
  }
}

function hideCommentBox(){
  addComment();
  document.getElementById("commentInput").remove()
  document.getElementById("publishBtn").remove()
  comentar = false;
}

function formatDate(dateString) {
  // Create a new Date object from the ISO 8601 string
  const date = new Date(dateString);

  // Get the day, month, and year
  const day = String(date.getUTCDate()).padStart(2, '0'); // Ensure 2 digits (e.g., "06")
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-indexed, so add 1
  const year = date.getFullYear();

  // Return the formatted date in MM/DD/YYYY format
  return `${month}/${day}/${year}`;
}

async function getUserInfo() {
  const apiUrl = `${mastodonInstance}/api/v1/accounts/verify_credentials`;

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,  // Use the access token to authenticate
    },
  });

  if (!response.ok) {
    console.error('Error fetching user information:', response.status, response.statusText);
    return;
  }

  const data = await response.json();
  return data;  // This will include user info like display_name, username, avatar, etc.
}

async function addComment() {
  let comentarioCorrecto = true;

  const commentInput = document.getElementById("commentInput").value;
  
  if (commentInput === "") {
    comentarioCorrecto = false;
    return;  // Do not post if the comment is empty
  }

  // Fetch user info for display name, avatar, etc.
  const userInfo = await getUserInfo();
  
  const a = document.createElement("a");
  const div = document.createElement("div");
  const div2 = document.createElement("div");
  const div3 = document.createElement("div");
  const div4 = document.createElement("div");
  const div5 = document.createElement("div");
  const label = document.createElement("label");
  const label2 = document.createElement("label");
  const span = document.createElement("span");

  a.classList = "linksInternos";
  a.href = "profile.html";

  div.classList = "post";
  div2.classList = "circulo";

  div.appendChild(div2);

  div3.classList = "post-content";
  div4.classList = "header";
  label.classList = "textos desc name";
  label.textContent = userInfo.display_name || userInfo.username; // User's display name or username

  div4.appendChild(label);

  label2.classList = "textos desc time";
  label2.textContent = "Just now"; // Replace with actual time

  div4.appendChild(label2);

  div3.appendChild(div4);

  div5.classList = "postText";
  div5.id = "div5";
  span.classList = "textos desc postBody";

  // Format and add the comment content
  formatText(div5, commentInput);

  // Post the toot and handle success
  postToot(commentInput);
  
  // Update the UI after posting
  
    div3.appendChild(div5);
    div.appendChild(div3);
    a.appendChild(div);
    document.getElementById("posts").appendChild(a);
  
}


  // Toggle visibility of followed communities and user posts
  function toggleView(view) {
    const followedComms = document.getElementById('followedComms');
    const userPosts = document.getElementById('posts');
    
    if (view === 'communities') {
        followedComms.style.display = 'block';
        userPosts.style.display = 'none';
        document.getElementById('showCommunities').classList.add('btn-primary');
        document.getElementById('showPosts').classList.remove('btn-primary');
        document.getElementById('showPosts').classList.add('btn-secondary');
    } else if (view === 'posts') {
     
        followedComms.style.display = 'none';
        userPosts.style.display = 'block';
        document.getElementById('showPosts').classList.add('btn-primary');
        document.getElementById('showCommunities').classList.remove('btn-primary');
        document.getElementById('showCommunities').classList.add('btn-secondary');
    }
}





 

