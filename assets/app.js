'use strict';

var APP = {};

APP.Loader = (function() {
    var baseUrl = 'https://test1.sirv.com/Maxxis-Super-B-Dakarteam-Quad-2014/';
    var scale = 0;
    var cache = {};
    var images = {};
    var completeCallback = null;

    var getUrl = function(name) {
        var url = baseUrl + name;
        if (scale > 0) {
            url += '?scale.width=' + scale;
        }

        return url;
    };

    var loadAsync = function() {
        var count = Object.keys(images).length;
        var loadedCount = 0;
        var _cache = cache[scale];

        for (var item in images) {
            _cache[item] = new Image();
            _cache[item].src = getUrl(images[item]);
            _cache[item].onload = function() {
                if (++loadedCount == count) {
                    _cache.shift();
                    completeCallback(_cache);
                }
            }
        }
    };

    var process = function() {
        if (typeof cache[scale] !== 'undefined') {
            completeCallback(cache[scale]);
            return;
        }

        cache[scale] = [];
        loadAsync();
    };

    return {
        setImages: function(data) {
            images = data;
            cache = {};
            return this;
        },
        setScale: function(value) {
            scale = +value;
            return this;
        },
        load: function(callback) {
            completeCallback = callback;
            process();
        }
    };

})();

APP.Stage = (function() {

    var canvas, ctx;
    var interval = null;
    var running = true;
    var speed = 0.4;
    var frame = 0;
    var images = [];

    var clear = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    var stop = function() {
        clearTimeout(interval);
        interval = null;
        running = false;
        frame = 0;
        clear();
    };

    var start = function() {
        var scale = canvas.width;
        if (canvas.height < scale) {
            scale = canvas.height;
        }
        APP.Loader.setScale(scale).load(function(data) {
            images = data;
            running = true;
            draw();
        });
    };

    var draw = function() {
        if (++frame == images.length - 1) {
            frame = 0;
        }
        drawFrame();
        if (running) {
            interval = setTimeout(draw, 100);
        }
    };

    var drawFrame = function() {
        clear();
        ctx.drawImage(images[frame], 0, 0, 200, 200);
    };

    return {
        init: function() {
            canvas = document.getElementById('canvas');
            ctx = canvas.getContext('2d');
        },
        setSpeed: function(value) {
            speed = value;
            return this;
        },
        fullWindow: function() {
            stop();
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
            start();
        },
        originWindow: function() {
            stop();
            canvas.height = 500;
            canvas.width = 500;
            start();
        }
    };

})();


(function() {

    var images = {
        "layers": {
            "1": {
                "1": "Quad-01-01.jpg",
                "2": "Quad-01-02.jpg",
                "3": "Quad-01-03.jpg",
                "4": "Quad-01-04.jpg",
                "5": "Quad-01-05.jpg",
                "6": "Quad-01-06.jpg",
                "7": "Quad-01-07.jpg",
                "8": "Quad-01-08.jpg",
                "9": "Quad-01-09.jpg",
                "10": "Quad-01-10.jpg",
                "11": "Quad-01-11.jpg",
                "12": "Quad-01-12.jpg",
                "13": "Quad-01-13.jpg",
                "14": "Quad-01-14.jpg",
                "15": "Quad-01-15.jpg",
                "16": "Quad-01-16.jpg",
                "17": "Quad-01-17.jpg",
                "18": "Quad-01-18.jpg",
                "19": "Quad-01-19.jpg",
                "20": "Quad-01-20.jpg",
                "21": "Quad-01-21.jpg",
                "22": "Quad-01-22.jpg",
                "23": "Quad-01-23.jpg",
                "24": "Quad-01-24.jpg",
                "25": "Quad-01-25.jpg",
                "26": "Quad-01-26.jpg",
                "27": "Quad-01-27.jpg",
                "28": "Quad-01-28.jpg",
                "29": "Quad-01-29.jpg",
                "30": "Quad-01-30.jpg",
                "31": "Quad-01-31.jpg",
                "32": "Quad-01-32.jpg",
                "33": "Quad-01-33.jpg",
                "34": "Quad-01-34.jpg",
                "35": "Quad-01-35.jpg",
                "36": "Quad-01-36.jpg",
                "37": "Quad-01-37.jpg",
                "38": "Quad-01-38.jpg",
                "39": "Quad-01-39.jpg",
                "40": "Quad-01-40.jpg",
                "41": "Quad-01-41.jpg",
                "42": "Quad-01-42.jpg",
                "43": "Quad-01-43.jpg",
                "44": "Quad-01-44.jpg",
                "45": "Quad-01-45.jpg",
                "46": "Quad-01-46.jpg",
                "47": "Quad-01-47.jpg",
                "48": "Quad-01-48.jpg",
                "49": "Quad-01-49.jpg",
                "50": "Quad-01-50.jpg",
                "51": "Quad-01-51.jpg",
                "52": "Quad-01-52.jpg",
                "53": "Quad-01-53.jpg",
                "54": "Quad-01-54.jpg",
                "55": "Quad-01-55.jpg",
                "56": "Quad-01-56.jpg",
                "57": "Quad-01-57.jpg",
                "58": "Quad-01-58.jpg",
                "59": "Quad-01-59.jpg",
                "60": "Quad-01-60.jpg",
                "61": "Quad-01-61.jpg",
                "62": "Quad-01-62.jpg",
                "63": "Quad-01-63.jpg",
                "64": "Quad-01-64.jpg",
                "65": "Quad-01-65.jpg",
                "66": "Quad-01-66.jpg",
                "67": "Quad-01-67.jpg",
                "68": "Quad-01-68.jpg",
                "69": "Quad-01-69.jpg",
                "70": "Quad-01-70.jpg",
                "71": "Quad-01-71.jpg",
                "72": "Quad-01-72.jpg"
            }
        }
    };

    var isFullWindow = false;

    var init = function() {
        document.getElementById('full-window').addEventListener('click', function() {
            isFullWindow
                ? APP.Stage.originWindow()
                : APP.Stage.fullWindow();

            isFullWindow = !isFullWindow;
        });

        APP.Loader.setImages(images.layers[1]);
        APP.Stage.init();
        APP.Stage.originWindow();
    };

    return {
        run: function() {
            window.addEventListener('load', init, false);
        }
    };

})().run();