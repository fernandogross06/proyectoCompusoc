var comentar = false;

var community = [{name:"Community 1", description:"Descripcion generica"}, {name:"Community 2", description:"Descripcion generica 2"}]

var posts = [{name:"PedroPlanista", time: "Mon Oct 28 2024 14:59:49 GMT-0600 (hora estándar central)", text: "That’s awesome!! @nosphere"},
            {name: "Mike W", time: "Mon Oct 28 2024 14:59:49 GMT-0600 (hora estándar central)", text: "That’s the reality!!! #dontgetfooled #earthnotSphere #govermentWrong"}]

var argumentsList = {name: "Globe", arguments:[{author: "PedroPlanista", text:"Text argument 1", source:"https://", img:"foto-importante.png"}, 
                                           {author: "Mike W",text:"Text argument 2", source: "", img:"foto-importante.png"}]}

var myCommunity = {name:"Community 2", description:"Descripcion generica 2", followers: 4}

var profile = {name: "PedroPlanista", joined: "06/12/2024", followed: [{name:"Community 1", description:"Descripcion generica"}, {name:"Community 2", description:"Descripcion generica 2"}]}

var notifications = [{name: "PedroPlanista", action: "Followed your Community"},{name: "PedroPlanista", action: "Followed your Community"},{name: "PedroPlanista", action: "Followed your Community"}]

function loadTimeline(){
    fetchHomeTimeline();
    loadNotifications();
    loadCommunities();
}


function loadProfile(){
    fetchUserToots();
    loadCommunities();

    loadNotifications()
    toggleView('communities');

    

    for(var i = 0; i<profile["followed"].length; i++){
        var a = document.createElement("a")
        var div = document.createElement("div")
        var div2 = document.createElement("div")
        var div3 = document.createElement("div")
        var label = document.createElement("label")
        var label2 = document.createElement("label")

        a.href = "community.html"
        a.id = i
        a.onclick = function(){
            localStorage.setItem("community" , this.id)
        }
        div.classList = "community"
        label.classList = "textos desc"
        label.textContent = profile["followed"][i]["name"]

        div2.appendChild(label)

        div.appendChild(div2)

        label2.classList = "textos desc postBody"
        label2.textContent = "Description: " + profile["followed"][i]["description"]

        div3.appendChild(label2)

        div.appendChild(div3)
        a.appendChild(div)

        document.getElementById("followedComms").appendChild(a)

    }


}

function loadNotifications(){
    for(var i = 0; i<notifications.length; i++){
        var p = document.createElement("p")
        var p2 = document.createElement("p")
        p.classList = "textos notis"
        p.textContent = notifications[i]["name"]

        p2.classList = "textos postBody descNoti"
        p2.textContent = notifications[i]["action"]

        document.getElementById("notificationBox").appendChild(p)
        document.getElementById("notificationBox").appendChild(p2)
    }
}

function loadCommunity(){
    loadNotifications()
    loadPosts()
    loadArguments()
    var cur = localStorage.getItem("community")
    document.getElementById("commName").textContent = community[cur]["name"]
    document.getElementById("commDesc").textContent = "Description: " + community[cur]["description"]
}

function loadMyCommunity(){
    loadNotifications()
    loadPosts()
    loadArguments()

    document.getElementById("name").textContent = myCommunity["name"]
    document.getElementById("commDesc").textContent = "Description: " + myCommunity["description"]
    document.getElementById("myFollowers").textContent = "Followers: " + myCommunity["followers"]
}



function loadArguments(){
    document.getElementById("nameArguments").textContent = argumentsList["name"] + " Arguments"
    for(var i = 0; i<argumentsList["arguments"].length; i++){
        var a = document.createElement("a")
        var div = document.createElement("div")
        var div2 = document.createElement("div")
        var div3 = document.createElement("div")
        var div4 = document.createElement("div")
        var label = document.createElement("label")
        var label2 = document.createElement("label")
        var span = document.createElement("span")
        var a2 = document.createElement("a")

        a.href = "argument.html"
        a.id = i;
        a.onclick = function(){
            localStorage.setItem("argument", this.id)
            loadArgument(1)
        }
        div.classList = "argumento"
        label.classList = "textos desc"
        label.textContent =  "Argument " + (i+1)

        div2.appendChild(label)

        div.appendChild(div2)

        label2.classList = "textos desc postBody"
        label2.textContent =  argumentsList["arguments"][i]["text"]

        div3.appendChild(label2)

        div.appendChild(div3)

        span.classList = "textos desc postBody"
        span.textContent = "Source: "

        var source = argumentsList["arguments"][i]["source"]
        a2.href = source
        a2.textContent = source

        if(source == ""){
            div.classList = "argumento noSource"
        }
            

        div4.appendChild(span)
        div4.appendChild(a2)
        div.appendChild(div4)
        a.appendChild(div)

        document.getElementById("argsList").appendChild(a)

    }
}

