$(document).ready(function () {
  // If had hided that means that javascript enabled
  $("#rowDisabledJS").hide();

  // For label tags
  $("label").each(function () {
    $(this).click(function () {
      $("input[id$='" + $(this).attr("for") + "']").focus();
      $("select[id$='" + $(this).attr("for") + "']").focus();
      $("textarea[id$='" + $(this).attr("for") + "']").focus();
    });
  });

  // if exists slider in header that remove background image from header
  if ($("#slider").length != 0) {
    $("#header").css("background-image", "none");
  }

  // replace name within id for bespoke rofm
  $("#FormBespoke")
    .find("input")
    .each(function () {
      $(this).attr("name", $(this).attr("id"));
    });

  $("#FormBespoke")
    .find("select")
    .each(function () {
      $(this).attr("name", $(this).attr("id"));
    });

  $("#FormBespoke")
    .find("textarea")
    .each(function () {
      $(this).attr("name", $(this).attr("id"));
    });

  if (
    $.browser.msie &&
    ($.browser.version == "6.0" ||
      $.browser.version == "7.0" ||
      $.browser.version == "8.0" ||
      $.browser.version == "9.0")
  ) {
    if ($("#socialmedia-container").length) {
      var lastScroll = 0;

      $(window).scroll(function (event) {
        //Sets the current scroll position
        var st = $(this).scrollTop();

        //Determines up-or-down scrolling
        if (st > lastScroll) {
          $("#socialmedia-container").css("display", "inline");
        }

        //Updates scroll position
        lastScroll = st;
      });
    }
  }
});

function sizeup987() {
  $("#jcornerBig").css("top", 0);
  $("#jcornerSmall").css("top", "-1000px");
}

function sizedown987() {
  $("#jcornerSmall").css("top", 0);
  $("#jcornerBig").css("top", "-1000px");
}

function HideBars(sBar) {
  var topWithBars = 0;

  if (sBar == "navbar") {
    topWithBars += $("#navbar").height();

    if ($.browser.msie && $.browser.version == "7.0") {
      topWithBars += 2;
    }
  }

  if (sBar == "cc-container") {
    topWithBars += $("#cc-container").height();
  }

  if ($("#navbar").length != 0) {
    $("#navbar").css(
      "top",
      parseInt($("#navbar").css("top")) - topWithBars + "px"
    );
  }
}

function DisplayBars(topMargin) {
  if ($.browser.msie && $.browser.version == "7.0") {
    if ($("#container").parent("#wrapcontainer").length == 0) {
      $("#container").wrap(
        '<div id="wrapcontainer" style="position: relative;"></div>'
      );
    }

    $("#container").css("margin-top", "0px");
  }

  var topCookie = 0;

  if ($("#cc-container").length != 0) {
    topCookie += $("#cc-container").height();
  }

  var topNav = 0;

  if ($("#navbar").length != 0) {
    topNav += $("#navbar").height();
  }

  $("#cc-container").css("top", "0px");
  $("#navbar").css("top", topCookie + "px");
}

function LoadAddressByPostBack(pURL, pPostcodeID, pWidth) {
  if (!validatePostcode($("#" + pPostcodeID).val())) {
    $("#tdPostcode").empty();
    $("#trPostcode").hide();
    $("#divEmptyListAddress").remove();
    return;
  }

  pURL += "&postcode=" + $("#" + pPostcodeID).val() + "&width=" + pWidth;

  $.ajax({
    type: "GET",
    url: pURL,
    contentType: "application/html; charset=windows-1251",
    beforeSend: function () {},
    success: function (data) {
      $("#divEmptyListAddress").remove();

      if (data == "1") {
        $("#" + pPostcodeID)
          .parent()
          .append(
            '<div id="divEmptyListAddress" class="infored" style="font-size:10px;">Sorry, invalid postcode, please check and try again</div>'
          );

        $("#tdPostcode").empty();
        $("#trPostcode").hide();
      } else if (data != "0") {
        $("#tdPostcode").empty();
        $("#tdPostcode").html(data);
        $("#trPostcode").show();
      }
    },
    error: function () {},
  });
}

