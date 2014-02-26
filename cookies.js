// Your JavaScript here
$(document).ready( function() {
  // $("#prep_batches").on('click', function(event) {
  //   console.log('thigns');
  //   console.log($(event.target));
  //   if ($(event.target).attr('id') == "add_to_oven") {
  //     console.log("soething");
  //   }
  // });

  $("#new_batch").on('submit', function(event) {
      event.preventDefault();
      var batch_type = $(this).find('#batch_type').val();
      var bake_time = $(this).find('#bake_time').val();
      var cookie = new Cookie(batch_type, bake_time);
      $("#prep_batches").append(cookie.elem);
      return false;
  });
})

var Cookie = function(name, bake_time) {
  this.name = name;
  this.bake_time = bake_time;
  this.view = new CookieView(this);
  this.elem = this.view.elem;
}

Cookie.prototype.bake = function() {
  this.bake_time += 1;
}

var CookieView = function(cookie) {
  this.cookie = cookie;
  this.elem = $("<li>" + this.cookie.name + "<button id='add_to_oven'>Add to Oven</button></li>");
  var self = this;

  this.elem.find("button").on('click', function(event) {
    self.add_to_oven(self.cookie);

  });
}

CookieView.prototype.add_to_oven = function(cookie) {
  if ($("#rack_0").html() == "[empty]") {
    $("#rack_0").html(cookie.name);
  }

  else if ($("#rack_1").html() == "[empty]") {
    $("#rack_1").html(cookie.name);
  }

  else if ($("#rack_2").html() == "[empty]") {
    $("#rack_2").html(cookie.name);
  }
  Oven.add_batch(cookie);
}

var Oven = {
  cookies: [],
  baked_time: 0,

  add_batch: function(batch) {
    this.cookies.push(batch);
    },

  bake: function() {
    for (i = 0; i < this.cookies.length; i++) {
      this.cookies[i].bake();
    }
    this.baked_time += 1;
  },

  doneness: function(batch) {
    var ratio = this.baked_time / batch.bake_time;

    if (ratio < .25) {
      return "raw";
    }

    else if (ratio < .75) {
      return "gooey";
    }

    else if (ratio < 1) {
      return "perfect";
    }

    else if (ratio < 1.1) {
      return "crispy";
    }

    else if (ratio > 1.1){
      return "burnt";
    }
  }
}


