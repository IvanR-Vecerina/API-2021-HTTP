$(
    function()
    {
        function loadPasswords ()
        {
            $.getJSON(
                "/api/pwdgen/",
                function (passwords)
                {
                    if (passwords.length > 0)
                    {
                        $("#step4ToModify").text(passwords[0].password);
                    }
                }
            )
        }
        
        loadPasswords();
        setInterval(loadPasswords, 2500);
    }
);