function loadPosts(){
    for(var i = 0; i<posts.length; i++){
     
    var a = document.createElement("a")
    var a2 = document.createElement("a")
    var div = document.createElement("div")
    var div2 = document.createElement("div")
    var div3 = document.createElement("div")
    var div4 = document.createElement("div")
    var div5 = document.createElement("div")
    var label = document.createElement("label")
    var label2 = document.createElement("label")
    var span = document.createElement("span")
    var span2 = document.createElement("span")


    a.classList = "linksInternos"
    a.href = "profile.html"

    div.classList = "post"
    div2.classList = "circulo"

    div.appendChild(div2)

    div3.classList = "post-content"
    div4.classList = "header"
    label.classList = "textos desc name"
    label.textContent = posts[i]["name"]


    div4.appendChild(label)

    label2.classList = "textos desc time"
    label2.textContent = calculateTime(i,1) 

    div4.appendChild(label2)

    div3.appendChild(div4)

    div5.classList = "postText"
    div5.id = "div5"
    span.classList = "textos desc postBody"
    
  
    formatText(div5, posts[i]["text"])

    div3.appendChild(div5)

    div.appendChild(div3)
    a.appendChild(div)
    
  
        document.getElementById("posts").appendChild(a)
    }
}

function calculateTime(i, j){
    if(j == 1){
        var previousTime = new Date(posts[i]["time"])
    }
        
    else{
        var previousTime = new Date(i)
   
    }
        
    var now = new Date();
   
    var timeDiff = now - previousTime; //in ms
    
    // strip the ms
    timeDiff /= 1000;

    if (timeDiff < 60 && timeDiff <= 0) {
        return "Just Now";
       
    } else if(timeDiff < 60 && timeDiff > 0){
        return Math.floor(timeDiff) + " seconds ago"; // Less than a minute
    }
        else if (timeDiff < 3600) {
        return Math.floor(timeDiff / 60) + " minutes ago"; // Less than an hour
    } else if (timeDiff < 86400) {
        return Math.floor(timeDiff / 3600) + " hours ago"; // Less than a day
    } else if (timeDiff < 604800) {
        return Math.floor(timeDiff / 86400) + " days ago"; // Less than a week
    } else if (timeDiff < 2628000) {
        return Math.floor(timeDiff / 604800) + " weeks ago"; // Less than a month
    } else if (timeDiff < 31536000) {
        return Math.floor(timeDiff / 2628000) + " months ago"; // Less than a year
    } else {
        return Math.floor(timeDiff / 31536000) + " years ago"; // 1 year or more
    }
}

function loadCommunities(){
    for(var i = 0; i<community.length; i++){
        var a = document.createElement("a")
        var div = document.createElement("div")
        var div2 = document.createElement("div")
        var div3 = document.createElement("div")
        var label = document.createElement("label")
        var label2 = document.createElement("label")

        a.href = "community.html"
        a.id = i
        a.onclick = function(){
            localStorage.setItem("community", this.id)
        }
        div.classList = "comun"
        label.classList = "textos desc"
        label.textContent =  community[i]["name"]

        div2.appendChild(label)

        div.appendChild(div2)

        label2.classList = "textos desc postBody"
        label2.textContent = "Description: " + community[i]["description"]

        div3.appendChild(label2)

        div.appendChild(div3)
        a.appendChild(div)

        document.getElementById("argsList").appendChild(a)

    }
}

function notis(){
   
    const notificationBox = document.getElementById('notificationBox');
    notificationBox.classList.toggle('hidden');
    event.stopPropagation(); 
}

    
    // Close the notification box if clicked outside
    document.addEventListener('click', function(event) {
        const notificationBox = document.getElementById('notificationBox');
        const button = document.getElementById('notifyButton');
        if (!notificationBox.contains(event.target) && !button.contains(event.target)) {
            notificationBox.classList.add('hidden');
        }
    });