function AutoFillAddress(pURL, pPostcodeListID) {
  ClearPostcodeFields();

  if ($("#" + pPostcodeListID).val() == "0") {
    return false;
  }

  pURL += "&id=" + $("#" + pPostcodeListID).val();

  $.getJSON(pURL, {}, function (json) {
    $.each(json, function (i, item) {
      var BuildingNumberOrCompany = "";
      var Addressline1 = "";
      var Addressline2 = "";

      if (item.Company != "") {
        BuildingNumberOrCompany = item.Company;
      } else if (item.SubBuilding != "") {
        BuildingNumberOrCompany = item.SubBuilding;
      } else if (item.BuildingNumber != "") {
        BuildingNumberOrCompany = item.BuildingNumber;
      } else {
        BuildingNumberOrCompany = item.BuildingName;
      }

      if (item.SubBuilding != "") {
        Addressline1 = item.BuildingName + ", " + item.PrimaryStreet;
      } else if (item.DependentLocality != "") {
        Addressline1 = item.PrimaryStreet;
      } else if (item.Company != "" && item.Line2 == "") {
        Addressline1 = item.BuildingNumber + ", " + item.PrimaryStreet;
      } else {
        Addressline1 = item.PrimaryStreet;
      }

      if (item.DependentLocality != "") {
        Addressline2 = item.DependentLocality;
      }

      var arrALine1 = prmAddressline1.split(",");
      if (arrALine1.length > 0) {
        for (var i = 0; i != arrALine1.length; i++) {
          $("#" + arrALine1[i]).val(Addressline1);
        }
      }

      var arrALine2 = prmAddressline2.split(",");
      if (arrALine2.length > 0) {
        for (var i = 0; i != arrALine2.length; i++) {
          $("#" + arrALine2[i]).val(Addressline2);
        }
      }

      var arrHouse = prmHouse.split(",");
      if (arrHouse.length > 0) {
        for (var i = 0; i != arrHouse.length; i++) {
          $("#" + arrHouse[i]).val(BuildingNumberOrCompany);
        }
      }

      var arrTown = prmTown.split(",");
      if (arrTown.length > 0) {
        for (var i = 0; i != arrTown.length; i++) {
          $("#" + arrTown[i]).val(item.PostTown);
        }
      }

      var arrCompany = prmCompany.split(",");
      if (arrCompany.length > 0) {
        for (var i = 0; i != arrCompany.length; i++) {
          $("#" + arrCompany[i]).val(item.Company);
        }
      }

      var arrCounty = prmCounty.split(",");
      if (arrCounty.length > 0) {
        for (var i = 0; i != arrCounty.length; i++) {
          $("#" + arrCounty[i]).val(item.County);
        }
      }
    });
  });
}

function ClearPostcodeFields() {
  var arrALine1 = prmAddressline1.split(",");
  if (arrALine1.length > 0) {
    for (var i = 0; i != arrALine1.length; i++) {
      $("#" + arrALine1[i]).val("");
    }
  }

  var arrALine2 = prmAddressline2.split(",");
  if (arrALine2.length > 0) {
    for (var i = 0; i != arrALine2.length; i++) {
      $("#" + arrALine2[i]).val("");
    }
  }

  var arrHouse = prmHouse.split(",");
  if (arrHouse.length > 0) {
    for (var i = 0; i != arrHouse.length; i++) {
      $("#" + arrHouse[i]).val("");
    }
  }

  var arrTown = prmTown.split(",");
  if (arrTown.length > 0) {
    for (var i = 0; i != arrTown.length; i++) {
      $("#" + arrTown[i]).val("");
    }
  }

  var arrCompany = prmCompany.split(",");
  if (arrCompany.length > 0) {
    for (var i = 0; i != arrCompany.length; i++) {
      $("#" + arrCompany[i]).val("");
    }
  }

  var arrCounty = prmCounty.split(",");
  if (arrCounty.length > 0) {
    for (var i = 0; i != arrCounty.length; i++) {
      $("#" + arrCounty[i]).val("");
    }
  }
}

function isValidDate(year, month, day) {
  var dateStr = month + "-" + day + "-" + year;

  var format = "MDY";

  var reg1 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{2}$/;
  var reg2 = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/;

  // If it doesn't conform to the right format (with either a 2 digit year or 4 digit year), fail
  if (reg1.test(dateStr) == false && reg2.test(dateStr) == false) {
    return false;
  }
  var parts = dateStr.split(RegExp.$1); // Split into 3 parts based on what the divider was
  // Check to see if the 3 parts end up making a valid date
  if (format.substring(0, 1) == "M") {
    var mm = parts[0];
  } else if (format.substring(1, 2) == "M") {
    var mm = parts[1];
  } else {
    var mm = parts[2];
  }
  if (format.substring(0, 1) == "D") {
    var dd = parts[0];
  } else if (format.substring(1, 2) == "D") {
    var dd = parts[1];
  } else {
    var dd = parts[2];
  }
  if (format.substring(0, 1) == "Y") {
    var yy = parts[0];
  } else if (format.substring(1, 2) == "Y") {
    var yy = parts[1];
  } else {
    var yy = parts[2];
  }

  if (parseFloat(yy) <= 50) {
    yy = (parseFloat(yy) + 2000).toString();
  }
  if (parseFloat(yy) <= 99) {
    yy = (parseFloat(yy) + 1900).toString();
  }

  var dt = new Date(
    parseFloat(yy),
    parseFloat(mm) - 1,
    parseFloat(dd),
    0,
    0,
    0,
    0
  );

  if (parseFloat(dd) != dt.getDate()) {
    return false;
  }
  if (parseFloat(mm) - 1 != dt.getMonth()) {
    return false;
  }

  return true;
}

