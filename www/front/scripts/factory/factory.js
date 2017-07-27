'use strict';
angular.module('Front.factory', [])
    .factory('Reddit', function(adminService,$stateParams) {
        var Reddit = function() {
            this.items = [];
            this.busy = false;
            this.after = 1;
        };

       Reddit.prototype.nextProduct = function() {
            if (this.busy) return;
            this.busy = true;


            adminService.getProductList(this.after, function (err, data) {

                var items = data;

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

        Reddit.prototype.nextOtherProduct = function(userId) {
            if (this.busy) return;
            this.busy = true;


            adminService.getOtherProductList(this.after,userId, function (err, data) {

                var items = data;

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

        Reddit.prototype.nextPost = function() {
            if (this.busy) return;
            this.busy = true;


            adminService.getPostList(this.after, function (err, data) {

                var items = data;

                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i]);
                }
                this.after =  this.after + 1;
                if(data.status){

                    this.busy = true;
                }else {

                    this.busy = false;
                }
            }.bind(this));
        };

        Reddit.prototype.generalPost = function() {
            if (this.busy) return;
            this.busy = true;



            adminService.generalPostList(this.after,function (err, data) {

                var items = data;

                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i]);
                }
                this.after =  this.after + 1;
                if(data.status){
                    this.busy = true;
                }else {
                    this.busy = false;
                }
            }.bind(this));
        };
        Reddit.prototype.othersGeneralPost = function() {
            if (this.busy) return;
            this.busy = true;
            if($stateParams.userId != undefined){
                var userId = $stateParams.userId;

            }

            adminService.othersGeneralPost(this.after,userId,  function (err, data) {

                var items = data;

                for (var i = 0; i < items.length; i++) {
                    this.items.push(items[i]);
                }
                this.after =  this.after + 1;
                if(data.length == 0){
                    this.busy = true;
                }else {
                    this.busy = true;
                }
            }.bind(this));
        };




        return Reddit;
    });