function verContra(){
  
        const passwordInput = document.getElementById('password');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        document.getElementById('togglePassword').textContent = type === 'password' ? 'Ver' : 'Ocultar'; // Cambia el icono
    
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

function followCommunity(){
    if(document.getElementById("communityFollow").textContent == "Follow"){
        document.getElementById("communityFollow").textContent = "Unfollow"
    }
        
    else{
        document.getElementById("communityFollow").textContent = "Follow"
    }
        
}


function openModal(){
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function addComment(){
    var comentarioCorrecto = true;
    var a = document.createElement("a")
    var a2 = document.createElement("a")
    var div = document.createElement("div")
    var div2 = document.createElement("div")
    var div3 = document.createElement("div")
    var div4 = document.createElement("div")
    var div5 = document.createElement("div")
    var label = document.createElement("label")
    var label2 = document.createElement("label")
    var span = document.createElement("span")
    var span2 = document.createElement("span")


    a.classList = "linksInternos"
    a.href = "profile.html"

    div.classList = "post"
    div2.classList = "circulo"

    div.appendChild(div2)

    div3.classList = "post-content"
    div4.classList = "header"
    label.classList = "textos desc name"
    label.textContent = "PedroPlanista" //cambiar por nombre del usuario actual


    div4.appendChild(label)

    label2.classList = "textos desc time"
    label2.textContent = "1 seconds ago"  //cambiar hora cuando se actualice, por ahora esta bien que sea un segundo 

    div4.appendChild(label2)

    div3.appendChild(div4)

    div5.classList = "postText"
    div5.id = "div5"
    span.classList = "textos desc postBody"
    
    if(document.getElementById("commentInput").value == ""){
        comentarioCorrecto = false;
    }
    formatText(div5, document.getElementById("commentInput").value)

    div3.appendChild(div5)

    div.appendChild(div3)
    a.appendChild(div)
    
    if(comentarioCorrecto)
        document.getElementById("posts").appendChild(a)


}


function formatText(div, text) {
    // Updated regex to support hashtags with non-ASCII characters, colons, and special characters.
    const regex = /(@[\w-]+|#[\wáéíóúÁÉÍÓÚñÑ:;,.&!?%$#()+=]*[A-Za-z0-9][\wáéíóúÁÉÍÓÚñÑ:;,.&!?%$#()+=]*|https?:\/\/[^\s]+|www\.[^\s]+|[^\s#]+|\s+)/g;
    const parts = text.split(regex).filter(part => part !== '');

    parts.forEach(part => {
        let element;

        // If the part starts with "@", it's a mention (including those with hyphens)
        if (part.startsWith('@')) {
            element = document.createElement('a');
            element.classList = "mention textos";
            element.href = "#"; // Placeholder link (you could adjust to real links if needed)
            element.textContent = part;
        } 
        // If the part starts with "#", it's a hashtag
        else if (part.startsWith('#')) {
            // Ensure it's a valid hashtag and not something like "#hello#world"
            const hashtagPattern = /^#[\wáéíóúÁÉÍÓÚñÑ:;,.&!?%$#()+=]*[A-Za-z0-9][\wáéíóúÁÉÍÓÚñÑ:;,.&!?%$#()+=]*$/;
            if (hashtagPattern.test(part)) {
                element = document.createElement('span');
                element.classList = "hashtag textos";
                element.textContent = part;
            }
        } 
        // If the part looks like a valid URL (http://, https://, or www.)
        else if (part.match(/(?:https?:\/\/|www\.)[^\s]+/)) {
            const urlPattern = /(?:https?:\/\/|www\.)[^\s]+/;
            const matchedUrl = part.match(urlPattern);
            if (matchedUrl) {
                // Create a link element
                element = document.createElement('a');
                element.classList = "link textos";
                element.href = matchedUrl[0]; 
                element.textContent = matchedUrl[0]; // Display the full URL as clickable text
            }
        } 
        // Otherwise, it's regular text
        else {
            element = document.createElement('span');
            element.classList = "textos descComentario postBody";
            element.textContent = part;
        }

        // Only append the element if it's not empty
        if (element) {
            div.appendChild(element);
        }
    });
}



function crearArgumento(){
    var a = document.createElement("a")
    var a2 = document.createElement("a")
    var div = document.createElement("div")
    var div2 = document.createElement("div")
    var div3 = document.createElement("div")
    var div4 = document.createElement("div")
    var label = document.createElement("label")
    var label2 = document.createElement("label")
    var span = document.createElement("span")
    var completo = true;
    var sourceLink = true;
    a.href = "argument.html"

    div.classList = "argumento"
    label.classList = "textos desc"
    label.textContent = "Argumento #"

    div2.appendChild(label)

    div.appendChild(div2)

    label2.classList = "textos desc postBody"
    var texto = document.getElementById("textInput").value
    if(texto == "")
        completo = false
    label2.textContent = texto

    div3.appendChild(label2)

    div.appendChild(div3)
    span.classList = "textos desc postBody"
    span.textContent = "Source: "

    var source = document.getElementById("linkInput").value
  
    if(source == "")
        sourceLink = false
    a2.href = source
    a2.text = source

    div4.appendChild(span)
    div4.appendChild(a2)

    div.appendChild(div4)

    if(!sourceLink){
        div.classList = "argumento noSource"
    }
        
    a.appendChild(div)
    if(completo)
        document.getElementById("args").appendChild(a)

    closeModal();

    var img = document.getElementById("imageInput")
    img = "foto-importante.png" // cambiar si es que se quieren manejar imagenes

    
    
    var argJson = {text:texto, source:source, img:img, author:"PedroPlanista"}
    localStorage.setItem("argNuevo",JSON.stringify(argJson))



}



function loadArgument(type){
    loadCommunities();
    loadNotifications()
  if(type == 0){
    var argument = argumentsList["arguments"][localStorage.getItem("argument")]
 

    
    document.getElementById("argNum").textContent = "Argument #" + (localStorage.getItem("argument")*1 + 1)

    document.getElementById("author").textContent = "Author: " +  argument["author"]
    document.getElementById("img").src = argument["img"]

    var div = document.createElement("div")
    var span = document.createElement("span")
    div.classList = "post argument"
    span.classList = "textos desc postBody"
    span.textContent = argument["text"]

    div.appendChild(span)


    var label = document.createElement("label")
    label.classList = "textos titulos arguments"
    label.textContent = "Sources"

    var div2 = document.createElement("div")
    var span2 = document.createElement("span")
    var a = document.createElement("a")

    span2.classList = "textos desc postBody"
    span2.textContent = "Source: "
    div2.appendChild(span2)
    a.href = argument["source"]
    a.textContent = argument["source"]

    div2.appendChild(a)


    document.getElementById("argBody").appendChild(div)
    document.getElementById("argBody").appendChild(label)
    document.getElementById("argBody").appendChild(div2)
  }else{
    var argument = JSON.parse(localStorage.getItem("argNuevo"))
 

    


    document.getElementById("author").textContent = "Author: " +  argument["author"]
    document.getElementById("img").src = argument["img"]

    var div = document.createElement("div")
    var span = document.createElement("span")
    div.classList = "post argument"
    span.classList = "textos desc postBody"
    span.textContent = argument["text"]

    div.appendChild(span)


    var label = document.createElement("label")
    label.classList = "textos titulos arguments"
    label.textContent = "Sources"

    var div2 = document.createElement("div")
    var span2 = document.createElement("span")
    var a = document.createElement("a")

    span2.classList = "textos desc postBody"
    span2.textContent = "Source: "
    div2.appendChild(span2)
    a.href = argument["source"]
    a.textContent = argument["source"]

    div2.appendChild(a)


    document.getElementById("argBody").appendChild(div)
    document.getElementById("argBody").appendChild(label)
    document.getElementById("argBody").appendChild(div2)
  }
    

   
}


function changeName(){
    var textarea = document.createElement("textarea")
    var button = document.createElement("button")

    textarea.placeholder = "PedroPlanista" //cambiar por nombre actual
    textarea.id = "commentInput"
    textarea.classList = "cajaNombre"
    textarea.maxLength = 25

    button.id = "publishBtn"
    button.classList = "button boton buttonComment"
    button.textContent = "Change"
    button.onclick = function(){document.getElementById("name").textContent = textarea.value; hideNameBox()};
    
    if(comentar == false){
        document.getElementById("cajaNombre").appendChild(textarea)
        document.getElementById("cajaNombre").appendChild(button)
        comentar = true;
    }
}

function changeNameCom(){
    var textarea = document.createElement("textarea")
    var button = document.createElement("button")

    textarea.placeholder = "Flat Earth Community" //cambiar por nombre actual
    textarea.id = "commentInput"
    textarea.classList = "cajaNombre"
    textarea.maxLength = 50

    button.id = "publishBtn"
    button.classList = "button boton buttonComment"
    button.textContent = "Change"
    button.onclick = function(){document.getElementById("name").textContent = textarea.value; hideNameBox()};
    
    if(comentar == false){
        document.getElementById("cajaNombre").appendChild(textarea)
        document.getElementById("cajaNombre").appendChild(button)
        comentar = true;
    }
}


function hideNameBox(){
    
    document.getElementById("commentInput").remove()
    document.getElementById("publishBtn").remove()
    comentar = false;
}

