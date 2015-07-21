$(document).ready(function () {
  init()
})

$(document).on('change', '.filter-checkbox', function () {
  rememberPreference()
})

var events = ['Stars', 'Forks', 'Comments', 'Repositories', 'Issues', 'Org']

function init () {
  events.map(function (key) {
    $('.account-switcher').after('<input type=checkbox id=\'' + key + '\' class=\'filter-checkbox filtered-' + key.toLowerCase() + '\'> <label class=\'filter-label\' for=\'' + key + '\'>' + key + '</label>')
  })
  applyPreference()
}

function rememberPreference () {
  var preference = {}
  $('.filter-checkbox').each(function (_, box) {
    preference[box.id] = $(box).is(':checked')
  })
  localStorage.setItem('dashboard:select', JSON.stringify(preference))
  loadMoreItemsIfApplicable()
}

function applyPreference () {
  var preference = localStorage.getItem('dashboard:select')
  if (preference) {
    preference = JSON.parse(preference)

    $('.filter-checkbox').each(function (_, box) {
      $(box).prop('checked', preference[box.id])
    })
  } else {
    $('.filter-checkbox').prop('checked', true)
  }

  loadMoreItemsIfApplicable()
}

function loadMoreItemsIfApplicable () {
  var paginate = $('.ajax_paginate')
  var paginateBtn = $('.js-events-pagination')
  if (paginateBtn.length === 0) { return false }

  var visibleItems = Array.prototype.filter.call(document.getElementsByClassName('alert'), function (ele) {
    return ele.offsetHeight > 0
  })

  if (visibleItems.length < 10) {
    $.ajax(paginateBtn.attr('href')).done(function (data) {
      paginate.replaceWith(data)

      if (visibleItems.length < 10) {
        loadMoreItemsIfApplicable()
      }
    })
  }
}
