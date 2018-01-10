//normal
var normal_img = "https://images.pexels.com/photos/776169/pexels-photo-776169.jpeg?h=350&auto=compress&cs=tinysrgb" ;
//vertical
var vertical_img = "https://images.pexels.com/photos/783359/pexels-photo-783359.jpeg?h=350&auto=compress&cs=tinysrgb" ;
//horizontal
var horizontal_img = "https://images.pexels.com/photos/776526/pexels-photo-776526.jpeg?h=350&auto=compress&cs=tinysrgb" ;
//big
var big_img = "https://images.pexels.com/photos/785293/pexels-photo-785293.jpeg?h=350&auto=compress&cs=tinysrgb" ;

var allElements = document.getElementsByTagName('img');
var coll = Array.from(allElements)

//normal ,vertical,horizontal,big
function imagechange(el){
  if(!el.parentElement.getAttribute("class")){
    el.src = normal_img ;
  }else if(el.parentElement.getAttribute("class") ==='vertical'){
     el.src = vertical_img ;
  }else if(el.parentElement.getAttribute("class") ==='horizontal'){
     el.src = horizontal_img ;
  }else{
     el.src = big_img ;
  }
//   console.log(el.parentElement.getAttribute("class"));
}
coll.map(imagechange );