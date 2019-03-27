declare module "dropdown" {
    interface Listener {
        callback: Function;
        thisArg?: any;
    }
    class EventEmitter {
        events: {
            [index: string]: Listener[];
        };
        constructor();
        on(name: string, callback: Function, context?: any): EventEmitter;
        /**
        Does not raise an error if the given event does not exist, or the given
        callback cannot be found.
        */
        off(name: string, callback: Function): EventEmitter;
        /**
        Does not raise an error if there are no listeners for the given event.
        */
        emit(name: string, ...args: any[]): EventEmitter;
    }
    /**
    input_el:
        the original text input element that listens for input
    results_el:
        the container element for results
    selected_el:
        the currently element for results
    */
    interface DropdownOption {
        label: string | Node;
        value: string;
    }
    class Dropdown extends EventEmitter {
        input_el: HTMLInputElement;
        results_el: HTMLUListElement;
        selected_el: HTMLLIElement;
        private query;
        constructor(input_el: HTMLInputElement);
        keydown(event: any): void;
        keyup(event: any): void;
        selected(): void;
        changed(): void;
        preselect(el: HTMLLIElement): void;
        reset(): void;
        setOptions(options: DropdownOption[], query: string): void;
        /** Dropdown.attach is the preferred API endpoint for initializing an
        dropdown element. It sets up the controller object, all the listeners,
        and returns the results list element, which has some custom event listeners.
        */
        static attach(input_el: HTMLInputElement): Dropdown;
    }
}
