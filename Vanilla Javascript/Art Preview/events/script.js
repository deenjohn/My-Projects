document.querySelector(".grid").addEventListener(
  "mouseover",
  function(e) {
    if (e.target.tagName === "IMG") {
      //create element DIV
      var myElement = document.createElement("div");
      myElement.className = "preview";
      e.target.parentNode.appendChild(myElement); //Attach div to <li></li>

      //create element IMG
      var myImg = document.createElement("img");
      var imgLoc = e.target.src;
      // console.log(imgLoc);
      //myImg.src = imgLoc;
      myImg.src = imgLoc.substr(0, imgLoc.length - 7) + ".jpg";
      myElement.appendChild(myImg);

      //mouseout
      e.target.addEventListener(
        "mouseout",
        function handler(d) {
          console.log(d.target.parentNode);
          var myNode = d.target.parentNode.querySelector("div.preview");
          console.log(myNode);
          myNode.parentNode.removeChild(myNode);
          e.target.removeEventListener("mouseout", handler, false);
        },
        false
      );
    } // check to see that I clicked on IMG only
  },
  false
); // click event
