'use strict';

/* Directives */


var app = angular.module('rsDirectives', [])

app.directive('isoRepeat', function () {
    return {
        scope: {
            items: '=isoRepeat'
        },
        link: function (scope, element, attrs) {

            var options = {
                animationEngine : 'jquery',
                itemSelector: 'article',
                layoutMode: 'masonry',
                getSortData : {
                    title: function(e) {
                        return e.find('h2').text();
                    }
                },
                sortBy: 'title',
                sortAscending: true
            };

            var init = function() {
                element.isotope(options);
            };

            var setup = function () {

                var articles = '';
                scope.items.forEach(function (product) {
                    articles +=
                        '<article id="' + product.product_id + '">' +
                            '<img src=' + product.product_image + '>' +
                        '</article>';
                });

                element.isotope('remove', element.find('article'));
                element.isotope('insert', $(articles));
            };

            scope.$watch('items', function (newValue, oldValue) {
                if (newValue.length == 0) init();
                if (newValue.length > 0) setup();
            });
        }
    };
});