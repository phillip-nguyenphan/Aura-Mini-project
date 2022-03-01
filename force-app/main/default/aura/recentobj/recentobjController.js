({
    myAction : function(cmp) {
        var action = cmp.get("c.RecentlyViewed");

        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                // Alert the user with the value returned 
                // from the server
                alert("From server: " + response.getReturnValue());

                // You would typically fire a event here to trigger 
                // client-side notification that the server-side 
                // action is complete

                cmp.set('v.sObjId', response.getReturnValue().Id);
                cmp.set('v.sObjType', response.getReturnValue().Type);
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        }); 

        $A.enqueueAction(action);
    }

})
