var OuterView = Backbone.View.extend({
    initialize: function() {
        this.inner = new InnerView();
        this.inner.parentView = this;
    },

    render: function() {
        this.$el.html(template); // or this.$el.empty() if you have no template
        this.$el.append(this.inner.$el);
        this.inner.render();
    }
});

var InnerView = Backbone.View.extend({
    render: function() {
        this.$el.html(template);
        this.delegateEvents();
    }
});