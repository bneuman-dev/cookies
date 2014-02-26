// Your JavaScript here
$(document).ready( function() {
  $("#new_batch").on('submit', function(event) {
      event.preventDefault();
      var batch_type = $(this).find('#batch_type').val();
      var bake_time = $(this).find('#bake_time').val();
      var cookie = new Cookie(batch_type, bake_time);
      $("#prep_batches").append(cookie.elem);
      return false;
  });

  $("#bake").on('click', function(event) {
    event.preventDefault();
    Oven.bake();
    return false;
  });
})

var Cookie = function(name, bake_time) {
  this.name = name;
  this.bake_time = bake_time;
  this.baked_time = 0;
  this.view = new CookieView(this);
  this.elem = this.view.elem;
}

Cookie.prototype.bake = function() {
  this.baked_time += 1;
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
  Oven.add_to_oven(cookie);
}

var Oven = {
  cookies: [],
  racks: {rack_0: null,
          rack_1: null,
          rack_2: null},

  baked_time: 0,

  add_batch: function(batch) {
    this.cookies.push(batch);
  },

  add_to_oven: function(batch) {
    var html = this.make_cookie_display(batch);

    if (!this.racks.rack_0) {
      this.racks.rack_0 = batch;
      $("#rack_0").html(html);
    }

    else if (!this.racks.rack_1) {
      this.racks.rack_1 = batch;
      $("#rack_1").html(html);
    }

    else if (!this.racks.rack_2) {
      this.racks.rack_2 = batch;
      $("#rack_2").html(html);
    }
  },

  make_cookie_display: function(batch) {
    return batch.name + " - " + this.doneness(batch);
  },

  bake: function() {
    this.baked_time += 1;
    for (rack in this.racks) {
      if (this.racks.hasOwnProperty(rack) && this.racks[rack]) {
        var selector = "#" + rack;
        console.log(selector);
        var html = this.make_cookie_display(this.racks[rack]);
        console.log(html);
        $(selector).html(html);
      }
    }
  },

  doneness: function(batch) {
    var ratio = this.baked_time / batch.bake_time;

    if (ratio == 0) {
      return "raw";
    }

    else if (ratio < 1) {
      return "gooey";
    }

    else if (ratio < 1.1) {
      return "perfect";
    }

    else if (ratio > 1.1 && ratio <= 1.3) {
      return "crispy";
    }

    else if (ratio > 1.3){
      return "burnt";
    }
  }
}

