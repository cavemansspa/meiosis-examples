/*global Vue*/
(function(ref) {
  ref.vueView = function(model) {
    return function(propose) {
      //return Vue.component("counter", {
      return new Vue({
        el: "#vueApp",
        data: { model: model },
        template: `
          <div>
            <div><span>Vue Counter: {{model.counter}}</span></div>
            <div>
              <button v-on:click='onInc'>+ 4</button>
              <button v-on:click='onDecr'>- 4</button>
            </div>
          </div>
        `,
        methods: {
          onInc: function() {
            propose({ add: 4 });
          },
          onDecr: function() {
            propose({ add: -4 });
          }
        }
      });
    };
  };
})(window);