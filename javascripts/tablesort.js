document$.subscribe(function() {
  var tables = document.querySelectorAll("article table:not(.non-sort)")
  tables.forEach(function(table) {
    new Tablesort(table)
  })
})