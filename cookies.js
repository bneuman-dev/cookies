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

var Rack = function(selector) {
  this.selector = selector;
  this.cookies = null;
  this.bake_time = 0;
  this.view = new RackView(this);
}

Rack.prototype.empty = function() {
  return (!this.cookies);
}

Rack.prototype.add_cookies = function(cookies) {
  this.cookies = cookies;
  this.view.update_display();
}

Rack.prototype.bake = function() {
  this.bake_time += 1;
  this.view.update_display();
}

Rack.prototype.remove_cookies = function() {
  this.cookies = null;
}

Rack.prototype.doneness = function() {
  return this.bake_time / this.cookies.bake_time;
}

var RackView = function(rack) {
  this.rack = rack;
}

RackView.prototype.update_display = function() {
  $(this.rack.selector).html(this.html());
}

// RackView.prototype.bake = function() {
//   this.rack.bake();
//   this.update_display();
// }

RackView.prototype.html = function() {
  if (!this.rack.cookies) {
    return "[empty]";
  }

  else {
    return this.rack.cookies.name + " - " + this.doneness();
  }
}

RackView.prototype.doneness = function() {
  var ratio = this.rack.doneness();

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

var Oven = {
  racks: [new Rack("#rack_0"),
          new Rack("#rack_1"),
          new Rack("#rack_2")],

  add_to_oven: function(batch) {
    if (this.racks[0].empty()) {
      this.racks[0].add_cookies(batch);
    }

    else if (this.racks[1].empty()) {
      this.racks[1].add_cookies(batch);
    }

    else if (this.racks[2].empty()) {
      this.racks[2].add_cookies(batch);
    }
  },

  bake: function() {
    for (i=0;i < this.racks.length;i++) {
      if (!this.racks[i].empty()) {
        this.racks[i].bake();
      }
    }
  },
}

