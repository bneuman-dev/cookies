// Your JavaScript here
$("#new_batch").on('submit', function(event) {
    console.log($(this).batch_type.val());
    event.preventDefault();
});
