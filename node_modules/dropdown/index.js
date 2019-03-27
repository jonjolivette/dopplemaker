"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventEmitter = (function () {
    function EventEmitter() {
        this.events = {};
    }
    EventEmitter.prototype.on = function (name, callback, context) {
        if (this.events[name] === undefined) {
            this.events[name] = [];
        }
        this.events[name].push({ callback: callback, thisArg: context });
        return this;
    };
    /**
    Does not raise an error if the given event does not exist, or the given
    callback cannot be found.
    */
    EventEmitter.prototype.off = function (name, callback) {
        if (name in this.events) {
            var listeners = this.events[name];
            for (var i = 0, listener = void 0; (listener = listeners[i]); i++) {
                if (listener.callback === callback) {
                    listeners.splice(i, 1);
                    // only remove one at a time
                    break;
                }
            }
        }
        return this;
    };
    /**
    Does not raise an error if there are no listeners for the given event.
    */
    EventEmitter.prototype.emit = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (name in this.events) {
            var listeners = this.events[name];
            for (var i = 0, listener = void 0; (listener = listeners[i]); i++) {
                listener.callback.apply(listener.thisArg, args);
            }
        }
        return this;
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
var Dropdown = (function (_super) {
    __extends(Dropdown, _super);
    function Dropdown(input_el) {
        var _this = this;
        _super.call(this);
        this.input_el = input_el;
        // DOMLib.EventEmitter.call(this);
        // initialize results element, even though we don't use it yet
        this.results_el = document.createElement('ul');
        this.results_el.setAttribute('class', 'dropdown');
        this.results_el.setAttribute('style', 'position: absolute; display: none');
        // insert results element as a sibling to the input element
        //   if input_el.nextSibling is null, this works just like .appendChild
        this.input_el.parentNode.insertBefore(this.results_el, this.input_el.nextSibling);
        // attach events
        this.input_el.addEventListener('keydown', function (ev) { return _this.keydown(ev); });
        this.input_el.addEventListener('keyup', function (ev) { return _this.keyup(ev); });
        // simply clicking or tabbing into the box should trigger the dropdown
        this.input_el.addEventListener('focus', function () { return _this.changed(); });
        this.input_el.addEventListener('blur', function () { return _this.reset(); });
    }
    Dropdown.prototype.keydown = function (event) {
        if (event.which === 13) {
            event.preventDefault();
        }
        else if (event.which == 38) {
            if (this.selected_el) {
                // Don't go lower than 0 when clicking up
                if (this.selected_el.previousSibling) {
                    this.preselect(this.selected_el.previousSibling);
                }
            }
            event.preventDefault();
        }
        else if (event.which == 40) {
            event.preventDefault();
            if (this.selected_el) {
                // Don't go higher than the last available option when going down
                if (this.selected_el.nextSibling) {
                    this.preselect(this.selected_el.nextSibling);
                }
            }
            else {
                this.preselect(this.results_el.firstChild);
            }
        }
    };
    Dropdown.prototype.keyup = function (event) {
        if (event.which === 13) {
            this.selected();
            this.reset();
        }
        else {
            this.changed();
        }
    };
    Dropdown.prototype.selected = function () {
        this.emit('select', this.selected_el.dataset['value'], this.selected_el);
    };
    Dropdown.prototype.changed = function () {
        var query = this.input_el.value;
        if (query !== this.query) {
            this.emit('change', query);
        }
    };
    Dropdown.prototype.preselect = function (el) {
        if (this.selected_el) {
            this.selected_el.classList.remove('selected');
        }
        if (el) {
            el.classList.add('selected');
            this.emit('preselect', el.dataset['value']);
        }
        this.selected_el = el;
    };
    Dropdown.prototype.reset = function () {
        this.results_el.style.display = 'none';
        // is this the best place for this reset?
        this.query = null;
    };
    Dropdown.prototype.setOptions = function (options, query) {
        var _this = this;
        // set this.query so that we know when the input differs from the current query
        this.query = query;
        // clear
        var results_el = this.results_el.cloneNode(false);
        results_el.style.display = options.length > 0 ? 'block' : 'none';
        // while (this.results_el.lastChild) {
        //   results_el.removeChild(this.results_el.lastChild);
        // }
        options.forEach(function (option) {
            // label can be either a string or a DOM element
            var label = option.label, value = option.value;
            var labelNode = (typeof label === 'string') ? document.createTextNode(label) : label;
            var li = document.createElement('li');
            li.appendChild(labelNode);
            li.dataset['value'] = value;
            // I wish I could listen for mouseover / mousedown higher up, but it's
            // harder, since it's hard to listen at a certain level
            li.addEventListener('mouseover', function () { return _this.preselect(li); });
            li.addEventListener('mousedown', function () {
                _this.preselect(li);
                _this.selected();
            });
            results_el.appendChild(li);
        });
        results_el.addEventListener('mouseout', function () { return _this.preselect(null); });
        // MDN: var replacedNode = parentNode.replaceChild(newChild, oldChild);
        this.results_el.parentNode.replaceChild(results_el, this.results_el);
        // and set the current results element to the new one
        this.results_el = results_el;
        this.selected_el = undefined;
    };
    /** Dropdown.attach is the preferred API endpoint for initializing an
    dropdown element. It sets up the controller object, all the listeners,
    and returns the results list element, which has some custom event listeners.
    */
    Dropdown.attach = function (input_el) {
        return new Dropdown(input_el);
    };
    return Dropdown;
}(EventEmitter));
exports.Dropdown = Dropdown;
