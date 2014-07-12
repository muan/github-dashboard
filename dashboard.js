$(document).ready(function() {
  init()
})

var events = ["Stars", "Forks", "Comments", "Repositories", "Issues"]

function init() {
  events.map(function(key) {
    $(".news").prepend("<input checked type=checkbox id=\""+ key + "\" class=\"filter-checkbox filtered-"+ key.toLowerCase() +"\"> <label class=\"filter-label\" for=\""+ key + "\">"+ key + "</label>")
  })

  $("[data-key='comments']").click()
}
