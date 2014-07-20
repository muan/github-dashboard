$(document).ready(function() {
  init()
  addKeyDownEvent()
})

$(document).on("change", ".filter-checkbox", function() {
  rememberPreference()
})

var events = ["Stars", "Forks", "Comments", "Repositories", "Issues", "Org"]

function init() {
  events.map(function(key) {

    // s is in used, use e instead.
    if(key === "Stars") {
      hotkey = "e"
    } else {
      hotkey = key[0].toLowerCase()
    }

    $(".news").prepend("<input type=checkbox id=\""+ key + "\" class=\"filter-checkbox filtered-"+ key.toLowerCase() +"\" data-hotkey=\""+ hotkey + "\"> <label class=\"filter-label\" for=\""+ key + "\">"+ key + "</label>")
  })

  applyPreference()
}

function rememberPreference() {
  var preference = {}
  $(".filter-checkbox").each(function(_, box) {
    preference[box.id] = $(box).is(":checked")
  })
  localStorage.setItem("dashboard:select", JSON.stringify(preference))
}

function applyPreference() {
  var preference = localStorage.getItem("dashboard:select")
  if(preference) {
    preference = JSON.parse(preference)

    $(".filter-checkbox").each(function(_, box) {
      $(box).prop("checked", preference[box.id])
    })
  } else {
    $(".filter-checkbox").prop("checked", true)
  }
}

function addKeyDownEvent() {
  $org          = $("#Org")
  $issues       = $("#Issues")
  $repositories = $("#Repositories")
  $comments     = $("#Comments")
  $forks        = $("#Forks")
  $stars        = $("#Stars")

  $(".filter-checkbox").on('keyup', function(event){
    switch(event.keyCode) {
      case 79: // o
        $org.prop("checked", !$org.prop("checked"))
        break
      case 73: // i
        $issues.prop("checked", !$issues.prop("checked"))
        break
      case 82: // r
        $repositories.prop("checked", !$repositories.prop("checked"))
        break
      case 67: // c
        $comments.prop("checked", !$comments.prop("checked"))
        break
      case 70: // f
        $forks.prop("checked", !$forks.prop("checked"))
        break
      case 69: // s
        $stars.prop("checked", !$stars.prop("checked"))
        break
      case 65: // a (toggle all checkboxes)
        $(".filter-checkbox").prop("checked", !$(".filter-checkbox").prop("checked"))
        break
      default:
        break
    }

    $(".filter-checkbox").change()
  })
}