define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    //define BasicModel model
    var ParseModel = Backbone.Model.extend({
        defaults: {
            Title: '',
            Summary: '',
            Url: '',
            Modified: '',
            ModifiedF: '',
            Source: ''
        }, //defining empty defaults prevents template throwing an undefined error

        //parse the items returned from the webservice
        parse : function(resp, xhr) {
            //make IdolFieldResponse values accessable by Fieldname
            if(resp.IdolFieldResponse){
                for (var i = 0 ; i < resp.IdolFieldResponse.length; i++) {
                    resp[resp.IdolFieldResponse[i].FieldName] = resp.IdolFieldResponse[i].FieldValue;
                };
            }
            return resp;
        }
    });

    return ParseModel;
});