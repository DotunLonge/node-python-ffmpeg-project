$("button").click(function() {

    if ($(this).attr("name") == "createAudio") {
        if ($("#tagFile")[0].files.length == 0 &&
            $("#songFile")[0].files.length == 0) {
            alert("song and tag file must both be  uploaded");
        } else {
            $("form").attr("action", "/");
            $("form").submit();
        }
    }

    if ($(this).attr("name") == "createVideo") {

        if ($("#imageFile")[0].files.length !== 0) {
            $("form").attr("action", "/merger")
            $("form").submit();
        } else {
            alert("cannot work without an image, dummy!");
        }
    }
})