function CheckupObj() {
  if (isEmpty(document.getElementById('" + txtUsername.ClientID + "'))) {
    alert("Enter Username!");
    return false;
  }
  if (isEmpty(document.getElementById('" + txtPassword.ClientID + "'))) {
    alert("Enter Password!");
    return false;
  }
  if (isEmpty(document.getElementById('" + txtPasswordConfirm.ClientID + "'))) {
    alert("Enter Confirm Password!");
    return false;
  }
  if (
    document.getElementById('" + txtPassword.ClientID + "').value !=
    document.getElementById('" + txtPasswordConfirm.ClientID + "').value
  ) {
    alert("Confirm Password does not match to Password!");
    return false;
  }
  return true;
}

function AddFormAction(strLink) {
  var aspnetForm = document.getElementById("aspnetForm");

  if (aspnetForm != null) {
    aspnetForm.action = strLink;
  }

  var FormManageAcct = document.getElementById("FormManageAcct");

  if (FormManageAcct != null) {
    FormManageAcct.action = strLink;
  }

  var formagegate = document.getElementById("formagegate");

  if (formagegate != null) {
    formagegate.action = strLink;
  }
}

function IsExistsHTMLTags(html) {
  if (
    html.indexOf("</") > -1 ||
    html.indexOf("$(") > -1 ||
    html.indexOf("%%") > -1 ||
    html.indexOf("function ()") > -1 ||
    html.indexOf("(document)") > -1
  ) {
    return true;
  }

  var reg = new RegExp("((<|&alt;)[a-zA-Z]+?)+?");

  if (html.match(reg)) {
    return true;
  }

  return false;
}

function CheckupEmail(txtValue, message) {
  var reg = new RegExp(
    "^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$"
  );

  if (!txtValue.match(reg)) {
    if (message != "") {
      alert('Enter correct "' + message + '"!');
    } else {
      alert("Please check the email format.");
    }

    return false;
  }

  return true;
}

function IsEmailOk(txtValue) {
  var reg = new RegExp(
    "^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$"
  );

  if (!txtValue.match(reg)) {
    return false;
  }

  return true;
}

function IsCorrectEmail(emailValue) {
  /*  var reg = new RegExp('^[a-zA-Z][\\w\\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\\w\\.-]*[a-zA-Z0-9].[a-zA-Z][a-zA-Z\\.]*[a-zA-Z]$');

    if (!emailValue.match(reg))
    {
    return false;
    }

    return true;*/

  var filter =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (filter.test(emailValue)) {
    return true;
  } else {
    return false;
  }
}

function IsValueInDDLOk(obj) {
  for (var i = 0; i < obj.length; i++) {
    if (obj[i].selected) {
      if (obj[i].value == "-1") {
        obj.selectedIndex = 0;
        return false;
      }
    }
  }

  return true;
}

function isEmpty(obj) {
  if (obj.value != "") {
    return false;
  }

  return true;
}

function IsEmptyTextbox(value) {
  if (value != "") {
    return false;
  }

  return true;
}

function IsValidNumber(strNumber) {
  var numberPat = /^\d+$/;
  var matchArray = strNumber.match(numberPat);

  if (matchArray == null) {
    return false;
  }

  return true;
}

function isCheck(obj) {
  if (obj.checked) {
    return true;
  }

  return false;
}

function getChar(e) {
  if (e.which || e.keyCode) {
    if (e.which == 13 || e.keyCode == 13) {
      return true;
    }
  }

  return false;
}

function setFocus(id, e) {
  if (getChar(e)) {
    document.getElementById(id).focus();
    return true;
  }

  return false;
}

function SetFocus(id) {
  $("#" + id).keydown(function (n) {
    if (n.keyCode && n.keyCode == 13) {
      $("#" + id).focus();
      return true;
    }
  });

  return false;
}

