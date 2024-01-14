let stompClient = null;

function connect() {
    let socket = new SockJS("/chatapp-server1");

    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame){
        console.log("Connected ", frame);
        $("#name-form").addClass('d-none');
        $("#chatroom").removeClass('d-none');

        // subscribe messages 
        stompClient.subscribe("/topic/return-to", function(response){
            showMessage(JSON.parse(response.body));
        });
    });

    $('#name-value').val('');
}

function showMessage(message){
    $("#message-container-tbl").prepend(`<tr><td><b>${message.name}: </b>${message.content}</td></tr>`);
}

function sendMessage(){
    let jsonOb ={
        name: localStorage.getItem("name"),
        content: $("#message-value").val(),
        time: new Date().toISOString()
    };

    stompClient.send("/app/message", {}, JSON.stringify(jsonOb));

    $('#message-value').val('');
}

$(document).ready((e)=>{
    $('#login').click(()=>{
        let name = $('#name-value').val();
        localStorage.setItem("name", name);
        $("#name-title").html(`welcome, <b>${name}</b>`)
        connect();
    });

    $("#send").click(()=>{
        sendMessage();
    });

    $('#logout').click(()=>{
        localStorage.removeItem("name");
        if(stompClient!==null){
            stompClient.disconnect();
            $("#name-form").removeClass('d-none');
            $("#chatroom").addClass('d-none');
            console.log("Disconneted ", stompClient);
        }
    })
});
