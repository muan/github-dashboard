var paginateProgress = 0
init()

document.addEventListener('change', function (evt) {
  if (evt.target.className.match(/filter-checkbox/)) {
    rememberPreference()
  }
})

function init () {
  var events = ['Stars', 'Forks', 'Comments', 'Repositories', 'Issues', 'Org', 'Wiki']
  var target = document.querySelector('.news .alert')
  events.forEach(function (key) {
    var input = document.createElement('input')
    input.type = 'checkbox'
    input.id = key.toLowerCase()
    input.className = 'filter-checkbox filtered-' + key.toLowerCase()

    var label = document.createElement('label')
    label.className = 'filter-label'
    label.setAttribute('for', key.toLowerCase())
    label.innerText = key

    target.parentElement.insertBefore(input, target)
    target.parentElement.insertBefore(label, target)
  })

  applyPreference()
}

function rememberPreference () {
  console.log('remembering')
  var preference = {}
  Array.prototype.forEach.call(document.getElementsByClassName('filter-checkbox'), function (box) {
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

  Array.prototype.forEach.call(document.getElementsByClassName('filter-checkbox'), function (box) {
    box.checked = preference ? preference[box.id] : true
  })

  loadMoreItemsIfApplicable()
}

function loadMoreItemsIfApplicable (looping) {
  var paginate = document.getElementsByClassName('ajax_paginate')[0]
  var paginateBtn = document.getElementsByClassName('js-events-pagination')[0]
  if (!paginateBtn) { return false }
  if (!looping) { paginateProgress = 0 }
  paginateBtn.click()

  var visibleItems = Array.prototype.filter.call(document.getElementsByClassName('alert'), function (ele) {
    return ele.offsetHeight > 0
  })

  if (visibleItems.length < 10) {
    paginateBtn.click()

    // Ugh
    setTimeout(function () {
      if (paginateProgress < 3 && visibleItems.length < 10) {
        paginateProgress++
        loadMoreItemsIfApplicable(true)
      }
    }, 500)
  }
}
