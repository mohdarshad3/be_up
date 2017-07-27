angular.module('Admin').service('postService', function ($http, $q, $localStorage,CONFIG,Upload) {
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
        addProduct: function (data, callback) {
            Upload.upload({
                method: 'POST',
                url: CONFIG.baseUrl + 'productCategory/addProduct',
                data: data
            }).then(function (result) {
                callback(null, result);
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

        getPostListByUserId: function (userId,page, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'post/getPostListByUserId/' + userId + '/' + page
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        changeStatusPost: function (id, status, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'post/' + id + '/statusChange/' + status
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        deletePost: function (id, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'post/' + id + '/delete'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        commentListOnPost: function (postId, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'post/commentList/' + postId
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        commentDelete: function (Id, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'post/' + Id + '/deleteComment'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        unlikePost: function (Id, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'post/' + Id + '/unlikePost'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        deleteRating: function (Id, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'post/' + Id + '/deleteRating'
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        ratingOnProduct: function (productId, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'post/ratingList/' + productId
            }).success(function (result) {
                callback(null, result);
            }).error(function (err) {
                callback(true, err);
            });
        },
        likeListOnPost: function (postId, callback) {
            $http({
                method: 'GET',
                url: CONFIG.baseUrl + 'post/likeListOnPost/' + postId
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




    };
});