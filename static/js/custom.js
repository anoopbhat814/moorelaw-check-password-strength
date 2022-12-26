function showMorreLaw(event){
             console.log(event.target.value);
             let guess =event.target.value;
             switch (guess) {
                 case "1_trillion":
                 document.getElementById("has_moore").classList.remove("hide_me");
                 document.getElementById("has_moore_right_tab").classList.remove("hide_me");
                 break;
                 case "12.5":
                 document.getElementById("has_moore").classList.remove("hide_me");
                 document.getElementById("has_moore_right_tab").classList.remove("hide_me");
                 break;
                 case "26_million":
                 document.getElementById("has_moore").classList.remove("hide_me");
                 document.getElementById("has_moore_right_tab").classList.remove("hide_me");
                 break;    
                 default:
                 document.getElementById("has_moore").classList.add("hide_me");    
                 document.getElementById("has_moore_right_tab").classList.add("hide_me");
             }
         }
         document.addEventListener("DOMContentLoaded", function(event) { 
         
             document.querySelectorAll("input[name='attacker_guess']").forEach((input) => {
                     input.addEventListener('change', showMorreLaw);
             });
         
});
         