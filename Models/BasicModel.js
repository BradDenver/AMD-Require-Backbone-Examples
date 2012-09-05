define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    //define BasicModel model
    var BasicModel = Backbone.Model.extend({
        defaults: {
            Title: '',
            Summary: '',
            Url: '',
            Modified: '',
            ModifiedF: '',
            Source: ''
        }, //defining empty defaults prevents template throwing an undefined error

    });

    return BasicModel;
});