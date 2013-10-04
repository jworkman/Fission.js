Fission.Classes.Route = function( httpVerb ) {

    Fission.Utils.Synthisize( this, "httpVerb", httpVerb );
    Fission.Utils.Synthisize( this, "scope", "/" );
    Fission.Utils.Synthisize( this, "machineRoute", [] );
    Fission.Utils.Synthisize( this, "controllerName", "index" );
    Fission.Utils.Synthisize( this, "actionName", "404" );

    this.dynamic = function( segmentName )
    {

        this.machineRoute.push( {
            type: "dynamic",
            name: segmentName
        } );
        return this;

    }

    this.static = function( segmentValue )
    {

        this.machineRoute.push( {
            type: "static",
            name: segmentValue
        } );
        return this;

    }

    this.to = function( controllerName, actionName )
    {

        this.setControllerName( controllerName );
        this.setActionName( actionName );
        return this;

    }

    this.root = function()
    {

        this.machineRoute.push( {
            type: "root",
            name: undefined
        } );
        return this;

    }

    this.subScope = function( uriSegments ) {


        var scopeChunks = this.scope.split("/");


        if( scopeChunks.length > uriSegments.length ) { return false; }

        for( var i = 0, j = scopeChunks.length; i < j; i++ ) {

            if( scopeChunks[i] != uriSegments[i] ) { return false; }

        }


        return uriSegments.slice( scopeChunks.length, uriSegments.length );

    }

    this.matchesURI = function( uriSegments )
    {


        if( this.scope.length > 1 ) {

            /*uriSegments = this.subScope( uriSegments );
            if( uriSegments === false ) { return false; }*/
            uriSegments = Fission.Utils.subArrayFromStart( this.scope.split("/"), uriSegments );

        }

        //Check if root
        if( uriSegments.length == 0 && this.machineRoute.length > 0 && this.machineRoute[0].type == "root" ) {
            return true;
        }

        //Now check if uri segments match route segments count
        if( this.machineRoute.length != uriSegments.length ) { return false; }

        for( var i = 0, j = uriSegments.length; i < j; i++ )
        {

            if( this.machineRoute[i].type == "dynamic" ) { continue; }
            if( this.machineRoute[i].name == uriSegments[i] ) { continue; }
            return false;

        }

        return true;

    }

    this.notFound = function() {
        return this;
    }

}