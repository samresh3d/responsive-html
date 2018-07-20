import '../scss/main.scss';
import './modules/citi_buttons';


const delay = ms => new Promise(_ => setTimeout(_, ms));
// On Scroll event 
window.onscroll = () => {
//sticky nav 
    let stickyElement = document.querySelector(".sticky-bar");
    if(stickyElement){
        let className="sticky-visible"; 
        if (window.pageYOffset > getOffsetTop(document.querySelector("#stickyTrigger")) + document.querySelector("#stickyTrigger").offsetHeight) { 
            if (!stickyElement.classList.contains(className)){
                stickyElement.classList.add(className);
                stickyElement.setAttribute("aria-hidden",false);
            }
        } else {
      		if (stickyElement.classList.contains(className)){
                stickyElement.classList.remove(className);
                stickyElement.setAttribute("aria-hidden",true);
            }
        }
    }
//sticky nav end
// Lazy load if section doesn't exist
	let backToTop = document.querySelector(".back-to-top");
	if (!backToTop){
		 require(['../partials/footer.hbs'], template => {
			        document.getElementById("extra").innerHTML = template();	
			        import('./modules/modal_speedbump').then((dialog)=>{
					       dialog.dialogInit();
					});			 				
		});
	}
	//back to top
	if(backToTop){            
	        if(window.pageYOffset > document.querySelector("footer").offsetTop - window.innerHeight + 75){
	        	delay(40).then(() => backToTop.style.display = "block");
	            requestAnimationFrame(() => backToTop.style.opacity = 1);
	        }
	        else {            
	           requestAnimationFrame(() => backToTop.style.opacity = 0);
	           delay(50).then(() => backToTop.style.display = "none"); // ask for animation cases
	           delay(60).then(() => document.getElementById("top_of_page").focus());

	        }
	  
	    backToTop.addEventListener("click", function(e){
	        e.preventDefault();     
	        window.scroll({
			  top: 0,
			  behavior: "smooth"
			});
	    });   
	}
	//back to top end

}
//end of on scroll event


// Importing Articles json var
import { articles } from "./data/data";
var allArticles = "";
//Iterating on each element of the variable articles
	for (let element in articles) {
		if (articles.hasOwnProperty(element)) {

			if (articles[element]["articleType"] == "bigArticle"){
				allArticles +="<article>" + articles[element]["h1"] + "</article>";
			}
		
		}
	}
// adding articles to html section
 document.querySelector(".articles").innerHTML = allArticles;



//sticky nav function getOffsetTop
let getOffsetTop = elem => {
    let offsetTop = 0;
    do { if (!isNaN(elem.offsetTop)) { offsetTop += elem.offsetTop; }
    } while (elem = elem.offsetParent);
    return offsetTop;
}
//end sticky nav function getOffsetTop 

