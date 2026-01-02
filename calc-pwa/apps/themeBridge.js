(function(){
  function apply(mode, value){
    if (mode === "system") {
      document.documentElement.removeAttribute("data-theme");
      return;
    }
    if (value === "light" || value === "dark") {
      document.documentElement.setAttribute("data-theme", value);
    }
  }

  window.addEventListener("message", function(ev){
    try{
      var data = ev.data || {};
      if (data && data.type === "theme") {
        apply(data.mode, data.value);
      }
    }catch(e){}
  });
})();
