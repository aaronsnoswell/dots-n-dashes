/**
 * script.js - Core js for the Dots n Dashes game
 * @requires utils.js
 * @testwith tests.js
 */

var DnD = {};

;(function(global) {

    /**
     * Specifies a dot on a board of Dots and Dashes
     * @param Number r The 0-based integer row this dot it to be located at
     * @param Number c The 0-based integer column this dot it to be located at
     */
    DnD.Dot = function(r, c) {
        this.r = r;
        this.c = c;
    }

    /**
     * Specifies a dash on a board of Dots and Dashes
     * @param Number player_id A unique integer representing the player who
     *  created this dash
     * @param Number dash_id A unique chronological integer id that specifies
     *  when this dash was created, relative to all other dashes presently on
     *  the game board
     * @param Dot d1 The first Dot this dash connects with
     * @param Dot d2 The second Dot this dash connects with
     */
    DnD.Dash = function(player_id, dash_id, d1, d2) {
        var dsh = this;

        dsh.player_id = player_id;
        dsh.dash_id = dash_id;
        dsh.d1 = d1;
        dsh.d2 = d2;

        /**
         * Checks if this dash is horizontal or not
         * @return Boolean true if this dash is horizontal, false otherwise
         */
        dsh.is_horiz = function() {
            return (dsh.d1.r === dsh.d2.r);
        }

        /**
         * Checks if this dash is vertical or not
         * @return Boolean true if this dash is vertical, false otherwise
         */
        dsh.is_vert = function() {
            return !dsh.is_horiz();
        }
    }

    /**
     * Specifies a box on a board of Dots and Dashes
     * @param Number player_id A unique integer representing the player who scored
     *  this box
     * @param Dot d1 The first Dot this box is composed of
     * @param Dot d2 The second Dot this box is composed of
     * @param Dot d3 The third Dot this box is composed of
     * @param Dot d4 The fourth Dot this box is composed of
     */
    DnD.Box = function(player_id, d1, d2, d3, d4) {
        this.player_id = player_id;
        this.d1 = d1;
        this.d2 = d2;
        this.d3 = d3;
        this.d4 = d4;
    }

    /**
     * An implementation of the Dots and Dashes game
     */
    DnD.CoreGame = function(width, height) {
        var gme = this;

        gme.BOARD_WIDTH = (width === undefined) ? 10 : width;
        gme.BOARD_HEIGHT = (height === undefined) ? 10 : height;
        
        gme.board_dashes = [];
        gme.board_boxes = [];

        gme.player_scores = {};

        gme._dash_counter = 0;

        /**
         * Creates a dash from d1 to d2
         * @param player_id: A unique integer representing the player who made
         *  gme move
         * @param Number player_id A unique integer identifying the player who
         *  created this dash
         * @param Dot d1
         * @param Dot d2
         * @precondition d1 and d2 must both be Dot objects that specify row
         *  and column locations within the (0 based) dimensions specified by
         *  BOARD_WIDTH and BOARD_HEIGHT.
         * @postcondition The game board will have a dash joining d1 to d2
         */
        gme.add_dash = function(player_id, d1, d2) {
            if(gme._dot_in_board(d1)
                && gme._dot_in_board(d2)
                && gme._dots_nearby(d1, d2)
                && !gme._dash_exists(d1, d2)) {
                
                gme.board_dashes.push(new DnD.Dash(
                    player_id,
                    gme._dash_counter++,
                    d1,
                    d2
                ));
            }
        }

        /**
         * Checks the current state of the game board and updates the internal
         *  scoreboard
         */
        gme.check_scores = function() {

            // Step 1: Collect a list of box locations that are 'near' dashes
            var box_locations = [];

            for(var i=0; i<gme.board_dashes.length; i++) {
                var dash = gme.board_dashes[i];
                var dash_box_locations = gme._box_locations_near_dash(dash);

                box_locations.concat(dash_box_locations);
            }

            /* Step 2: Tally the occurences of each box location within the
             * list
             */
            var tally = {};
            for(var i=0; i<box_locations.length; i++) {
                // XXX HACK ajs 09/jan/13 Dodgy conversion to a string key here
                // Should use a toJSON or some dual key hash instead
                var e = box_locations[i],
                    e_str = e.r + "_" + e.c;
                if(tally[e] === undefined) {
                    tally[e] = 0;
                } else {
                    tally[e]++;
                }
            }

            // Step 3: Any box location with exactly 4 occurences is a box
            for(var i in tally) {
                if(!tally.hasOwnProperty(i)) continue;
                var count = tally[i];

                if(count === 4) {
                    // We have a box!

                    // XXX HACK ajs 09/jan/13 Dodgy string key parsing here
                    var r = Number(i.split("_")[0]),
                        c = Number(i.split("_")[1]),
                        dashes = gme._find_box_dashes(r, c),
                        box_owner = gme._newest_dash(dashes).player_id;

                    if(!gme._box_exists(dashes)) {
                        // Update box and score records
                        gme.board_boxes.push(new DnD.Box(owner, dashes[0], dashes[1], dashes[2], dashes[3]));

                        if(!gme.player_scores[box_owner]) gme.player_scores[box_owner] = 0;
                        gme.player_scores[box_owner]++;
                    }

                } else if(count > 4) {
                    // This should never happen
                    console.log("ERROR: Box location occured more than 4 times - duplicate dashes must exist");
                }
            }

        }

        /**
         * Returns the 0-based coordinates for any potential boxes that the
         *  given dash would be a part of
         * @param Dash dash The Dash object of interest
         * @return Array An array of maps, each with two 0-based integer
         *  Number properties, r and c, indicating the location of a potential
         *  box on the game field
         * @precondition dash must be a valid Dash object
         */
        gme._box_locations_near_dash = function(dash) {
            var box_locations = [];

            if(dash.is_horiz()) {
                // Possible boxes are above and below
                if(dash.d1.r > 0) {
                    box_locations.push({
                        r: dash.d1.r - 1,
                        c: dash.d1.c
                    });
                }

                if(dash.d1.r < gme.BOARD_HEIGHT-1) {
                    box_locations.push({
                        r: dash.d1.r + 1,
                        c: dash.d1.c
                    });
                }
            } else if(dash.is_vert()) {
                // Possible boxes are to the left and right
                if(dash.d1.c > 0) {
                    box_locations.push({
                        r: dash.d1.r,
                        c: dash.d1.c - 1
                    });
                }

                if(dash.d1.c < gme.BOARD_WIDTH-1) {
                    box_locations.push({
                        r: dash.d1.r,
                        c: dash.d1.c + 1
                    });
                }
            }

            return box_locations;
        }

        /**
         * Given the 0-based row and column location of a potential box in the
         * game board, returns an array containing any dashes that are part of
         * that box
         * @param Number r The 0-based, integer row of the box of interest
         * @param Number c The 0-based, integer column of the box of interest
         * @return Array An array containing any dashes that are part of the
         *  box of interest
         */
        gme._find_box_dashes = function(r, c) {
            var box_dashes = [];

            for(var i=0; i<gme.board_dashes.length; i++) {
                var dash = gme.board_dashes[i];

                if(gme._dash_of_box(r, c, dash)) {
                    box_dashes.push(dash);
                }
            }

            return box_dashes;
        }

        /**
         * Finds the most recent dash from an Array of dashes
         * @param Array arr An Array of dashes to check
         * @return Dash the newest dash from the given Array
         * @preconidition Array contains only valid Dash objects
         * @postcondition Will return the newest dash
         */
        gme._newest_dash = function(arr) {
            var newest_id = -1,
                newest_dash = null;

            for(var i=0; i<arr.length; i++) {
                var dash = arr[i];

                if(dash.dash_id > newest_id) {
                    newest_id = dash.dash_id;
                    newest_dash = dash;
                }
            }

            return newest_dash;
        }

        /**
         * Given the zero-based center location of a square on the game board,
         * checks to see if the given dash is part of that box
         * @return true if that dash is part of the given box
         */
        gme._dash_of_box = function(r, c, dash) {
            // Dash top side of square
            if(dash.d1.r == r && dash.d2.r == r) {
                return true;
            }

            // Dash bottom side of square
            if(dash.d1.r == (r+1) && dash.d2.r == (r+1)) {
                return true;
            }

            // Dash left side of square
            if(dash.d1.c == c && dash.d2.c == c) {
                return true;
            }

            // Dash right side of square
            if(dash.d1.c == (c+1) && dash.d2.c == (c+1)) {
                return true;
            }

            return false;
        }

        /**
         * Checks if a Box made of the given 4 dashes already exists on the
         *  game board
         * @param Array dashes An array of the four valid Dash objects of
         *  interest
         * @return Boolean true if the specified Box exists, false otherwise
         */
        gme._box_exists = function(dashes) {

            for(var i=0; i<gme.board_boxes.length; i++) {
                var box = gme.board_boxes[i];

                var box_dashes = [box.d1, box.d2, box.d3, box.d4];
                if(Utils.compare_arrays(box_dashes, dashes)) {
                    return true;
                }
            }

            return false;
        }

        /**
         * Validates the given Dot is a validly composed Dot object
         * @param Dot dot The dot of interest
         * @return Boolean true if the Dot is valid, false otherwise
         */
        gme._validate_dot = function(dot) {
            if(typeof dot === "undefined") return false;
            if(dot === null) return false;
            if(!gme._validate_row(dot.r)) return false;
            if(!gme._validate_col(dot.c)) return false
            return true;
        }

        /**
         * Applies basic validation checks to the given coordinate value
         * @param Number coord The coordinate of interest
         * @return Boolean true if the coordinate is valid, false otherwise
         */
        var _validate_coord = function(coord) {
            if(typeof coord === "undefined") return false;
            if(coord === null) return false;
            if(typeof coord !== "number") return false;
            if(isNaN(coord)) return false;
            if(coord === Infinity) return false;
            if(coord < 0) return false;
            if((Math.floor(coord) - coord) !== 0) return false;
            return true;
        }

        /**
         * Validates the given row value
         * @param Number r The row value
         * @return Boolean true if the row value is a valid row designator,
         *  false otherwise
         */
        gme._validate_row = function(r) {
            if(!_validate_coord(r)) return false;
            if(r > (gme.BOARD_HEIGHT-1)) return false;
            return true;
        }

        /**
         * Validates the given row value
         * @param Number r The row value
         * @return Boolean true if the row value is a valid row designator,
         *  false otherwise
         */
        gme._validate_col = function(c) {
            if(!_validate_coord(c)) return false;
            if(c > (gme.BOARD_WIDTH-1)) return false;
            return true;
        }

        /** Checks that the given dot is within this game's board
         * @param Dot dot The dot of interest
         * @return Boolean true if the dot is within the specified bounds, false
         *  otherwise
         */
        gme._dot_in_board = function(dot) {
            if(!gme._validate_dot(dot)) return false;

            return true;
        }

        /**
         * Checks to see if the given dots are one unit apart
         * @param d1 The first dot
         * @param d2 The second dot
         * @return Boolean true if the dots are one unit apart
         */
        gme._dots_nearby = function(d1, d2) {
            if(!gme._validate_dot(d1)) return false;
            if(!gme._validate_dot(d2)) return false;

            if((Math.abs(d1.r - d2.r) == 1) && (d1.c == d2.c)) {
                return true;
            }

            if((Math.abs(d1.c - d2.c) == 1) && (d1.r == d2.r)) {
                return true;
            }

            return false;
        }

        /**
         * Checks to see if a dash between the given dots exists
         * @param Number d1 The first Dot of interest
         * @param Number d2 The second Dot of interest
         * @return Boolean true if a dash between the two given dots exists,
         *  false otherwise
         */
        gme._dash_exists = function(d1, d2) {
            if(!gme._validate_dot(d1)) return false;
            if(!gme._validate_dot(d2)) return false;

            for(var i=0; i<gme.board_dashes.length; i++) {
                var dash = gme.board_dashes[i];
                if(((dash.d1.r == d1.r && dash.d1.c == d1.c)
                    && (dash.d2.r == d2.r && dash.d2.c == d2.c))) {
                    return true;
                }

                if(((dash.d2.r == d1.r && dash.d2.c == d1.c) 
                    && (dash.d1.r == d2.r && dash.d1.c == d2.c))) {
                    return true;
                }
            }

            return false;
        }
    }


})(this);

    


