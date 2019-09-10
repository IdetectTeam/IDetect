(function() {
    // Variables
    var panel     = document.getElementById("js-panel");
    var btns      = document.querySelectorAll(".flap__btn");
    var btnReplay = document.getElementById("js-replay");
    
    // On load, init panel
    var init = function() {
      panel.classList.add("is--open");
      
      // If btns are clicked, hide panel
      // Show replay button    
      for (var i=0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
          hidePanel();
        });
      }
      
      function hidePanel() {
        panel.classList.remove("is--open");
        btnReplay.classList.add("is--active");
      }
      
      // When replay button is clicked,
      // reset the stage.
      btnReplay.addEventListener("click", function() {
        resetStage();
      });
    }
    
    // Hide the button and re-call init
    function resetStage() {
      btnReplay.classList.remove("is--active");
      init();
    }
    
    // On load, call init function
    window.onload = function() {
      init();
    }
  })();