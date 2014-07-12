$(document).ready(function() {
  init()
})

var events = ["Stars", "Forks", "Comments", "Repositories", "Issues"]

function init() {
  $(".news").prepend("<div class=\"dashboard-filters button-group\"></div>")

  events.map(function(key) {
    $(".dashboard-filters").prepend("<a href=\"#\" class=\"button dashboard-filter\" data-key=\""+ key.toLowerCase() +"\">"+ key + "</a>")
  })

  $("[data-key='comments']").click()
}

$(document).on("click", ".dashboard-filter", function() {
  var key = "filtered-" + $(this).attr("data-key")
  var classes = events.map(function(key) { return "filtered-" + key.toLowerCase() }).join(" ")
  $(this).addClass("selected").siblings().removeClass("selected")
  $(".news").removeClass(classes).addClass(key)

  return false
})
