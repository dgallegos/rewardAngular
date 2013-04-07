'use strict';

/* Directives */


var app = angular.module('rsDirectives', ['ui.bootstrap'])

app.directive('isoRepeat', function ($timeout) {
    return {
        scope: {
            products: '=isoRepeat',
            innerFoo: '&click'
        },
        template:'<div>' +
        '<article class="crop" style="background:url({{product.product_image}}) no-repeat;" ng-repeat="product in products">' +
        '<a href="#" class="{{product.product_id}}" ng-click="innerFoo()">'+
        '<img style="opacity:0;" src={{product.product_image}}>' +
        '</a>' +
        '</article></div>',

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

            element.isotope(options);

            scope.$watch('products', function(newVal, oldVal){
               $timeout(function(){
                    element.isotope( 'reloadItems' ).isotope({ sortBy: 'original-order' });
               });
            },true);
            element.parent().bind('mouseenter', function() {
                element.show();
            });

        }
    };
});