$( function () {

    var App = {

        colors: {
            "bg": "#282828",
            "text": "#555555"
        },

        font_size: 20,

        line_height: 1,

        preview_text: $("#preview-text-input").val(),

        start: function () {

            this.initRangeSlider();

            this.initEvents();

            this.initColors();
            // main module to change the preview as something changes
            this.updatePreview();        
        },

        initEvents: function () {

            var self = this;

            var keypress_throttle = _.throttle( function () {
                this.preview_text = $("#preview-text-input").val();
                this.updatePreview();
            }, 100 );

            $("#preview-text-input").on("keyup", _.bind(keypress_throttle, self) );

            $("#update-preview").on("click", function (e) {
                self.updatePreview();
                e.preventDefault();
                return false;
            });

        },

        initRangeSlider: function () {
            
            var self = this;

            $("#font-size").rangeslider({

                polyfill: false,

                // Callback function
                onInit: function() {
                },

                // Callback function
                onSlide: function(position, value) {
                },

                // Callback function
                onSlideEnd: function(position, value) {
                    var id = $(this.$element).attr("id");
                    $("#" + id + "-output").text(value + " px");
                    self.font_size = value;
                    self.updatePreview();
                }
            });

            $("#line-height").rangeslider({

                polyfill: false,

                // Callback function
                onInit: function() {
                },

                // Callback function
                onSlide: function(position, value) {
                },

                // Callback function
                onSlideEnd: function(position, value) {
                    var id = $(this.$element).attr("id");
                    $("#" + id + "-output").text(value + " px");
                    self.line_height = value;
                    self.updatePreview();
                }
            });
        },

        initColors: function () {

            var self = this;

            // init the bg color
            $("#bg-color").spectrum({
                showPalette: true,
                hideAfterPaletteSelect:true,
                color: this.colors.bg,
                change: function(color) {
                    var bg_color = color.toHexString();
                    self.colors.bg = bg_color;
                    self.updatePreview();
                }
            });
            // init the text color
            $("#text-color").spectrum({
                showPalette: true,
                hideAfterPaletteSelect:true,
                color: this.colors.text,
                change: function(color) {
                    var text_color = color.toHexString();
                    self.colors.text = text_color;
                    self.updatePreview();
                }
            });
        },

        updatePreview: function () {

            var self = this; // save reference

            $("#screen-preview").css({
                "background": self.colors.bg,
                "color": self.colors.text
            });

            $("#text-preview").css({
                "font-size": self.font_size + "px",
                "line-height": self.line_height
            })
            .text( self.preview_text );

        }

    };

    App.start();
    
} );
