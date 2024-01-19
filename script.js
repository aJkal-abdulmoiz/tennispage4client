$(document).ready(function() {
    
    initializeCustomSelects();
    
    
    // Hide the sidebar initially
    $('#hiddeSidebar').hide();
    // Set the initial left position of #sideIcon to 0
    $('#sideIcon').css('left', '0');
    $('#sideIcon').click(function() {
      $('#hiddeSidebar').toggle();
  
      var sidebarVisible = $('#hiddeSidebar').is(':visible');
      $('#sideIcon').css('left', sidebarVisible ? '300px' : '0');
    });

    $('#crossIcon').click(function() {
        // Hide the sidebar when clicking the crossIcon
        $('#hiddeSidebar').hide();
        // Reset the left position of #sideIcon to 0
        $('#sideIcon').css('left', '0');
      });


      // acessbility
    var clickCount = 0;
  
    $('#zoomButton').click(function() {
      clickCount++;
  
      if (clickCount === 1) {
        // First click, scale 1
        $('#section1').css('transform', 'scale(1.1)');
        $('#section2').css('transform', 'scale(1.1)');
        $('#section3').css('transform', 'scale(1.1)');
      } else if (clickCount === 2) {
        $('#section1').css('transform', 'scale(1.2)');
        $('#section2').css('transform', 'scale(1.2)');
        $('#section3').css('transform', 'scale(1.2)');
      } else if (clickCount === 3) {
        $('#section1').css('transform', 'scale(1.3)');
        $('#section2').css('transform', 'scale(1.3)');
        $('#section3').css('transform', 'scale(1.3)');
      } else if (clickCount === 4) {
        // Fourth click, set scale back to normal (1)
        $('#section1').css('transform', 'scale(1)');
        $('#section2').css('transform', 'scale(1)');
        $('#section3').css('transform', 'scale(1)');
        // Reset clickCount to restart the sequence
        clickCount = 0;
      }
    });
  });


  $(document).ready(function() {
    var clickCount = 0;
  
    $('#fontButton').click(function() {
      clickCount++;
  
      if (clickCount === 1) {
        // First click, scale 1
        $('#section1').css('transform', 'scale(0.8)');
        $('#section2').css('transform', 'scale(0.8)');
        $('#section3').css('transform', 'scale(0.9)');
      }  else if (clickCount === 2) {
        // Fourth click, set scale back to normal (1)
        $('#section1').css('transform', 'scale(1)');
        $('#section2').css('transform', 'scale(1)');
        $('#section3').css('transform', 'scale(1)');
        // Reset clickCount to restart the sequence
        clickCount = 0;
      }
    });


    $("#bwButton").click(function() {
        $("body").toggleClass("grayscale");
    });

var colorButton = document.getElementById("changeColorBtn");
    var changLinkBg = document.getElementById("changeBg");

    // Add a click event listener to the button
    colorButton.addEventListener("click", function() {
      // Toggle background color between yellow and default
      if (changLinkBg.style.backgroundColor === "gray") {
        changLinkBg.style.backgroundColor = "transparent"; // Set it back to default
      } else {
        changLinkBg.style.backgroundColor = "gray";
      }
    });


    $('#backColorChange').click(function() {
        // Toggle the 'highlight' class for sections 1, 2, and 3
        $('#section1, #midRight, #section3').toggleClass('bg-color');
        $('#midLeft').toggleClass('bg-color2');
      });
    });

      
// to review:

// sending api request 
function submitForm() {
        // Get form data
        var formData = new FormData(document.getElementById('myForm'));

        // Send POST request using fetch
        fetch('ajax-contact.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // Handle success response
            console.log(data);
            // You can perform additional actions here if needed
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
        });
    }



    function validateForm(event) {
        event.preventDefault();
        var nameInput = document.getElementById("name");
        var phoneInput = document.getElementById("phone");
        var optionsSelect = document.getElementById("options");
        var nameBubble = document.getElementById("nameBubble");
        var phoneBubble = document.getElementById("phoneBubble");
        var optionsBubble = document.getElementById("optionsBubble");

        // Reset bubbles
        nameBubble.textContent = "";
        phoneBubble.textContent = "";
        optionsBubble.textContent = "";

        // Custom validation logic
        if (!nameInput.validity.valid) {
            showBubble(nameBubble, "יש למלא שדה זה");
            event.preventDefault();
        }

        if (!phoneInput.validity.valid) {
            showBubble(phoneBubble, "מספר הטלפון אינו תקין");
            event.preventDefault();
        }

        if (!optionsSelect.validity.valid) {
            showBubble(optionsBubble, "יש לבחור מרכז מהרשימה");
            event.preventDefault();
        }
    }

    function showBubble(bubble, message) {
        bubble.textContent = message;
        bubble.style.opacity = 1;
        bubble.style.visibility = "visible";
        bubble.style.transform = "translate(-100%,-50%)";
    }

    function hideBubble(bubbleId) {
        var bubble = document.getElementById(bubbleId);
        bubble.style.opacity = 0;
        bubble.style.visibility = "hidden";
        bubble.style.transform = "translate(-100%,-50%)";
    }


function initializeCustomSelects() {
    $('.js-select').each(function() {
        var $this = $(this),
            numberOfOptions = $this.children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option:selected').text());

        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);

        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        var $listItems = $list.children('li');

        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function() {
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });

        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
        });

        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });

        // Add scrollbar to options
        $list.css({
            'max-width':'100%',
            'max-height': '100px', // Set the max height as needed
            'overflow-y': 'auto'
        });
    });
}

