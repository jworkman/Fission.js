new Fission.Classes.Router().draw( "admin", [

    // GET /users/:id
    new Fission.Classes.Route( "GET" ).static( "users" ).dynamic( "id" ).to( "user", "show" ),

    // GET /users/:id
    new Fission.Classes.Route( "GET" ).static( "users" ).static( "id").static("edit").to( "user", "edit" ),

    // POST /users/:id
    new Fission.Classes.Route( "POST" ).static( "users" ).dynamic( "id" ).to( "user", "update" ),

    // * /
    new Fission.Classes.Route( "*" ).root().to( "index", "index" )

]);