function CheckAll(prefix, id) {
  var chkMain = document.getElementById(id);

  for (var i = 0; i < document.forms[0].elements.length; i++) {
    var doc = document.forms[0].elements[i];

    if (doc.name.search(prefix) > 0) {
      alert(doc);
      if (chkMain.checked) {
        doc.checked = true;
      } else {
        doc.checked = false;
      }
    }
  }
}

function JumpToPage(objName) {
  var link = $("select#" + objName).val();

  if (link != "") {
    window.location.href = link;
  }
}

function MathRound(value, count) {
  return Math.round(value * Math.pow(10, count)) / Math.pow(10, count);
}

function show_submenu(id, itemwidth) {
  $("#" + id).css("visibility", "visible");

  var width = itemwidth;

  $("#" + id + " a.submenulink").each(function () {
    if ($(this).width() > width) {
      width = $(this).width();
    }
  });

  $("#" + id).css("width", width);
}

function hide_submenu(id) {
  $("#" + id).css("visibility", "hidden");
}

function getWindowWidth() {
  document.body.style.overflow = "hidden"; // hide scrollbars
  var viewportWidth = $(window).width();
  document.body.style.overflow = "";
  return viewportWidth;
}

function LoadArticles(el, res, path, close, imgload) {
  if ($(el).val().length > 0) {
    $("#" + close).click(function () {
      $(this).hide();
      $("#" + res).empty();
      $("#" + res).hide();
      $(el).val("Search!");
    });

    $.ajax({
      type: "GET",
      url: path + "handler.aspx?action=searcharticle&kw=" + $(el).val(),
      beforeSend: function (formData, jqForm, options) {
        $("#" + imgload).show();
      },
      success: function (data) {
        $("#" + imgload).hide();
        $("#" + res).show();
        $("#" + res).html(data);
        $("#" + close).show();
      },
    });
  } else {
    $("#" + close).hide();
    $("#" + imgload).hide();
    $("#" + res).hide();
  }

  return false;
}

$("form").submit(function () {
  if ($("input#nospam").val().length != 0) {
    return false;
  }
});

function getPosition(element) {
  var xPosition = 0;
  var yPosition = 0;

  while (element) {
    xPosition += element.offsetLeft - element.scrollLeft + element.clientLeft;
    yPosition += element.offsetTop - element.scrollTop + element.clientTop;
    element = element.offsetParent;
  }
  return { x: xPosition, y: yPosition };
}

/***** Expanding boxes js *****/

$(".expand-container.minimize").hide();
$(".expand-content").hide();
var initCollapse = function initCollapse() {
  $(".expand-container").each(function (i, elem) {
    var collapseBox = {};
    var container = $(elem);
    var button = container.find(".expand-btn");
    var settings = container.find("#settings");
    collapseBox.easing = getEasing(button);
    collapseBox.speed = getSpeed(button);
    container.collapse = collapseBox;
    initButton(button, container);
  });
};
var initButton = function initButton(button, container) {
  container.collapse.readMore = button.html();
  container.collapse.readLess = button.siblings(".minimize").html();
  button.on("click", function () {
    return switchButton(button, container);
  });
};
var expandContainer = function expandContainer(content, easing, speed) {
  return content.slideToggle(speed, easing);
};
var switchButton = function switchButton(button, container) {
  var content = container.find(".expand-content");
  var easing = container.collapse.easing;
  var speed = container.collapse.speed;
  content.css("display") == "none"
    ? (button.html(container.collapse.readLess),
      expandContainer(content, easing, speed))
    : (button.html(container.collapse.readMore),
      expandContainer(content, easing, speed),
      returnTop(container, speed));
};
var returnTop = function returnTop(container, speed) {
  var top = container.offset().top;
  if ($(window).scrollTop() > top) {
    $("html, body").animate({ scrollTop: top }, speed);
  }
};
var getEasing = function getEasing(elem) {
  return elem.data("ease");
};
var getSpeed = function getSpeed(elem) {
  return elem.data("speed");
};
$(initCollapse);


/* Custom Accordions Start */

document.addEventListener('DOMContentLoaded', () => {
    const accordionWrappers = document.querySelectorAll('.accordion-wrapper');
    accordionWrappers.forEach(accordionWrapper => {
      accordionWrapper.querySelector('.accordion-btn').addEventListener('click', e => {
        accordionWrappers.forEach(accordionWrapper => {
          if (accordionWrapper !== e.target.closest('.accordion-wrapper')) {
            accordionWrapper.classList.remove('accordion-active');
          }
        });
        e.target.closest('.accordion-wrapper').classList.toggle('accordion-active');
      });
    });
  });
  
/* Custom Accordions End */