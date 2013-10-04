Fission.Classes.Router = function() {


    if( typeof(Fission.Definitions.Routes) === "undefined" ) { Fission.Definitions.Routes = Fission.Utils.Collection( [] ); }

    this.draw = function( scope, routes )
    {

        for(var i = 0, j = routes.length; i < j; i++) {

            routes[i].setScope( scope );
            Fission.Definitions.Routes.push( routes[i] );

        }

    }


    this.getMatchedRoute = function() {

        var route       = {},
            uri         = window.location.hash.slice( 1, window.location.hash.length),
            uriSegments = Fission.Utils.trimArray( uri.split("/") );

        for(var i = 0, j = Fission.Definitions.Routes.length; i < j; i++) {

            if( Fission.Definitions.Routes[i].matchesURI(uriSegments) ) { return Fission.Definitions.Routes[i]; } else {
                continue;
            }

        }

        return new Fission.Classes.Route("*").notFound().to("index", "404");

    }

    this.getControllerName = function()
    {



    }


    this.getActionName = function()
    {

    }

}
