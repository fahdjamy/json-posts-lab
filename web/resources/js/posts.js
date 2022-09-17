$(function () {
    $('#send').click(fillPost);
});

function fillPost(data) {
    let user = $("#userid").val();
    $.ajax('http://jsonplaceholder.typicode.com/posts', {
        'type': "get",
        'data': {
            'userId': user
        }
    }).done(function (data) {
        let postData = "";
        $.each(data, function (item, value) {
            postData += `<div id="${value.id}" class="container">
                    <h2>Title: ${value.title} </h2> By User Id: ${value.userId} 
                    <br />
                    <p> ${value.body} </p>
                    <p>
                        <button id="${value.id}" onclick="getComments(${value.id})" class="btn-small">Comments</button>
                    </p>
                    <div id="comments-${value.id}" style="padding-left: 12px; padding-right: 12px"></div>
                    <hr />
                </div>`;
        });
        $('.posts').html(postData);
    })
}

function getComments(postId) {
    let comments = "";
    $.ajax('http://jsonplaceholder.typicode.com/comments', {
        'type': "get",
        'data': {
            'postId': postId
        }
    }).done(function (data) {
        comments += `<h3 style='text-align: center'>Comments (${data.length})</h3>`;
        data?.forEach(comment => {
            comments += `<div style="border-style: solid; border-radius: 10px; margin-bottom: 5px; padding: 10px">
                        <h4>Email: ${comment?.email}</h4>
                        <p style="font-style: italic">Name: ${comment?.name}</p>
                        <p>Body: ${comment?.body}</p>
                    </div>`;
        });
        $('#comments-' + postId).html(comments);
    });
}
