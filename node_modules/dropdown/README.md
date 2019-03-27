## dropdown

Dropdown helper.


## Usage

    <input id="query" autocomplete="off">
    <script>
      var query_el = document.getElementById('query');
      var dropdown = Dropdown.attach(query_el)
        .on('change', function(query) {
          // suppose query == 'ch'
          $.getJSON('/search', {q: query}, function(data, textStatus, jqXHR) {
            // data looks like [{label: 'Charles', value: 'Charles'}, {label: 'Chris', value: 'chris'}, ...]
            dropdown.setOptions(data);
          });
        })
        .on('select', function(value) {
          query_el.value = value;
        });
    </script>
    <style>
      .dropdown {
        margin: 0 2px;
        padding: 0;
        list-style: none;
        border: 1px solid #CCC;
      }
      .dropdown li {
        padding: 1px;
        cursor: default;
      }
      .selected {
        background-color: pink;
      }
    </style>


### TODO

* keep track of mouseover vs. up-down arrow selection, and revert to keyed up-down selection on mouseout.


## License

Copyright 2011-2014 Christopher Brown. [MIT Licensed](http://chbrown.github.io/licenses/MIT/#2011-2014).
