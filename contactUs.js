var myEmail = "";
var successFeedback = "the message was sent successfully";
var failFeedback = "There was a problem sending the message, please try again later";
var serverName = "";
//serverName = "http://webdevelopmentcourse.telem-hit.net/"
serverName = "https://webdevelopmentcourse.github.io/MasterStove/";

var ajaxLoaderImageURL = serverName + "ajaxLoader.svg";



$(function () {
    myEmail = $("input#myEmail").val();
    var theEmailString = "";
    $("input[type='submit']").click(function () {
         $("div#feedback").show();
        $("div#feedback").html("");
          addAjaxLoaderToFeedbackDiv();
        theEmailString = getFormValue();
        send2Server(theEmailString);
        return false;
    });

    // we set the ajaxLoaderImageFromTheStart
    addAjaxLoaderToFeedbackDiv();
});


function getFormValue() {
    var theString = "";
    $("body form div").children().each(function () {

        var theId = "";
        var theTitle = "";
        var theValue = "";

        if ($(this).attr("for") != null) {

            theId = $(this).attr("for");
            theTitle = $(this).text();

                if ($("textarea#" + theId).is(":visible")) {
                    theValue = $("textarea#" + theId).text();
                    theValue = $.trim(theValue);
                    if (theValue == "") {
                        theValue = $("textarea#" + theId).val();
                    }
                } else if ($("select#" + theId).is(":visible")) {
                    var optionValue = $("#" + theId).val();
                    theValue = $("#" + theId).find("option[value='" + optionValue + "']").text();

                } else if ($("input#" + theId).is(":visible") && ($("input#" + theId).attr("type") == "text" || $("input#" + theId).attr("type") == "password" || $("input#" + theId).attr("type") == "email")) {
                    theValue = $("#" + theId).val();
                }
                else {
                    if ($("input#" + theId).is(':checked') && $("input#" + theId).attr("type") == "radio") {
                            theValue += $("label[for='" + $(this).attr("id") + "']").text() + " + ";
                        }
                    else if ($("input#" + theId).attr("type") == "checkbox") {
                        if ($("input#" + theId).is(':checked')) {
                                theValue = "Yes";
                            }
                            else {
                                theValue = "No";
                            }
                        }
                   
                }
     

        }


        if (theId != "") {
            theString += "<b>" + theTitle + " : " + "</b>";
            theString += theValue + "<br/>";
        }

    });
    return theString;
}


function send2Server(str) {
    showAjaxLoader();
    console.log("str: " + str);
    console.log("myEmail: " + myEmail);
    var theServer = "https://wwws.hit.ac.il/facebook/telemDev/TelemWebDevelopmentCourseContact_me.php";
    $.ajax({
        url: theServer,
        type: "POST",
        data: {
            theMailBody: str,
            sendTo: myEmail,
        },
        cache: false,
        complete: function (data) {
            console.log(data.statusText);
            hideAjaxLoader();
            $("div#feedback").html("");
            addAjaxLoaderToFeedbackDiv();
            if (data.statusText == "OK") {
                $("div#feedback").append(successFeedback);
                $("div#feedback").css("color", "green");
            }
            else {
                $("div#feedback").append(failFeedback);
                $("div#feedback").css("color", "red");
            }
 setTimeout(function () {
            $("div#feedback").fadeOut("slow");
}, 2500);
        }

    });
}



function myEncode(str) {
    // return encodeURIComponent(str).replace(/\'/g, "%27");
    // return encodeURIComponent(str).replace(/\'/g, "</br>");
}

function addAjaxLoaderToFeedbackDiv() {
    $("div#feedback").append("<div id='ajaxLoaderDiv' style='display:none;'><img src='" + ajaxLoaderImageURL + "' alt='ajaxLoader' /></div>");
}

function showAjaxLoader() {
    $("div#ajaxLoaderDiv").fadeIn();
}

function hideAjaxLoader() {
    $("div#ajaxLoaderDiv").fadeOut();
}
