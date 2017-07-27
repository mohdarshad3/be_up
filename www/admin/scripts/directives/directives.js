'use strict';
angular.module('Admin.directives', [])
    .directive('msg', function() {
        return {
            restrict: 'EA',
            link: function(scope, element, attrs) {
                var key = attrs.key;
                if (attrs.keyExpr) {
                    scope.$watch(attrs.keyExpr, function(value) {
                        key = value;
                        element.text($.i18n.prop(value));
                    });
                }
                scope.$watch('language()', function(value) {
                    element.text($.i18n.prop(key));
                });
            }
        };
    })
    .directive('reportdate', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element) {
                var start = new Date();
                start.setMonth(start.getMonth() - 2);
                var end   = new Date();
                element.datepicker({
                    dateFormat: 'mm-dd-yy',
                    changeMonth: true,
                    changeYear: true,
                    minDate: start,
                    maxDate: end,
                    yearRange: start.getMonth() + ':' + end.getMonth()
                });

            }

        }

    })
    .directive('ngConfirmClick', function() {
        return {
            priority: -1,
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('click', function(e) {
                    var message = attrs.ngConfirmClick;
                    if (message && !confirm(message)) {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }
                });
            }
        };
    })
    .directive('modalBox', function() {
        return {
            restrict: 'C',
            link: function(scope, element) {
                scope.dismiss      = function() {
                    element.modal('hide');
                };
                scope.dismissModal = function(inputClass) {
                    $('.' + inputClass).modal('hide');
                };
            }
        };
    })
    .directive('preventResize', function($document, $window) {
        return {
            restrict: 'EAC',
            //element,Attribute or class
            link: function(scope, ele, attrs) {
            }
        };
    })
    .directive('focus', function($timeout, $parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                scope.$watch(attrs.focus, function(newValue, oldValue) {
                    if (newValue) {
                        element[0].focus();
                    }
                });
                element.bind('blur', function(e) {
                    $timeout(function() {
                        scope.$apply(attrs.focus + '=false');
                    }, 0);
                });
                element.bind('focus', function(e) {
                    $timeout(function() {
                        scope.$apply(attrs.focus + '=true');
                    }, 0);
                });
            }
        };
    })
    .directive('appVersion', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    })
    .directive('strip', function() {
        return {
            restrict: 'EA',
            link: function(scope, element, attrs, input) {
                var tmp       = document.createElement('DIV');
                tmp.innerHTML = input.replace(/(?:\r\n|\r|\n)/g, '<br />');
                element.text(tmp.innerText);
            }
        };
    })
    .directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind('keydown keypress', function(event) {
                if (event.which === 13) {
                    scope.$apply(function() {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    })
    .directive('jqdatepickerfrom', function() {


        return {
            require: 'ngModel',
            scope: {mindate: "=", maxdate: '='},
            replace: true,
            link: function(scope, element, attrs, controller) {

                var doDate = $('#EndDate');

                element.datepicker({

                    dateFormat: 'mm-dd-yy',
                    changeMonth: true,
                    changeYear: true,
                    numberOfMonths: 2,
                    minDate: scope.mindate,
                    maxDate: scope.maxdate,
                    beforeShowDay: function(date) {
                        if (doDate.val() === '') {
                            return [
                                true,
                                ''
                            ];
                        } else {
                            var datenew = Date.parse(date);
                            var from    = doDate.val().split("-");
                            var mindate = new Date(from[2], parseInt(from[0]) - 1, from[1]);
                            var mindate = Date.parse(mindate);
                            if (mindate <= datenew) {
                                return [
                                    false,
                                    ''
                                ]; // disable sundays
                            } else {
                                return [
                                    true,
                                    ''
                                ];
                            }
                        }
                    },
                    onSelect: function(selectedDate) {
                        var toDate                                 = new Date(element.datepicker("getDate"));
                        doDate.datepicker('option', 'minDate', toDate);
                        document.getElementById('StartDate').value = selectedDate;
                        scope.$apply(function() {
                            controller.$setViewValue(selectedDate);
                        });
                    }

                });

            }
        };

    })
    .directive('jqdatepickerto', function() {

        return {
            require: 'ngModel',
            scope: {mindate: "=", maxdate: '='},
            replace: true,
            link: function(scope, element, attrs, controller) {
                var doDate = $('#StartDate');
                element.datepicker({
                    dateFormat: 'mm-dd-yy',
                    minDate: scope.mindate,
                    changeMonth: true,
                    numberOfMonths: 2,
                    changeYear: true,
                    maxDate: scope.maxdate,
                    beforeShowDay: function(date) {
                        if (doDate.val() === '') {
                            return [
                                true,
                                ''
                            ];
                        } else {
                            var datenew = Date.parse(date);
                            var from    = doDate.val().split("-");
                            var mindate = new Date(from[2], parseInt(from[0]) - 1, from[1]);

                            var mindate = Date.parse(mindate);
                            if (mindate <= datenew) {
                                return [
                                    true,
                                    ''
                                ]; // disable sundays
                            } else {
                                return [
                                    false,
                                    ''
                                ];
                            }
                        }
                    },
                    onSelect: function(selectedDate) {

                        document.getElementById('EndDate').value = selectedDate;
                        scope.$apply(function() {
                            controller.$setViewValue(selectedDate);
                        });
                    }

                });

            }
        };

    })
    .directive('jqdatepicker', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {mindate: "=", maxdate: '='},
            link: function(scope, element, attrs, controller) {
                element.datepicker({
                    dateFormat: 'mm-dd-yy',
                    changeMonth: true,
                    changeYear: true,
                    minDate: scope.mindate,
                    maxDate: scope.maxdate,
                    yearRange: '1970' + ':' + '2017',
                    onSelect: function(date) {
                        scope.$apply(function() {
                            controller.$setViewValue(date);
                        });

                    }
                });
            }
        };
    })
    .directive('jqdatepickerwithoutmonth', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {mindate: "=", maxdate: '='},
            link: function(scope, element, attrs, controller) {
                element.datepicker({
                    dateFormat: 'mm-dd-yy',
                    changeMonth: false,
                    changeYear: false,
                    minDate: scope.mindate,
                    maxDate: scope.maxdate,
                    onSelect: function(date) {
                        scope.$apply(function() {
                            controller.$setViewValue(date);
                        });

                    }
                });
            }
        };
    })
    .directive('jqdatepickerfromwithoutmonth', function() {

        return {
            require: 'ngModel',
            scope: {mindate: "=", maxdate: '='},
            replace: true,
            link: function(scope, element, attrs, controller) {

                var doDate = $('#EndDate');

                element.datepicker({

                    dateFormat: 'mm-dd-yy',
                    changeMonth: false,
                    changeYear: false,
                    numberOfMonths: 2,
                    minDate: scope.mindate,
                    maxDate: scope.maxdate,
                    beforeShowDay: function(date) {
                        if (doDate.val() === '') {
                            return [
                                true,
                                ''
                            ];
                        } else {
                            var datenew = Date.parse(date);
                            var from    = doDate.val().split("-");
                            var mindate = new Date(from[2], parseInt(from[0]) - 1, from[1]);
                            var mindate = Date.parse(mindate);
                            if (mindate <= datenew) {
                                return [
                                    false,
                                    ''
                                ]; // disable sundays
                            } else {
                                return [
                                    true,
                                    ''
                                ];
                            }
                        }
                    },
                    onSelect: function(selectedDate) {
                        var toDate                                 = new Date(element.datepicker("getDate"));
                        doDate.datepicker('option', 'minDate', toDate);
                        document.getElementById('StartDate').value = selectedDate;
                        scope.$apply(function() {
                            controller.$setViewValue(selectedDate);
                        });
                    }

                });

            }
        };

    })
    .directive('jqdatepickertowithoutmonth', function() {

        return {
            require: 'ngModel',
            scope: {mindate: "=", maxdate: '='},
            replace: true,
            link: function(scope, element, attrs, controller) {
                var doDate = $('#StartDate');
                element.datepicker({
                    dateFormat: 'mm-dd-yy',
                    minDate: scope.mindate,
                    changeMonth: false,
                    numberOfMonths: 2,
                    changeYear: false,
                    maxDate: scope.maxdate,
                    beforeShowDay: function(date) {
                        if (doDate.val() === '') {
                            return [
                                true,
                                ''
                            ];
                        } else {
                            var datenew = Date.parse(date);
                            var from    = doDate.val().split("-");
                            var mindate = new Date(from[2], parseInt(from[0]) - 1, from[1]);

                            var mindate = Date.parse(mindate);
                            if (mindate <= datenew) {
                                return [
                                    true,
                                    ''
                                ]; // disable sundays
                            } else {
                                return [
                                    false,
                                    ''
                                ];
                            }
                        }
                    },
                    onSelect: function(selectedDate) {

                        document.getElementById('EndDate').value = selectedDate;
                        scope.$apply(function() {
                            controller.$setViewValue(selectedDate);
                        });
                    }

                });

            }
        };

    })

    .directive('expiredate', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element) {
                var start = new Date();
                var end   = new Date();
                end.setFullYear(end.getFullYear() + 50);
                element.datepicker({
                    dateFormat: 'mm-dd-yy',
                    changeMonth: true,
                    changeYear: true,
                    minDate: start,
                    maxDate: end,
                    yearRange: start.getFullYear() + ':' + end.getFullYear()
                });

            }

        }

    })
    .directive('myCustomer',['adminService','$compile',function(adminService,$compile) {


        return {
            template: '',
            link: function(scope, element) {
                adminService.getAdmin(1, function(err, data) {

                        if(data && data.total) {
                            element.empty();
                            data.docs.forEach(function(item) {
                                element.append(
                                    $compile( // <= in order to make myTag directive work, you need to compile text
                                        angular.element('<table><tr>').contents() // convert text to list of DOM elements wrapped by jqLite/jQuery
                                    )(scope)
                                );
                                element.append(
                                    $compile( // <= in order to make myTag directive work, you need to compile text
                                        angular.element('<td>'+item.name+'</td>').contents() // convert text to list of DOM elements wrapped by jqLite/jQuery
                                    )(scope)
                                );
                                element.append(
                                    $compile( // <= in order to make myTag directive work, you need to compile text
                                        angular.element('</tr></table>').contents() // convert text to list of DOM elements wrapped by jqLite/jQuery
                                    )(scope)
                                );
                            });
                        }
                    }
                );
            }
        }





    }]);