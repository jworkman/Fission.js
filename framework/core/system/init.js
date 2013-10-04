var Fission = {

    Elements: {

    },

    Classes: {

        Logger: {
            log: function( what ) { console.log(what); }
        }

    },

    Definitions: {

    },


    Router: {

    },

    Instances: {

    },


    bootstrap: function() {

        this.Instances.Router = new Fission.Classes.Router( Fission.Definitions.Routes );
        Fission.Instances.CurrentRoute          = this.Instances.Router.getMatchedRoute();
        Fission.Instances.CurrentControllerName = this.Instances.CurrentRoute.getControllerName();
        Fission.Instances.CurrentActionName     = this.Instances.CurrentRoute.getActionName();

        //Call the controller & action
        Fission.Classes.Logger.log( "----Calling Controller: " + Fission.Instances.CurrentControllerName );
        Fission.Classes.Logger.log( "--------Calling Action: " + Fission.Instances.CurrentActionName );

    }

}


Fission.Utils = {


    trimArray: function( arr ) {

        var returnArr = [];
        for(var i = 0, j = arr.length; i < j; i++) {
            if( arr[i] === "" ) { continue; }
            returnArr.push(arr[i]);
        }

        return returnArr;

    },

    setupDataObject: function( dataObject, instance )
    {

        if(typeof(dataObject) != "object") { return instance; }

        for( var property in dataObject ) {
            instance[property] = dataObject[property];
        }

        return instance;
    },

    makeDynamicRoute: function( segments, route )
    {
        if(typeof(segments) != "object") { return route; }

        for(var segment in segments) {
            route = route.replace( (":" + segment), segments[segment] );
        }

        return route;
    },

    Collection: function( array )
    {

        if( Object.prototype.toString.call( array ) != '[object Array]' ) { return array; }

        array.each = function( iterator )
        {
            for(var i = 0, j = this.length; i < j; i++) {
                iterator( this[i] );
            }
            return this;
        }

        array.any = function()
        {
            return (this.length > 0) ? true : false;
        }

        array.find = function( inWhat, needle )
        {

            var returnArray = [];
            for(var i = 0, j = this.length; i < j; i++)
            {

                if( typeof(this[i][inWhat]) !== "undefined") {

                    if( (needle instanceof RegExp) && needle.test(this[i][inWhat]) ) {
                        returnArray.push( this[i] ); continue;
                    }

                    if( ( typeof(needle) == "string" ) && this[i][inWhat] == needle ) {
                        returnArray.push( this[i] ); continue;
                    }

                    if( Object.prototype.toString.call( needle ) == '[object Function]' && needle( this[i][inWhat] ) )
                    {
                        returnArray.push( this[i] );
                    }

                    continue;

                }

            }

            return Fission.Utils.Collection( returnArray );

        }


        array.first = function()
        {

            this._currentPointer = 0;
            return Fission.Utils.Collection((this.length > 0) ? this[0] : [] );

        }


        array.last = function()
        {

            this._currentPointer = (this.length > 0) ? this.length - 1 : 0 ;
            return Fission.Utils.Collection((this.length > 0) ? this[ this.length - 1 ] : [] );

        }

        array.sum = function( inWhat )
        {

            var total = 0;
            for(var i = 0, j = this.length; i < j; i++)
            {
                if( typeof(this[i][inWhat]) !== "undefined" && !isNaN(this[i][inWhat]) ) {
                    total += Number(this[i][inWhat]);
                }
            }

            return total;

        }


        array.average = function( inWhat, decimalPlaces )
        {

            return Number( this.sum( inWhat ) / this.length );

        }

        array.invoke = function( methodName )
        {

            for(var i = 0, j = this.length; i < j; i++)
            {
                if( typeof(this[i][methodName]) !== "undefined" && Object.prototype.toString.call( this[i][methodName] ) == "[object Function]" ) {
                    this[i][methodName]();
                }
            }

            return true;

        }


        array.addEventListener = function( type, callBack, useCapture )
        {

            this.each(function( object ){

                Fission.Utils.setupEventDispatching( object );

            });

        }


        return array;

    },

    upperCaseFirst: function(string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    Synthisize: function( object, property, value )
    {

        object[ property ] = value;

        object[ "set" + this.upperCaseFirst(property) ] = function( value ) {
            this[ property ] = value;
            return true;
        };

        object[ "get" + this.upperCaseFirst(property) ] = function() {
            return this[ property ];
        };

        return value;

    }

}
