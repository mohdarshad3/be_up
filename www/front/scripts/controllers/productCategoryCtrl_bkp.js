/*global token */
angular.module('Front').controller('productCategoryCtrl', function ($scope, $rootScope, $location, $state, $localStorage, CONFIG, dataService, AUTH_EVENTS, $timeout, $stateParams, $confirm, userService, userService, toastr, productCategoryService,Reddit) {


    $scope.fromData = {};
    $scope.user = {};
    var selectedCheckbox = [];
    $scope.results = {};
    $scope.currentPage = 1;
    $scope.appName = CONFIG.appName;
    $scope.userType = CONFIG.userType;
    $scope.userLoggedIn = false;
    $scope.loginUserName = $localStorage.loginUserName;
    $scope.role = $localStorage.role;
    $scope.profilePic = $localStorage.userImage;
    $scope.loginUserId = $localStorage.loginUserId;
    $scope.imageUrl = CONFIG.imageUrl;
    $scope.userData = {};
    $scope.limit = '25';
    $scope.sort = 'asc';
    $scope.addressLocation ='';
    $scope.rating = 5;
    $scope.location = undefined;
    $scope.lat = 0;
    $scope.lng = 0;
    $scope.categoryId = null;

    $scope.slider = {
        minValue: 1,
        maxValue: 10000,
        options: {
            floor: 1,
            ceil: 10000,
            step: 1,
            onEnd: function() {
                $scope.getOtherUserProductList();
            }
        }
    };

    $scope.sliderr = {
        minValue: 1,
        maxValue: 10000,
        options: {
            floor: 1,
            ceil: 10000,
            step: 1,
            onEnd: function() {
                $scope.getAllProductList();
            }
        }
    };

    $scope.slide = {
        minValue: 1,
        maxValue: 10000,
        options: {
            floor: 1,
            ceil: 10000,
            step: 1,
            onEnd: function() {
                $scope.getOtherUserProductList();
            }
        }
    };

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.setItemsPerPage = function () {
        $scope.itemsPerPage = CONFIG.limit;
        $scope.currentPage = 1;  //reset to first paghe
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


        if (!categoryId)
            return;

        productCategoryService.getAllSubcategoryList(categoryId, function (err, subCategories) {
            if (!err) {
                $scope.subCategories = subCategories.data;
            } else {
                toastr.error(data.message, 'Error');
            }
        });

    };


    $scope.address = function () {

        if ($scope.fromData.address.formatted_address == '' || $scope.fromData.address.formatted_address == undefined)
            $scope.fromData.address = '';
    };

    $scope.checkFiles = checkFiles;
    $scope.checkFiles = checkFiles;
    $scope.fileSelect = fileSelect;

    $scope.fromData.files = '';
    function fileSelect() {
        if ($scope.fromData.filesList != null) {
            if ($scope.fromData.files == '' || $scope.fromData.files == undefined) {
                $scope.fromData.files = $scope.fromData.filesList;
            } else {
                angular.forEach($scope.fromData.filesList, function (value) {
                    $scope.fromData.files.push(value);
                });
            }
            delete $scope.fromData.filesList;
        }
        $scope.checkFiles();
    }




    function checkFiles() {
        var files = $scope.fromData.files;
        var maxFiles = 3;
        if ($scope.fromData.file != null && $scope.fromData.file != undefined) {
            maxFiles = 3 - $scope.fromData.file.length;
        }
        if (files != null) {
            if (files.length > maxFiles) {

                $scope.ProductForm.files.$setValidity("maxFiles", false);

            } else if (files.length > 0 && files.length <= maxFiles) {

                $scope.ProductForm.files.$setValidity("maxFiles", true);

            } else {
                $scope.ProductForm.files.$setValidity("maxFiles", true);
            }
        }
    }






    $scope.addProduct = function (valid) {
        if (!valid) {
            toastr.error('Invalid Form Data', 'Error');
            return false;
        }

        if($scope.fromData.address.geometry == undefined){
            $scope.fromData.address = undefined;
            return false;

        }

        if ($scope.fromData.address != undefined) {
            $scope.fromData.lat = $scope.fromData.address.geometry.location.lat();
            $scope.fromData.lng = $scope.fromData.address.geometry.location.lng();
            $scope.fromData.address = $scope.fromData.address.formatted_address;
        }
        productCategoryService.addProduct($scope.fromData, function (err, data) {
            if (!err) {
                toastr.success('Product added Successfully', 'Success');
                $state.go('user-products');
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };

    if ($stateParams.userId != undefined) {

        $scope.userId = $stateParams.userId;
    }

    $scope.addProductByAdmin = function (valid) {
        if (!valid) {
            toastr.error('Invalid Form Data', 'Error');
            return false;
        }

        $scope.fromData.user = $scope.userId;


        if ($scope.fromData.address != undefined) {
            $scope.fromData.location = $scope.fromData.address.geometry.location;
            $scope.fromData.address = $scope.fromData.address.formatted_address;
        }
        productCategoryService.addProductByAdmin($scope.fromData, function (err, data) {
            if (!err) {
                toastr.success('Product added Successfully', 'Success');
                $state.go('admin-product-list', {userId: $scope.userId});
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };


    $scope.getProductListByUserId = function () {

        var userId = $scope.userId;
        productCategoryService.getProductListByUserId(userId, $scope.currentPage, function (err, data) {
            if (!err) {
                $scope.itemsPerPage = CONFIG.limit;
                $scope.totalItems = data.total;
                $scope.results = data.docs;
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };


    $scope.productStatusChange = function (id, status) {
        $confirm({text: 'Are you sure you want to change status?'}).then(function () {
            productCategoryService.changeStatusProduct(id, status, function (err, data) {
                if (!err) {
                    toastr.success('Product  status has been changes Successfully', 'Success');
                    $scope.getProductListByUserId();
                } else {
                    toastr.error(data.message, 'Error');
                }
            });
        });
    };

    $scope.productDelete = function (id) {
        $confirm({text: 'Are you sure you want to delete?'}).then(function () {
            productCategoryService.deleteProduct(id, function (err, data) {
                if (!err) {
                    toastr.success('Product  has been deleted Successfully', 'Success');
                    $scope.getProductListByUserId();
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
                $scope.fromData.image = undefined;
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
        if ($scope.fromData.address != undefined) {
            $scope.fromData.location = $scope.fromData.address.geometry.location;
            $scope.fromData.address = $scope.fromData.address.formatted_address;
        }

        productCategoryService.updateProductByAdmin($scope.fromData, function (err, data) {
            if (!err) {
                toastr.success('Product updated Successfully', 'Success');
                $state.go('admin-product-list', {userId: $scope.fromData.user});
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };
    $scope.otherProductsList = function($event) {
        $scope.reddit = new Reddit();
    };


    $scope.getUserProductList = function (catId) {
        if(catId != null){
            $scope.categoryId = catId;
        }

        if ($scope.addressLocation != '') {

           $scope.lat = $scope.addressLocation.geometry.location.lat();
            $scope.lng = $scope.addressLocation.geometry.location.lng();

        }


        productCategoryService.getUserProductList($scope.currentPage, $scope.limit, $scope.sort,$scope.slider.minValue,$scope.slider.maxValue,$scope.rating, $scope.lat,$scope.lng,$scope.categoryId,$scope.productName, function (err, data) {
            if (!err) {
                $scope.itemsPerPage = $scope.limit;
                $scope.totalItems = data.total;
                $scope.results = data.docs;
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };

    $scope.getAllProductList = function (catId) {
        if(catId != null){
            $scope.categoryId = catId;
        }


        if ($scope.addressLocation != '') {

            $scope.lat = $scope.addressLocation.geometry.location.lat();
            $scope.lng = $scope.addressLocation.geometry.location.lng();

        }



        productCategoryService.getAllProductList($scope.currentPage, $scope.limit, $scope.sort,$scope.sliderr.minValue,$scope.sliderr.maxValue,$scope.rating, $scope.lat,$scope.lng,$scope.categoryId,$scope.productName, function (err, data) {
            if (!err) {
                $scope.itemsPerPage = $scope.limit;
                $scope.totalItems = data.total;
                $scope.results = data.docs;
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };

    $scope.getOtherUserProductList = function (catId) {
        if(catId != null){
            $scope.categoryId = catId;
        }


        if ($scope.addressLocation != '') {

            $scope.lat = $scope.addressLocation.geometry.location.lat();
            $scope.lng = $scope.addressLocation.geometry.location.lng();

        }


        productCategoryService.getOtherUserProductList($scope.currentPage, $scope.userId, $scope.limit, $scope.sort,$scope.slide.minValue,$scope.slide.maxValue,$scope.rating, $scope.lat,$scope.lng,$scope.categoryId,$scope.productName, function (err, data) {
            if (!err) {
                $scope.itemsPerPage = $scope.limit;
                $scope.totalItems = data.total;
                $scope.results = data.docs;
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };




    if ($stateParams.productId != undefined) {

        $scope.productId = $stateParams.productId;
    }

    $scope.getProductDetail = function () {




        productCategoryService.getProductDetail($scope.productId , function (err, data) {
            if (!err) {

                $scope.productData = data;
            } else {
                toastr.error(data.message, 'Error');
            }
        });
    };





});

