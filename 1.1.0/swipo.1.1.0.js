var swipo = function(){
    return {
        carousel:function(elementSelector, typeCarousel){
            var self = this;

            self.$el = $(elementSelector);
            self.element = self.$el[0];
            self.type_carousel = typeCarousel;

            self.hammer;
            self.container = $('.media-slider', self.$el);
            self.panes = $('.media-slide', self.$el);
            self.paginator = $('.media-paginator', self.$el);
            self.arrows = $('.arrow', self.$el);

            self.pane_width = 0;
            self.pane_count = self.panes.length;

            self.current_pane = 0;

            /* initialize */
            this.init = function() {
                $(window).on('load resize orientationchange', function() {
                    /*self.toggle( window.innerWidth < 480 );*/
                    self.toggle( true );
                });
            };

            /* toggle hammer when enabled */
            this.toggle = function ( enabled ){
                if( enabled ){
                    self.setPaneDimensions();
                    if( self.hammer == undefined ){
                        self.hammer = new Hammer(self.element, { dragLockToAxis: true }).on('release dragleft dragright swipeleft swiperight', self.handleHammer);

                        if(jQuery.inArray('arrows',self.type_carousel) > -1){
                            $(self.arrows).click(function(e){
                                ( $(this).attr('data-direction') == 'prev' ? self.prev() : self.next() );
                                e.preventDefault();
                            });
                        }
                        if(jQuery.inArray('bullets',self.type_carousel) > -1){
                            $(self.paginator).find('a').click(function(e){
                                self.slideTo($(this).attr('data-slide'));
                                e.preventDefault();
                            });
                        }
                    }
                }else{
                    self.remove();
                }
            }

            /* remove hammer funtionality */
            this.remove = function() {
                self.panes.each(function() {
                    $(this).removeAttr('style');
                });

                self.container.css('left','0').removeAttr('style');
                if( window.innerWidth >= 1200){
                    self.container.width(1200);
                }

                Hammer(self.element).off('release dragleft dragright swipeleft swiperight');
            }

            /* set the pane dimensions and scale the container  */
            this.setPaneDimensions = function() {
                self.pane_width = self.$el.width();
                self.panes.each(function() {
                    $(this).width(self.pane_width);
                });
                self.container.width(self.pane_width*self.pane_count);
            };


            /* show pane by index  */
            this.showPane = function(index, animate) {
                /* between the bounds */
                index = Math.max(0, Math.min(index, self.pane_count-1));
                self.current_pane = index;
                
                this.activateBullet(index+1);
                this.checkArrows(index+1);

                var offset = -((100/self.pane_count)*self.current_pane);
                self.setContainerOffset(offset, animate);
            };

            this.setContainerOffset = function(percent, animate) {
                self.container.removeClass("animate");
                if(animate) {
                    self.container.addClass("animate");
                }
                if(Modernizr.csstransforms3d) {
                    self.container.css("transform", "translate3d("+ percent +"%,0,0) scale3d(1,1,1)");
                }
                else if(Modernizr.csstransforms) {
                    self.container.css("transform", "translate("+ percent +"%,0)");
                }
                else {
                    var px = ((self.pane_width*self.pane_count) / 100) * percent;
                    self.container.css("left", px+"px");
                }
            }

            this.next = function() { return this.showPane(self.current_pane+1, true); };
            this.prev = function() { return this.showPane(self.current_pane-1, true); };
            this.slideTo = function(slide) { return this.showPane(slide-1, true); };
            
            this.activateBullet = function(slide){
                /* activate correct bullet */
                self.paginator.find('a').removeClass('active');
                self.paginator.find('[data-slide='+slide+']').addClass('active');
            };

            this.checkArrows = function(slide){
                /* hide or show the correct arrows */
                if(slide == 1){
                    self.arrows.filter('.prev').addClass('hidden');
                    self.arrows.filter('.next').removeClass('hidden');
                }else if(slide == self.pane_count){
                    self.arrows.filter('.prev').removeClass('hidden');
                    self.arrows.filter('.next').addClass('hidden');
                }else{
                    self.arrows.filter('.prev').removeClass('hidden');
                    self.arrows.filter('.next').removeClass('hidden');
                }
            }

            this.handleHammer = function(ev) {
                /* disable browser scrolling */
                ev.gesture.preventDefault();

                switch(ev.type) {
                    case 'dragright':
                    case 'dragleft':
                    /* stick to the finger */
                    var pane_offset = -(100/self.pane_count)*self.current_pane;
                    var drag_offset = ((100/self.pane_width)*ev.gesture.deltaX) / self.pane_count;

                    /* slow down at the first and last pane */
                    if((self.current_pane == 0 && ev.gesture.direction == "right") || (self.current_pane == self.pane_count-1 && ev.gesture.direction == "left")) {
                        drag_offset *= .4;
                    }

                    self.setContainerOffset(drag_offset + pane_offset);
                    break;

                    case 'swipeleft':
                    self.next();
                    ev.gesture.stopDetect();
                    break;

                    case 'swiperight':
                    self.prev();
                    ev.gesture.stopDetect();
                    break;

                    case 'release':
                    /* more then 33% moved, do navigate */
                    if(Math.abs(ev.gesture.deltaX) > self.pane_width/3) {
                        if(ev.gesture.direction == 'right') {
                            self.prev();
                        } else {
                            self.next();
                        }
                    }
                    else {
                        self.showPane(self.current_pane, true);
                    }
                    break;
                }
            }

            self.init();
        }
    };
}