angular.module('Front').service('productCategoryService', function ($http, $q, $localStorage,CONFIG,Upload) {
    return {
        addProductCategory: function (data, callback) {
            Upload.upload({
                method: 'POST',
                url: CONFIG.baseUrl + 'productCategory/add',
                data: data
            }).then(function (result) {
                callback(null, result);
            }, function (err) {
                callback(true, err.data);
            });
        },
        getProductCategory: function (page, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'productCategory/getProductCategoryList/' + page
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        editProductCategory: function (id, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'productCategory/' + id + '/edit'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        updateProductCategory: function (data, callback) {
            Upload.upload({
                method: 'POST',
                url: CONFIG.baseUrl + 'productCategory/update',
                data: data
            }).then(function (result) {
                callback(null, result);
            }, function (err) {
                callback(true, err.data);
            });
        },
        getAllParentCategoryList: function (callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'productCategory/getAllParentCategoryList'
            }).then(function (result) {
                callback(null, result.data);
            }, function (err) {
                callback(true, err.data);
            });
        },
        getSubCaegoryList: function (callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'productCategory/getSubCaegoryList'
            }).then(function (result) {
                callback(null, result.data);
            }, function (err) {
                callback(true, err.data);
            });
        },
        getAllSubcategoryList: function (categoryId,callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'productCategory/getAllSubcategoryList/' + categoryId
            }).then(function (result) {
                callback(null, result.data);
            }, function (err) {
                callback(true, err.data);
            });
        },
        changeStatusProductCategory: function (id, status, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'productCategory/' + id + '/statusChange/' + status
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        deleteProductCategory: function (id, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'productCategory/' + id + '/delete'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        addProduct_bkp: function (data, callback) {
            Upload.upload({
                method: 'POST',
                url: CONFIG.baseUrl + 'frontProductCategory/addProduct',
                data: data
            }).then(function (result) {
                callback(null, result);
            }, function (err) {
                callback(true, err.data);
            });
        },
        addProduct: function (data, callback) {
            $http({
                method: 'POST',
                url: CONFIG.baseUrl + 'frontProductCategory/addProduct',
                data: data
            }).then(function (result) {
                callback(null, result.data);
            }, function (err) {
                callback(true, err.data);
            });
        },
        updateProduct: function (data, callback) {
            $http({
                method: 'POST',
                url: CONFIG.baseUrl + 'frontProductCategory/updateProduct',
                data: data
            }).then(function (result) {
                callback(null, result.data);
            }, function (err) {
                callback(true, err.data);
            });
        },
        addProductByAdmin: function (data, callback) {
            Upload.upload({
                method: 'POST',
                url: CONFIG.baseUrl + 'productCategory/addProductByAdmin',
                data: data
            }).then(function (result) {
                callback(null, result);
            }, function (err) {
                callback(true, err.data);
            });
        },
        updateProductByAdmin: function (data, callback) {
            Upload.upload({
                method: 'POST',
                url: CONFIG.baseUrl + 'product/updateProduct',
                data: data
            }).then(function (result) {
                callback(null, result);
            }, function (err) {
                callback(true, err.data);
            });
        },

        getProductListByUserId: function (userId,page, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'productCategory/getProductListByUserId/' + userId + '/' + page
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        changeStatusProduct: function (id, status, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'product/' + id + '/statusChange/' + status
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        deleteProduct: function (id, callback) {

            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'product/' + id + '/delete'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        editProduct: function (productId, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'product/' + productId + '/edit'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        getUserProductList: function (page,limit,sort,minValue,maxValue,rating,lat,lng,categoryId,productName,callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/getUserProductList/' + page + '/' + limit + '/' + sort + '/' + minValue + '/' + maxValue +  '/' + rating + '/' + lat + '/' +lng + '/' + categoryId + '/' + productName
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        getUserServiceList: function (page,limit,sort,minValue,maxValue,rating,lat,lng,categoryId,productName,callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/getUserServiceList/' + page + '/' + limit + '/' + sort + '/' + minValue + '/' + maxValue +  '/' + rating + '/' + lat + '/' +lng + '/' + categoryId + '/' + productName
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },

        getAllProductList: function (page,limit,sort,minValue,maxValue,rating,lat,lng,categoryId,productName,productType,callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/getAllProductList/' + page + '/' + limit + '/' + sort + '/' + minValue + '/' + maxValue +  '/' + rating + '/' + lat + '/' +lng + '/' + categoryId + '/' + productName + '/' + productType
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        getOtherUserServiceList: function (page,userId,limit,sort,minValue,maxValue,rating,lat,lng,categoryId,productName,callback) {
        $http({
            method: 'GET',
            url: CONFIG.baseUrl + 'user/getOtherUserServiceList/'  + page + '/' + userId + '/' + limit + '/' + sort + '/' + minValue + '/' + maxValue +  '/' + rating + '/' + lat + '/' +lng + '/' + categoryId + '/' + productName
        }).success(function (result) {
            callback(null, result);
        }).error(function (err) {
            callback(true, err);
        });
       },
        getOtherUserProductList: function (page,userId,limit,sort,minValue,maxValue,rating,lat,lng,categoryId,productName,callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/getOtherUserProductList/'  + page + '/' + userId + '/' + limit + '/' + sort + '/' + minValue + '/' + maxValue +  '/' + rating + '/' + lat + '/' +lng + '/' + categoryId + '/' + productName
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },



        getProductDetail: function (productId,callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'user/getProductDetail/' + productId
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        }






    };
});