'use strict';
angular.module('Admin.factory', [])
    .factory('Reddit', function(adminService) {
        var Reddit = function() {
            this.items = [];
            this.busy = false;
            this.after = 1;
        };

        Reddit.prototype.nextPage = function() {
            if (this.busy) return;
            this.busy = true;
            var url = "http://localhost:9090/admin/getAdminList/" + this.after;

            adminService.getAdmin(this.after, function (err, data) {
                //  $http.jsonp(url).success(function(data) {
                var items = data;
                //  alert(items);
                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i]);
                }
                this.after =  this.after + 1;
                if(data.length == 0){
                    this.busy = true;
                }else {
                    this.busy = false;
                }
            }.bind(this));
        };

        Reddit.prototype.nextProduct = function() {
            if (this.busy) return;
            this.busy = true;
            var url = "http://localhost:9090/admin/getProductList/" + this.after;

            adminService.getProductList(this.after, function (err, data) {
                //  $http.jsonp(url).success(function(data) {
                var items = data;
                //  alert(items);
                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i]);
                }
                this.after =  this.after + 1;
                if(data.length == 0){
                    this.busy = true;
                }else {
                    this.busy = false;
                }
            }.bind(this));
        };


        return Reddit;
    })
