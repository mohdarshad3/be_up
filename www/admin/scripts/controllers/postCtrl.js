
/*global token */
angular.module('Admin').controller('postCtrl', function ($scope, $modal, $rootScope, $location, $state, $localStorage, CONFIG, dataService, AUTH_EVENTS, $timeout,$stateParams,$confirm,userService,postService,toastr,productCategoryService) {


    $scope.fromData = {};
    $scope.user = {};
    var selectedCheckbox = [];
    $scope.results = {};
    $scope.currentPage = 1;
    $scope.appName = CONFIG.appName;
    $scope.userType = CONFIG.userType;
    $scope.adminLoggedIn = false;
    $scope.loginUserName = $localStorage.loginUserName;
    $scope.role = $localStorage.role;
    $scope.profilePic = $localStorage.image;
    $scope.imageUrl = CONFIG.imageUrl;
    $scope.userData = {};





    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.setItemsPerPage = function () {
        $scope.itemsPerPage = CONFIG.limit;
        $scope.currentPage = 1;  //reset to first paghe
    };












    $scope.addProductCategory = function (valid) {
        if (!valid) {
            toastr.error('Invalid Form Data', 'Error');
            return false;
        }
        productCategoryService.addProductCategory($scope.fromData, function (err, data) {
            if (!err) {
                toastr.success('Product Category added successfully', 'Success');
                $state.go('product-category-list');
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };

    $scope.getProductCategoryList = function () {
        productCategoryService.getProductCategory($scope.currentPage, function (err, data) {
            if (!err) {
                $scope.itemsPerPage = CONFIG.limit;
                $scope.totalItems = data.total;
                $scope.results = data.docs;
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };




    $scope.editProductCategory = function () {
        $scope.id = $stateParams.id ? $stateParams.id : null;
        productCategoryService.editProductCategory($scope.id, function (err, result) {
            if (!err) {
                $scope.fromData = result.data;
                $scope.fromData.oldImage = result.data.image;
                $scope.fromData.image=undefined;
            } else {
                toastr.error(result.message, 'Error');
            }
        });
    };


    $scope.updateProductCategory = function (valid) {
        if (!valid) {
            toastr.error('Invalid Form Data', 'Error');
            return false;
        }
        productCategoryService.updateProductCategory($scope.fromData, function (err, data) {
            if (!err) {
                toastr.success('Product Category updated successfully', 'Success');
                $state.go('product-category-list');
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };

    $scope.getAllParentCategoryList = function () {
        productCategoryService.getAllParentCategoryList(function (err, result) {
            if (!err) {
                $scope.categories = result.data;
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };

    $scope.getSubCaegoryList = function () {
        productCategoryService.getSubCaegoryList(function (err, subCategories) {
            if (!err) {
                $scope.subCategories = subCategories.data;
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };


    $scope.getAllSubcategoryList = function (categoryId) {


        if(!categoryId)
            return;

        productCategoryService.getAllSubcategoryList(categoryId,function (err, subCategories) {
            if (!err) {
                $scope.subCategories = subCategories.data;
            } else {
                toastr.error(data.message, 'Error');
            }
        });

    };





    $scope.statusChange = function (id, status) {
        $confirm({text: 'Are you sure you want to change status?'}).then(function () {
            productCategoryService.changeStatusProductCategory(id, status, function (err, data) {
                if (!err) {
                    toastr.success('Product Category status has been changes Successfully', 'Success');
                    $scope.getProductCategoryList();
                } else {
                    toastr.error(data.message, 'Error');
                }
            });
        });
    };

    $scope.delete = function (id) {
        $confirm({text: 'Are you sure you want to delete?'}).then(function () {
            productCategoryService.deleteProductCategory(id, function (err, data) {
                if (!err) {
                    toastr.success('Product Category has been deleted Successfully', 'Success');
                    $scope.getProductCategoryList();
                } else {
                    toastr.error(data.message, 'Error');
                }
            });
        });
    };


    $scope.address = function () {

        if ($scope.fromData.address.formatted_address == '' ||  $scope.fromData.address.formatted_address == undefined)
            $scope.fromData.address = '';
    };

    $scope.addProduct = function (valid) {
        if (!valid) {
            toastr.error('Invalid Form Data', 'Error');
            return false;
        }

        if($scope.fromData.address != undefined) {
            $scope.fromData.location = $scope.fromData.address.geometry.location;
            $scope.fromData.address = $scope.fromData.address.formatted_address;
        }
        productCategoryService.addProduct($scope.fromData, function (err, data) {
            if (!err) {
                toastr.success('Product added Successfully', 'Success');
                $state.go('product-add');
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };

    if($stateParams.userId != undefined){

       $scope.userId = $stateParams.userId;
    }

    $scope.addProductByAdmin = function (valid) {
        if (!valid) {
            toastr.error('Invalid Form Data', 'Error');
            return false;
        }

        $scope.fromData.user = $scope.userId;


        if($scope.fromData.address != undefined) {
            $scope.fromData.location = $scope.fromData.address.geometry.location;
            $scope.fromData.address = $scope.fromData.address.formatted_address;
        }
        productCategoryService.addProductByAdmin($scope.fromData, function (err, data) {
            if (!err) {
                toastr.success('Product added Successfully', 'Success');
                $state.go('admin-product-list',{userId:$scope.userId});
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };


    $scope.getPostListByUserId = function () {

       var userId= $scope.userId;
        postService.getPostListByUserId(userId,$scope.currentPage, function (err, data) {
            if (!err) {
                $scope.itemsPerPage = CONFIG.limit;
                $scope.totalItems = data.total;
                $scope.results = data.docs;
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };


    $scope.postStatusChange = function (id, status) {
        $confirm({text: 'Are you sure you want to change status?'}).then(function () {
            postService.changeStatusPost(id, status, function (err, data) {
                if (!err) {
                    toastr.success('Post  status has been changes Successfully', 'Success');
                    $scope.getPostListByUserId();
                } else {
                    toastr.error(data.message, 'Error');
                }
            });
        });
    };

    $scope.postDelete = function (id) {
        $confirm({text: 'Are you sure you want to delete?'}).then(function () {
            postService.deletePost(id, function (err, data) {
                if (!err) {
                    toastr.success('Post  has been deleted Successfully', 'Success');
                    $scope.getPostListByUserId();
                } else {
                    toastr.error(data.message, 'Error');
                }
            });
        });
    };




    $scope.editProduct = function () {

        $scope.productId = $stateParams.productId;




        productCategoryService.editProduct($scope.productId, function (err, result) {
            if (!err) {
                $scope.fromData = result.data;
                $scope.fromData.oldImage = result.data.image;
                $scope.fromData.image=undefined;
            } else {
                toastr.error(result.message, 'Error');
            }
        });
    };





    $scope.updateProductByAdmin = function (valid) {
        if (!valid) {
            toastr.error('Invalid Form Data', 'Error');
            return false;
        }
        if($scope.fromData.address != undefined) {
            $scope.fromData.location = $scope.fromData.address.geometry.location;
            $scope.fromData.address = $scope.fromData.address.formatted_address;
        }

       productCategoryService.updateProductByAdmin($scope.fromData, function (err, data) {
            if (!err) {
                toastr.success('Product updated Successfully', 'Success');
                $state.go('admin-product-list',{userId:$scope.fromData.user});
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };


    $scope.open = function (postId) {


        $scope.postId = postId;
        $modal.open({
            templateUrl: 'myModalContent.html',
            backdrop: true,
            windowClass: 'modal',
            controller: function ($scope, $modalInstance, $log, user) {
                postService.commentListOnPost(postId, function (err, data) {
                    if (!err) {

                        $scope.comments = data;

                    } else {
                        toastr.error(err.data.message, 'Error');
                    }
                });
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
                $scope.commentDelete = function (id) {



                    $confirm({text: 'Are you sure you want to delete?'}).then(function () {
                        postService.commentDelete(id, function (err, data) {
                            if (!err) {
                                toastr.success('Comment  has been deleted Successfully', 'Success');
                                postService.commentListOnPost(postId, function (err, data) {
                                    if (!err) {

                                        $scope.comments = data;

                                    } else {
                                        toastr.error(err.data.message, 'Error');
                                    }
                                });
                            } else {
                                toastr.error(data.message, 'Error');
                            }
                        });
                    });
                };


            },
            resolve: {
                user: function () {
                    return $scope.postId;
                }
            }
        });
    };


    $scope.openn = function (postId) {


        $scope.postId = postId;
        $modal.open({
            templateUrl: 'mylikes.html',
            backdrop: true,
            windowClass: 'modal',
            controller: function ($scope, $modalInstance, $log, user) {
                postService.likeListOnPost(postId, function (err, data) {
                    if (!err) {

                        $scope.comments = data;

                    } else {
                        toastr.error(err.data.message, 'Error');
                    }
                });
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };

                $scope.unlikePost = function (id) {



                    $confirm({text: 'Are you sure you want to delete?'}).then(function () {
                        postService.unlikePost(id, function (err, data) {
                            if (!err) {
                                toastr.success('Like has been deleted Successfully', 'Success');
                                postService.likeListOnPost(postId, function (err, data) {
                                    if (!err) {

                                        $scope.comments = data;

                                    } else {
                                        toastr.error(err.data.message, 'Error');
                                    }
                                });
                            } else {
                                toastr.error(data.message, 'Error');
                            }
                        });
                    });
                };
            },
            resolve: {
                user: function () {
                    return $scope.postId;
                }
            }
        });
    };

});

