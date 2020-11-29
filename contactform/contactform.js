window.addEventListener("DOMContentLoaded", function () { // get the form elements defined in your form HTML above

    var form = document.getElementById("formElement");
    var button = document.getElementById("submitbutton");

    // Success and Error functions for after the form is submitted

    function success() {
        $('#sendmessage').addClass('show');
        $('#errormessage').removeClass('show');
        $('.contactForm').find('input, textarea').val('');
    }

    function error() {
        $('#sendmessage').removeClass('show');
        $('#errormessage').addClass('show');
        $('#errormessage').html("Sorry! There has been technical difficulty <br> Try again later");
    }


    // handle the form submission event

    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        if (formCheck()) {
			console.log("Error in Input");
            return false
        }else{
			var data = new FormData(form);
    		ajax(form.method, form.action, data, success, error);
		}
    });
});

function formCheck() {
    var formName = "form.contactForm";
    var f = $(formName).find('.form-group'),
        ferror = false,
        emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function () { // run all inputs
        var i = $(this); // current input
        var rule = i.attr('data-rule');

        if (rule !== undefined) {
            var ierror = false; // error flag for current input
            var pos = rule.indexOf(':', 0);
            if (pos >= 0) {
                var exp = rule.substr(pos + 1, rule.length);
                rule = rule.substr(0, pos);
            } else {
                rule = rule.substr(pos + 1, rule.length);
            }

            switch (rule) {
                case 'required':
                    if (i.val() === '') {
                        ferror = ierror = true;
                    }
                    break;

                case 'minlen':
                    if (i.val().length<parseInt(exp)) {
						ferror = ierror = true;
					}
					break;

				case 'email':
					if (!emailExp.test(i.val())) {
						ferror = ierror = true;
					}
					break;

				case 'checked':
					if (!i.is(':checked')) {
						ferror = ierror = true;
					}
					break;

				case 'regexp':
					exp = new RegExp(exp);
					if (!exp.test(i.val())) {
						ferror = ierror = true;
					}
					break;
			}
			i.next('.validation')
				.html(
					ierror
						? i.attr('data-msg') !== undefined
							? i.attr('data-msg')
							: 'wrong Input'
						: ''
				)
				.show('blind');
		}
	});
	f.children('textarea').each(function () {
		// run all inputs

		var i = $(this); // current input
		var rule = i.attr('data-rule');

		if (rule !== undefined) {
			var ierror = false; // error flag for current input
			var pos = rule.indexOf(':', 0);
			if (pos >= 0) {
                        var exp = rule.substr(pos + 1, rule.length);
                        rule = rule.substr(0, pos);
                    } else {
                        rule = rule.substr(pos + 1, rule.length);
                    }

                    switch (rule) {
                        case 'required':
                            if (i.val() === '') {
                                ferror = ierror = true;
                            }
                            break;

                        case 'minlen':
                            if (i.val().length < parseInt(exp)) {
                                ferror = ierror = true;
                            }
                            break;
                    }
                    i.next('.validation').html(ierror ? i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input' : '').show('blind');
            }
		});
		
        if(ferror) 
            return true;

        var str = $(formName).serialize();
        return false;
    }

    // helper function for sending an AJAX request

    function ajax(method, url, data, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== XMLHttpRequest.DONE) 
                return;
            


            if (xhr.status === 200) {
                success(xhr.response, xhr.responseType);
            } else {
                error(xhr.status, xhr.response, xhr.responseType);
            }
        };
        xhr.send(data);
    }
