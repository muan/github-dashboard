var paginateProgress = 0

$(document).ready(function () {
  init()
})

$(document).on('change', '.filter-checkbox', function () {
  rememberPreference()
})

var events = ['Stars', 'Forks', 'Comments', 'Repositories', 'Issues', 'Org']

function init () {
  events.map(function (key) {
    $('.news .alert').first().before('<input type=checkbox id=\'' + key + '\' class=\'filter-checkbox filtered-' + key.toLowerCase() + '\'> <label class=\'filter-label\' for=\'' + key + '\'>' + key + '</label>')
  })
  applyPreference()
}

function rememberPreference () {
  var preference = {}
  $('.filter-checkbox').each(function (_, box) {
    preference[box.id] = box.checked
  })
  localStorage.setItem('dashboard:select', JSON.stringify(preference))
  loadMoreItemsIfApplicable()
}

function applyPreference () {
  var preference = localStorage.getItem('dashboard:select')
  if (preference) {
    preference = JSON.parse(preference)
  }

  $('.filter-checkbox').each(function (_, box) {
    box.checked = preference ? preference[box.id] : true
  })

  loadMoreItemsIfApplicable()
}

function loadMoreItemsIfApplicable (looping) {
  var paginate = $('.ajax_paginate')
  var paginateBtn = $('.js-events-pagination')
  if (paginateBtn.length === 0) { return false }
  if (!looping) { paginateProgress = 0 }

  var visibleItems = Array.prototype.filter.call(document.getElementsByClassName('alert'), function (ele) {
    return ele.offsetHeight > 0
  })

  if (visibleItems.length < 10) {
    $.ajax(paginateBtn.attr('href')).done(function (data) {
      paginate.replaceWith(data)

      if (paginateProgress < 3 && visibleItems.length < 10) {
        paginateProgress++
        loadMoreItemsIfApplicable(true)
      }
    })
  }
}
