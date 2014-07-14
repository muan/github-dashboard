$(document).ready(function() {
  init()
})

var events = ["Stars", "Forks", "Comments", "Repositories", "Issues", "Org"]

function init() {
  events.map(function(key) {
    $(".news").prepend("<input type=checkbox id=\""+ key + "\" class=\"filter-checkbox filtered-"+ key.toLowerCase() +"\"> <label class=\"filter-label\" for=\""+ key + "\">"+ key + "</label>")
  })
  applyPreference()
}

function rememberPreference() {
  var preference = {}
  $('.filter-checkbox').each(function(_, box) {
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

$(document).on("change", ".filter-checkbox", function() {
  rememberPreference()
})
