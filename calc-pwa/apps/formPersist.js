(function(){
  function fieldKey(prefix, field){
    var key = field.id || field.name;
    return key ? prefix + ":" + key : null;
  }

  function shouldPersist(field){
    if (!field || !field.type) return false;
    var key = field.id || field.name;
    if (!key) return false;
    var type = field.type.toLowerCase();
    return !(
      type === "submit" ||
      type === "button" ||
      type === "reset" ||
      type === "image" ||
      type === "file"
    );
  }

  function applyValue(field, value){
    if (field.type === "checkbox" || field.type === "radio") {
      field.checked = value === "true";
    } else {
      field.value = value;
    }
  }

  function storeValue(prefix, field){
    var key = fieldKey(prefix, field);
    if (!key) return;
    if (field.type === "checkbox" || field.type === "radio") {
      localStorage.setItem(key, field.checked ? "true" : "false");
    } else {
      localStorage.setItem(key, field.value);
    }
  }

  function updateRadioGroup(form, prefix, field){
    var name = field.name;
    if (!name) {
      storeValue(prefix, field);
      return;
    }
    var selector = 'input[type="radio"][name="' + name.replace(/"/g, '\\"') + '"]';
    var radios = form.querySelectorAll(selector);
    radios.forEach(function(radio){
      storeValue(prefix, radio);
    });
  }

  function init(formId, prefix, options){
    var form = document.getElementById(formId);
    if (!form) return;
    var fields = Array.from(form.querySelectorAll("input, select, textarea")).filter(shouldPersist);

    fields.forEach(function(field){
      var key = fieldKey(prefix, field);
      if (!key) return;
      var stored = localStorage.getItem(key);
      if (stored !== null) {
        applyValue(field, stored);
      } else {
        // Seed storage with default values from markup.
        storeValue(prefix, field);
      }
    });

    function handleChange(e){
      var field = e.target;
      if (!shouldPersist(field)) return;
      if (field.type === "radio") {
        updateRadioGroup(form, prefix, field);
      } else {
        storeValue(prefix, field);
      }
    }

    form.addEventListener("input", handleChange);
    form.addEventListener("change", handleChange);

    var resetButtonId = options && options.resetButtonId;
    if (resetButtonId) {
      var resetButton = document.getElementById(resetButtonId);
      if (resetButton) {
        resetButton.addEventListener("click", function(){
          fields.forEach(function(field){
            var key = fieldKey(prefix, field);
            if (key) localStorage.removeItem(key);
          });
          form.reset();
          // Re-seed defaults after reset so storage has current defaults.
          fields.forEach(function(field){
            storeValue(prefix, field);
          });
          var resultsId = options && options.resultsId;
          if (resultsId) {
            var results = document.getElementById(resultsId);
            if (results) results.textContent = "";
          }
        });
      }
    }
  }

  window.FormPersist = { init: init };
})();
