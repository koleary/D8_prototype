/**
 * entity.js
 */

$(document).ready(function(){

  // Toggole edit mode on off
     $('#edit-toggle').click(function() {
		$('#background').toggleClass('pencils');
	  });
	  
	  // Toggole translation source on off
     $('#trans-toggle-on').click(function() {
		$('.field-source').hide();
		$('#trans-toggle-on').hide();
		$('#contentarea').css("width","57%");
		$('.field-translation').css("width","100%");
		$('.layout-region-node-secondary').css({"width":"30%", "padding-bottom":"999px"});
		$('#trans-toggle-off').show();
		$('hr').css("width","0%");
	  });
	  $('#trans-toggle-off').click(function() {
		$('.field-source').show();
		$('#trans-toggle-on').show();
		$('#contentarea').css("width","100%");
		$('.field-translation').css("width","48%");
		$('.layout-region-node-secondary').css({"width":"100%","padding-bottom":"0px"});
		$('#trans-toggle-off').hide();
		$('hr').css("width","100%");
	  });
	  
	   // Scroll body source and field together
	  $("#edit-body").scroll(function () { 
        $("#bodysource").scrollTop($("#edit-body").scrollTop());
    });
	  $("#bodysource").scroll(function () { 
        $("#edit-body").scrollTop($("#bodysource").scrollTop());
    });
	
	
	 // copy body source to field
     $('#copy-body').click(function(event) {
		event.preventDefault();
		var thebody = document.getElementById("bodysource").innerText;
		document.getElementById("edit-body").innerText=thebody;
	  });
	  
	  // copy body source to field
     $('#apply').click(function(event) {
		event.preventDefault();
		var thehiddenbody = document.getElementById("body-stash").innerText;
		document.getElementById("edit-body").innerText=thehiddenbody;
		$('#copy-body').hide();
	  });
	  
	  $('#edit-body').each(function() {
   var elem = $(this);

   // Save current value of element
   $(this).data('oldVal', $(this).val());

   // Look for changes in the value
   elem.bind("propertychange keyup input paste", function(event){
      // If value has changed...
      if (elem.data('oldVal') != elem.val()) {
       // Updated stored value
       elem.data('oldVal', elem.val());

       // Do action
	   $(this).css("color","#008C23");
     }
   });
 });
	  
	   // copy string source to field
    // $('#copy-string').click(function(event) {
	//	event.preventDefault();
	//	var thestring = document.getElementById("bodysource").innerText;
	//	document.getElementById("edit-body").innerText=thebody;
	//  });
	  
	  
	  
	  // copy title source to field
     //$('#copy-title').click(function() {
		//var thetitle = document.getElementById("title-sourcetext").innerText;
		//document.getElementById("title-textfield").innerText=thetitle;
	 // });
	  
	//$("#input").on("propertychange, change, keyup, paste, input", function(){
    //	$('*').removeClass('highlighted');	
	//});


  
  // Hover entire node.
  $('#node-pencil').hover(function() {
	  $('#node-pencil').addClass('visible');
  });

  // Make editable on click 'Edit'.
  $('#node-pencil').click(function() {
    event.preventDefault();
      $(this).addClass('enabled');
      $('#title, #body, #tags').removeAttr('disabled');
      var placeY = $('textarea').eq(0).position();
      $('#entity').show().animate({opacity: 1}, 700);
	  $('#nub').hide();
	  $('#main').addClass('main-border'); 
  });

  // Hover editable textarea.
  $('#title, #body, #tags').hover(function() {
    $('#title, #body, #tags').addClass('inactive-hover');
    $(this).removeClass('inactive-hover');
  }, function() {
    $('#title, #body, #tags').removeClass('inactive-hover');
  });

  // Focus editable textarea and bring entity toolbar to field.
  $('#title, #body, #tags').focus(function() {
    $(this).removeClass('inactive-focus');
	$('#main').removeClass('main-border');
	$('#node-pencil').removeClass('visible'); 
	$('#title, #body, #tags').addClass('editable'); 
    $('#nub').show();
	if ($(this).attr('id') == 'tags') {
      $('#mock-wysiwyg').hide();
	}
    var posY = $(this).position();
    $('#entity').show().animate({ top: '+' + posY.top - 45}, 700).attr('data-focus', $(this).attr('id'));
    if ($(this).attr('id') == 'body') {
      $('#mock-wysiwyg').show();
      if ($('#tags').hasClass('changed')) {
        $('#edited-tags').css('top', $('#tags').position().top).show();
	if ($('#body').hasClass('changed')) {
	  $('#edited-body').css('top', $('#body').position().top).show();
	}
      }
    }
	if ($(this).attr('id') == 'title') {
      $('#mock-wysiwyg').hide();
	}
	if ($('*').hasClass('unsaved')); {
	  $('.field-status').removeClass('unsaved-label').html('edited');
	  $('#entity-counter').removeClass('alert');
	  $('#discard').hide();
	  $('#entity-close').show();
	}
	$('#main').removeClass('main-border'); 
  });
  
  // Edit textarea, change class of textarea.
  $('#title, #tags').focus(function() {
	  if ($('#body').hasClass('changed')) {
	  $('#edited-body').css('top', $('#body').position().top).show();
	  }
  });
  
  // Edit textarea, change class of textarea.
  $('#title, #body, #tags').on('keypress', function(event) {
    keyPress($(this));
    $(this).off(event);
  });
  
  // Close entity toolbar
  $('#entity-close').click(function() {
		event.preventDefault();
	 if ($('*').hasClass('changed')) {
	   var placeY = $('textarea').eq(0).position(); 
	   $('#entity').animate({ top: '+' + placeY.top - 45}, 700);
	   $('*').removeClass('changed');
	   $('*').removeClass('editable');
	   $('*').removeClass('enabled');
	   $('#title, #body, #tags').attr('disabled' , 'disabled');
	   $('#title, #body, #tags').blur();
	   $('#main').addClass('main-border-alert');
	   $('#entity-counter-box').show();
	   $('#discard').show();
	   $('#page-title-box').animate({ opacity: 0}, 100).animate({ width: 0}, 200).animate({ padding: 0}, 0);
	   $('#links-box').hide();
	   $('#entity-close').hide();
	   $('#mock-wysiwyg').hide();
	   $('#nub').hide();
    }
	else {
	   $(location.href = 'index.html');
	}
  });

  // Save field.
  $('button#submit').click(function() {
    if ($(this).hasClass('blue-button')) {
      $('#title, #body, #tags').removeClass('changed').removeClass('unsaved').removeClass('editable').blur();
	  $('#title, #body, #tags').removeAttr('disabled');
      $(this).removeClass('blue-button').addClass('gray-button').html('Saved');
	  $('#main').removeClass('main-border-alert').addClass('main-border');
      $('#entity-counter-box').hide();
	  $('#discard').hide();
	  $('#page-title-box').css({width:"", opacity:"", padding: ""});
	  $('#links-box').show();
	  $('#entity-close').show();
	  $('#nub').hide();
	  $('#mock-wysiwyg').hide();
	  var placeY = $('textarea').eq(0).position();
      $('#entity').show().animate({ top: '+' + placeY.top - 45}, 500)
    }
    $('textarea').on('keypress', function(event) {
      keyPress($(this));
      $(this).off(event);
    });
  });

  // Hide all on discard
  $('button#discard').click(function() {
	event.preventDefault();
	$(location.href = 'index.html');
  });

  // Refreshable keypress.
  function keyPress($textarea) {
    $textarea.addClass('changed');
    $('button#submit').show().removeClass('gray-button').addClass('blue-button').html('Save');
    $('button#submit').animate({ width: "60px" }, 100).animate({ opacity: 1}, 300);
	$('#entity-changed').removeClass('whitened');
    $('#entity-counter-box').css('display', 'inline-block').hide();
    $('#entity-counter').html($('.changed').length);
    }
  });
